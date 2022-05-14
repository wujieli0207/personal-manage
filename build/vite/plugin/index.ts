import vue from "@vitejs/plugin-vue";

import { PluginOption } from "vite";
import { autoImportPlugin, importElementPlusPlugin } from "./autoImport";

export function createVitePlugins(
  viteEnv: ViteEnv,
  isBuild: boolean
): Array<PluginOption | PluginOption[]> {
  const { VITE_USE_MOCK } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(), // 必须
  ];

  //   VITE_USE_MOCK && vite;

  // element plus 按需导入插件
  vitePlugins.push(autoImportPlugin());
  vitePlugins.push(importElementPlusPlugin());

  return vitePlugins;
}
