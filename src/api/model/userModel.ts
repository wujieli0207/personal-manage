import { UserInfo } from '/#/store'

export interface RoleInfo {
  roleName: string
  value: string
}

export interface LoginParams {
  userName: string
  password: string
}

export type GetUserInfoModel = Omit<UserInfo, 'homePath'>

export interface LoginResultModel {
  userId: string | number
  token: string
  role: RoleInfo
}
