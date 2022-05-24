import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";
import projectSetting from "/@/settings/projectSetting";
import { Persistent } from "/@/utils/cache/persistent";
import { MULTIPLE_TABS_KEY } from "/@/enums/cacheEnum";
import { store } from "/@/store";
import { getRawRoute } from "/@/utils";
import { PageEnum } from "/@/enums/pageEnum";
import { PAGE_NOTE_FOUND_ROUTE, REDIRECT_ROUTE } from "/@/router/routes/basic";
import { toRaw } from "vue";

export interface MultipleTabState {
  cacheTabList: Set<string>;
  tabList: RouteLocationNormalized[];
  lastDragEndIndex: number;
}

const cacheTab = projectSetting.multiTabsSetting.cache;

export const useMultipleTabStore = defineStore({
  id: "app-multiple-tab",
  state: (): MultipleTabState => ({
    cacheTabList: new Set(),
    tabList: cacheTab ? Persistent.getLocal(MULTIPLE_TABS_KEY) || [] : [],
    lastDragEndIndex: 0,
  }),
  getters: {
    getCachedTabList(): string[] {
      return Array.from(this.cacheTabList);
    },
    getTabList(): RouteLocationNormalized[] {
      return this.tabList;
    },
    getLastDragEndIndex(): number {
      return this.lastDragEndIndex;
    },
  },
  actions: {
    async addTab(route: RouteLocationNormalized) {
      const { path, name, fullPath, params, query } = getRawRoute(route);

      // 登录、404、重定向路由不用在 tab 展示
      if (
        path === PageEnum.BASE_LOGIN ||
        path === PageEnum.ERROR_PAGE ||
        !name ||
        [PAGE_NOTE_FOUND_ROUTE.name, REDIRECT_ROUTE.name].includes(name as string)
      ) {
        return;
      }

      // 如果 tab 中存在就不用重复添加
      let updateIndex = -1;
      const tabHasExits = this.tabList.some((tab, index) => {
        updateIndex = index;
        return (tab.fullPath || tab.path) === (fullPath || path);
      });

      if (tabHasExits) {
        const currentTab = toRaw(this.tabList)[updateIndex];
        if (!currentTab) return;

        // 更新已存在的tab参数相关信息
        currentTab.params = params || currentTab.params;
        currentTab.query = query || currentTab.query;
        currentTab.fullPath = fullPath || currentTab.fullPath;
        this.tabList.splice(updateIndex, 1, currentTab);
      } else {
        // TODO 待开发
      }
    },
  },
});

export function useMultipleTabStoreWithOutStore() {
  return useMultipleTabStore(store);
}
