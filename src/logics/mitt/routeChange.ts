import mitt from "mitt";
import { RouteLocationNormalized } from "vue-router";
import { getRawRoute } from "/@/utils";

const emitter = mitt();

const key = Symbol();

let lastChangeTab: RouteLocationNormalized;

// 监听路由改变，动态触发 tab 和 menu 的改变

export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  emitter.on(key, () => callback);
  immediate && lastChangeTab && callback(lastChangeTab);
}

export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute);
  emitter.emit(key, r);
  lastChangeTab = r;
}

export function removeTabChangeListener() {
  emitter.all.clear();
}
