import { TransitionSetting } from "./../../../types/config.d";
import { defineStore } from "pinia";
import { ProjectConfig, MenuSetting } from "/#/config";
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from "/@/enums/cacheEnum";
import { deepMerge } from "/@/utils";
import { Persistent } from "/@/utils/cache/persistent";
import { store } from "/@/store";
import { ThemeEnum } from "/@/enums/appEnum";
import { BeforeMiniState } from "/#/store";
import { darkMode } from "/@/settings/designSetting";
import { resetRouter } from "/@/router";

interface AppStore {
  darkMode?: ThemeEnum;
  pageLoading: boolean; // 页面全局 loading 状态
  beforeMiniInfo: BeforeMiniState;
  projectConfig: Nullable<ProjectConfig>;
}

export const useAppStore = defineStore({
  id: "appStore",
  state: (): AppStore => ({
    darkMode: undefined,
    pageLoading: false,
    beforeMiniInfo: {},
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
  }),
  getters: {
    getDarkMode(): ThemeEnum | string {
      return this.darkMode ? this.darkMode : localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode;
    },
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
  },
  actions: {
    setDarkMode(mode: ThemeEnum) {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY_, mode);
    },
    setPageLoading(loading: boolean) {
      this.pageLoading = loading;
    },
    setBeforeMiniInfo(state: BeforeMiniState) {
      this.beforeMiniInfo = state;
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig, true);
    },
    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
    },
  },
});

export function useAppStoreWithOut() {
  return useAppStore(store);
}
