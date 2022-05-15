import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";

export function autoImportPlugin() {
  return AutoImport({
    resolvers: [ElementPlusResolver()],
  });
}

export function importElementPlusPlugin() {
  return Components({
    resolvers: [ElementPlusResolver()],
  });
}

export function unpluginElementPlusPlugin() {
  return ElementPlus({});
}
