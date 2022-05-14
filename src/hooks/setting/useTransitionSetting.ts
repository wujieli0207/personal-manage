import { computed } from "vue";
import { TransitionSetting } from "/#/config";
import { useAppStore } from "/@/store/modules/app";

export function useTransitionSetting() {
  const appStore = useAppStore();

  const getEnableTransition = computed(
    () => appStore.getTransitionSetting.enable
  );

  const getBasicTransition = computed(
    () => appStore.getTransitionSetting.basicTransition
  );

  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionSetting.openPageLoading;
  });

  const getOpenNProgress = computed((): boolean => {
    return !!appStore.getTransitionSetting.openNProgress;
  });

  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.setProjectConfig({ transitionSetting });
  }

  return {
    getEnableTransition,
    getBasicTransition,
    getOpenPageLoading,
    getOpenNProgress,
    setTransitionSetting,
  };
}
