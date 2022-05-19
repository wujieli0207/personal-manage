import { computed } from "vue";
import { useAppStore } from "/@/store/modules/app";
export function useRootSetting() {
  const appStore = useAppStore();

  const getOpenKeepAlive = computed(
    () => appStore.getProjectConfig.openKeepAlive
  );

  const getShowDarkModeToggle = computed(
    () => appStore.getProjectConfig.showDarkModelToggle
  );

  return {
    getOpenKeepAlive,
    getShowDarkModeToggle,
  };
}
