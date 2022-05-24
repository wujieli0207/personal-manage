import { computed } from "vue";
import { ThemeEnum } from "/@/enums/appEnum";
import { useAppStore } from "/@/store/modules/app";
export function useRootSetting() {
  const appStore = useAppStore();

  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive);

  const getShowDarkModeToggle = computed(() => appStore.getProjectConfig.showDarkModelToggle);

  const getDarkMode = computed(() => appStore.getDarkMode);

  function setDarkMode(mode: ThemeEnum) {
    appStore.setDarkMode(mode);
  }

  return {
    getOpenKeepAlive,
    getShowDarkModeToggle,
    getDarkMode,
    setDarkMode,
  };
}
