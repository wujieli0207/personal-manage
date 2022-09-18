import { logoutApi } from './../../api/user'
import { usePermissionStore } from './permission'
import { loginApi, getUserInfoApi } from '/@/api/user'
import { defineStore } from 'pinia'
import { ErrorMessageMode } from '/#/axios'
import { UserInfo } from '/#/store'
import { GetUserInfoModel, LoginParams } from '/@/api/model/userModel'
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum'
import { RoleEnum } from '/@/enums/roleEnum'
import { store } from '/@/store'
import { getAuthCache, setAuthCache } from '/@/utils/auth'
import { router } from '/@/router'
import { PageEnum } from '/@/enums/pageEnum'
import { RouteRecordRaw } from 'vue-router'
import { PAGE_NOTE_FOUND_ROUTE } from '/@/router/routes/basic'

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
}

export const useUserStore = defineStore({
  id: 'userStore',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
    sessionTimeout: false,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY)
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY)
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setUserInfo(userInfo: Nullable<UserInfo>) {
      this.userInfo = userInfo
      this.lastUpdateTime = new Date().getTime()
      setAuthCache(USER_INFO_KEY, userInfo)
    },
    setToken(token: string | undefined) {
      this.token = token || ''
      setAuthCache(TOKEN_KEY, token)
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
      setAuthCache(ROLES_KEY, roleList)
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    resetState() {
      this.userInfo = null
      this.token = undefined
      this.sessionTimeout = false
    },
    async login(params: LoginParams & { goHome?: boolean; mode?: ErrorMessageMode }) {
      try {
        const { goHome = true, mode, ...loginParams } = params
        const data = await loginApi(loginParams, mode)

        const { token } = data
        this.setToken(token)

        return this.afterLoginAction(goHome)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.token) return null

      const userInfo = await this.getUserInfoAction()

      const sessiontTimeout = this.sessionTimeout

      if (sessiontTimeout) {
        this.setSessionTimeout(false)
      } else {
        const permissionStore = usePermissionStore()
        // 非动态添加路由的情况处理
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction()
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw)
          })
          router.addRoute(PAGE_NOTE_FOUND_ROUTE as unknown as RouteRecordRaw)
          permissionStore.setDynamicAddedRoute(true)
        }
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME))

        return userInfo
      }

      return userInfo
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.token) return null

      const userInfo = await getUserInfoApi()

      const { roles = [] } = userInfo
      if (Array.isArray(roles)) {
        const roleList = roles.map((item) => item.value) as RoleEnum[]
        this.setRoleList(roleList)
      } else {
        userInfo.roles = []
        this.setRoleList([])
      }

      this.setUserInfo(userInfo)

      return userInfo
    },
    async logout(goLogin = false) {
      if (this.token) {
        try {
          await logoutApi()
        } catch {
          console.log('注销 TOken 失败')
        }
      }
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
      goLogin && router.push(PageEnum.BASE_LOGIN)
    },
  },
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
