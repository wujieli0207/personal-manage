import {
  PermissionModeEnum,
  RouterTransitionEnum,
  SessionTimeoutProcessingEnum,
} from "/@/enums/appEnum";
import { CacheTypeEnum } from "/@/enums/cacheEnum";

export interface AppointConfig {
  startTimeHour: string; // 课程预约开始小时
  endTimeHour: string; // 课程预约结束小时
  minuteSelect: string[]; // 可选择的分钟数
}

export interface GlobConfig {
  title: string;
  shortName: string;
  apiUrl: string;
  urlPrefix?: string;
  uploadUrl?: string;
}

export interface GlobEnvConfig {
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_GLOB_API_URL: string;
  VITE_GLOB_API_URL_PREFIX?: string;
  VITE_GLOB_UPLOAD_URL?: string;
}

export interface MenuSetting {
  collapsed: boolean; // 侧边栏折叠
}

export interface ProjectConfig {
  permissionCacheType: CacheTypeEnum;
  // 是否使用错误处理
  useErrorHandle: boolean;
  // session 过期的处理方式
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  // 菜单配置项
  menuSetting: MenuSetting;
  // 组件切换过渡动画配置
  transitionSetting: TransitionSetting;
  // 是否开启 keep-alive
  openKeepAlive: boolean;
  // 权限模式
  permissionMode: PermissionModeEnum;
  // 切换暗色模式
  showDarkModelToggle: boolean;
  // 内容全频模式
  fullContent: boolean;
}

export interface TransitionSetting {
  enable: boolean; // 是否开启页面过度动画
  basicTransition: RouterTransitionEnum;
  openPageLoading: boolean;
  openNProgress: boolean; // 是否开启顶部进度条
}
