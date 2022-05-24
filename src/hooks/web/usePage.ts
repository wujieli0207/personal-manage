import { RouteLocationRaw, Router, useRouter } from "vue-router";
import { PageEnum } from "/@/enums/pageEnum";
import { isString } from "/@/utils/is";
import { logError } from "/@/utils/log";

export type RouteLocationRawEx = Omit<RouteLocationRaw, "path"> & {
  path: PageEnum;
};

/**
 *
 * @description 跳转到特定页面
 */
export function useGo(router?: Router) {
  if (!router) {
    router = useRouter();
  }
  const { push, replace } = router;

  function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) return;

    if (isString(opt)) {
      isReplace ? replace(opt).catch(logError) : push(opt).catch(logError);
    } else {
      const o = opt as RouteLocationRaw;
      isReplace ? replace(o).catch(logError) : push(o).catch(logError);
    }
  }

  return go;
}
