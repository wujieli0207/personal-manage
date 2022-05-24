import { tryOnUnmounted, useDebounceFn, useTimeoutFn } from "@vueuse/core";
import { EChartsOption } from "echarts";
import { computed, nextTick, ref, Ref, unref } from "vue";
import { useBreakpoint } from "/@/hooks/event/useBreakpoint";
import { useEventListener } from "/@/hooks/event/useEventListaner";
import echarts from "/@/utils/lib/echarts";

export function useECharts(elRef: Ref<HTMLDivElement>) {
  let chartInstance: Nullable<echarts.ECharts> = null;
  let resizeFn: Fn = resize;
  const cacheOptions = ref({}) as Ref<EChartsOption>;
  let removeResizeFn: Fn = () => ({});

  resizeFn = useDebounceFn(resize, 200);

  const getOptions = computed(() => {
    return {
      backgroundColor: "transparent",
      ...cacheOptions.value,
    } as EChartsOption;
  });

  /**
   *
   * @description 初始化图表
   */
  function initCharts() {
    const el = unref(elRef);
    if (!el || !unref(el)) return;

    chartInstance = echarts.init(el);

    // 解决屏幕宽度变化导致图表宽度不会自动更新问题
    const { removeEvent } = useEventListener({
      el: window,
      name: "resize",
      listener: resizeFn,
    });
    removeResizeFn = removeEvent;

    const { widthRef, screenEnum } = useBreakpoint();
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn();
      }, 30);
    }
  }

  /**
   *
   * @description 获取 chart instance
   */
  function getInstance(): Nullable<echarts.ECharts> {
    if (!chartInstance) {
      initCharts();
    }
    return chartInstance;
  }

  /**
   *
   * @description 设置 chart 配置参数
   */
  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options;

    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions));
      }, 30);
      return;
    }

    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts();

          if (!chartInstance) return;
        }
        clear && chartInstance.clear();

        chartInstance?.setOption(unref(getOptions), true);
      }, 1000);
    });
  }

  /**
   *
   * @description chart 更新尺寸
   */
  function resize() {
    chartInstance?.resize();
  }

  tryOnUnmounted(() => {
    if (!chartInstance) return;

    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });

  return {
    echarts,
    getInstance,
    setOptions,
    resize,
  };
}
