import { Persistent } from "/@/utils/cache/persistent";
import { ProjectConfig } from "/#/config";
import { useAppStore } from "/@/store/modules/app";
import { deepMerge } from "/@/utils";
import { PROJ_CFG_KEY } from "/@/enums/cacheEnum";
import projectSetting from "/@/settings/projectSetting";
import { useDark } from "/@/hooks/web/useDark";

export function initAppConfigStore() {
  const appStore = useAppStore();
  // 项目配置初始化
  let projectConfig: ProjectConfig = Persistent.getLocal(
    PROJ_CFG_KEY
  ) as ProjectConfig;
  projectConfig = deepMerge(projectSetting, projectConfig || {});

  appStore.setProjectConfig(projectConfig);

  // 设置暗黑模式
  useDark();
}
