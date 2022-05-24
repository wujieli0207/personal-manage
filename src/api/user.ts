import { GetUserInfoModel, LoginParams, LoginResultModel } from "./model/userModel";
import { ErrorMessageMode } from "/#/axios";
import { defHttp } from "/@/utils/http/axios";

enum Api {
  LOGIN = "/login",
  LOGOUT = "/logout",
  GET_USER_INFO = "/getUserInfo",
  GET_PERM_CODE = "/getPermCode",
}

/**
 *
 * @description 用户登录
 */
export const loginApi = (params: LoginParams, mode: ErrorMessageMode = "alert") => {
  return defHttp.post<LoginResultModel>({ url: Api.LOGIN, params }, { errorMessageMode: mode });
};

/**
 *
 * @description 获取用户信息
 */
export const getUserInfoApi = () => {
  return defHttp.get<GetUserInfoModel>({ url: Api.GET_USER_INFO }, { errorMessageMode: "none" });
};

/**
 *
 * @description 获取用户权限 code
 */
export const getPermCode = () => {
  return defHttp.get<string[]>({ url: Api.GET_PERM_CODE });
};

/**
 *
 * @description 退出登录接口
 */
export const logoutApi = () => {
  return defHttp.get<string[]>({ url: Api.LOGOUT });
};
