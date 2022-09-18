import { usePermissionStore } from '/@/store/modules/permission'
import { useAppStore } from '/@/store/modules/app'
import { useUserStore } from '/@/store/modules/user'
import { useMultipleTabStore } from '/@/store/modules/multipleTab'
import { Router } from 'vue-router'
import { PageEnum } from '/@/enums/pageEnum'

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // 如果是登录页面，清空所有 store 状态
    if (to.path === PageEnum.BASE_LOGIN) {
      const appStore = useAppStore()
      const userStore = useUserStore()
      const permissionStore = usePermissionStore()
      const tabStore = useMultipleTabStore()

      appStore.resetAllState()
      userStore.resetState()
      permissionStore.resetState()
      tabStore.resetState()
    }
  })
}
