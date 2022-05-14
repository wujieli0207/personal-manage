import { FunctionalComponent } from "vue";
import { RouteLocation } from "vue-router";
import { RouterTransitionEnum } from "/@/enums/appEnum";

export interface DefaultContext {
  Component: FunctionalComponent & { type: Recordable };
  route: RouteLocation;
}

export function getTransitionName({
  route,
  openCache,
  cacheTabs,
  enableTransition,
  def,
}: Pick<DefaultContext, "route"> & {
  openCache: boolean;
  cacheTabs: string[];
  enableTransition: boolean;
  def: string;
}): string | undefined {
  if (!enableTransition) return undefined;

  let name: string | undefined = def;

  const isInCache = cacheTabs.includes(route.name as string);
  if (openCache) {
    name = isInCache && route.meta.loaded ? name : undefined;
  }

  console.log("name: ", name);
  return name || (route.meta.transitionName as string) || def;
}
