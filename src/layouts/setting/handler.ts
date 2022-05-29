import { useAppStore } from "/@/store/modules/app";
import { ProjectConfig } from "/#/config";
import { HandlerEnum } from "/@/enums/appEnum";
import { useRootSetting } from "/@/hooks/setting/useRootSetting";

/**
 *
 * @description  系统配置基础设置
 */
export function baseHandler(event: HandlerEnum, value: any) {
  const appStore = useAppStore();
  const config = handler(event, value);
  appStore.setProjectConfig(config);
}

export function handler(event: HandlerEnum, value: any): DeepPartial<ProjectConfig> {
  const { getThemeColor } = useRootSetting();

  switch (event) {
    case HandlerEnum.CHANGE_THEME_COLOR:
      if (getThemeColor.value === value) {
        return {};
      }

      return { themeColor: value };

    default:
      return {};
  }
}
