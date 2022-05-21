import vue from "@vitejs/plugin-vue";

import { PluginOption } from "vite";
import {
  autoImportPlugin,
  importElementPlusPlugin,
  unpluginElementPlusPlugin,
} from "./autoImport";
import { configMockPlugin } from "./mock";
import { purgeIconsPlugin } from "./purgeIcons";
import { configSvgIconPlugin } from "./svgSprite";

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

  // iconify 插件
  vitePlugins.push(purgeIconsPlugin());

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconPlugin(isBuild));

  return vitePlugins;
}
