import { PluginOption } from "vite";
import { viteThemePlugin } from "vite-plugin-theme";

export function configThemePlugin(isBuild: boolean): PluginOption[] {
  const plugin = [viteThemePlugin()];

  return plugin as unknown as PluginOption[];
}
