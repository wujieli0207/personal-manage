import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";

export function configSvgIconPlugin(isBuild: boolean) {
  const svgIconPlugin = createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), "src/assets/icons")],
    svgoOptions: isBuild,
    symbolId: "icon-[dir]-[name]",
  });

  return svgIconPlugin;
}
