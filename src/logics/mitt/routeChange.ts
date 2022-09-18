import mitt, { Handler } from 'mitt'
import { RouteLocationNormalized } from 'vue-router'
import { getRawRoute } from '/@/utils'

const emitter = mitt()

const key = Symbol()

let lastChangeTab: RouteLocationNormalized

// 监听路由改变，动态触发 tab 和 menu 的改变

export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  // TODO callback 声明 Handler<unknown> 可能存在不合理的地方
  emitter.on(key, callback as Handler<unknown>)
  immediate && lastChangeTab && callback(lastChangeTab)
}

export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute)
  emitter.emit(key, r)
  lastChangeTab = r
}

export function removeTabChangeListener() {
  emitter.all.clear()
}
