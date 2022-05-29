import {
  PermissionModeEnum,
  RouterTransitionEnum,
  SessionTimeoutProcessingEnum,
} from "/@/enums/appEnum";
import { ProjectConfig } from "/#/config";
import { CacheTypeEnum } from "/@/enums/cacheEnum";

// ! 注意改变配置时要清空浏览器缓存
const projectSetting: ProjectConfig = {
  permissionCacheType: CacheTypeEnum.LOCAL,
  useErrorHandle: false,
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.PROUTE_JUMP,
  menuSetting: {
    collapsed: false, // 侧边栏默认不折叠
  },
  transitionSetting: {
    enable: true,
    basicTransition: RouterTransitionEnum.FADE_SLIDE,
    openPageLoading: true,
    openNProgress: false,
  },
  openKeepAlive: true,
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  showDarkModelToggle: true, // 展示切换暗色模式 switch
  fullContent: false,
  multiTabsSetting: {
    cache: false,
    show: true,
    canDrag: true,
    showQuick: true,
    showRedo: true,
    showFold: true,
  },
  themeColor: "#409eff",
};

export default projectSetting;
