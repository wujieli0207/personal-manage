import { TransitionSetting } from "./../../../types/config.d";
import { defineStore } from "pinia";
import { ProjectConfig, MenuSetting } from "/#/config";
import { PROJ_CFG_KEY } from "/@/enums/cacheEnum";
import { deepMerge } from "/@/utils";
import { Persistent } from "/@/utils/cache/persistent";
import { store } from "/@/store";

interface AppStore {
  projectConfig: Nullable<ProjectConfig>;
}

export const useAppStore = defineStore({
  id: "appStore",
  state: (): AppStore => ({
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
  }),
  getters: {
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
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },
  },
});

export function useAppStoreWithOut() {
  return useAppStore(store);
}
