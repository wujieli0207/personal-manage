import vue from "@vitejs/plugin-vue";

import { PluginOption } from "vite";
import {
  autoImportPlugin,
  importElementPlusPlugin,
  unpluginElementPlusPlugin,
} from "./autoImport";
import { configMockPlugin } from "./mock";

export function createVitePlugins(
  viteEnv: ViteEnv,
  isBuild: boolean
): Array<PluginOption | PluginOption[]> {
  const { VITE_USE_MOCK } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(), // 必须
  ];

  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // element plus 按需导入插件
  vitePlugins.push(autoImportPlugin());
  vitePlugins.push(importElementPlusPlugin());
  vitePlugins.push(unpluginElementPlusPlugin());

  return vitePlugins;
}
