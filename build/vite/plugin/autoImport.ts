import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

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
