import { MenuModeEnum, MenuTypeEnum } from "/@/enums/menuEnum";
import { RoleInfo } from "/@/api/model/userModel";
import { ErrorTypeEnum } from "/@/enums/exceptionEnum";

export interface UserInfo {
  userId: string | number;
  userName: string;
  realName: string;
  avatar: string;
  desc?: string;
  homePath?: string;
  roles: RoleInfo[];
}

export interface LockInfo {
  password?: string | undefined;
  isLock?: boolean;
}

export interface ErrorLogInfo {
  type: ErrorTypeEnum;
  file: string;
  name?: string;
  message: string;
  stack?: string;
  detail: string;
  url: string;
  time?: string;
}

// 尺寸变化之前需要记住的状态，在变化回来之后可以恢复
export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
