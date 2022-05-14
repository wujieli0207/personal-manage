import { ConfigEnv, loadEnv, UserConfig } from "vite";
import { resolve } from "path";
import { createVitePlugins } from "./build/vite/plugin";
import { wrapperEnv } from "./build/utils";

const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir);
};

const alias: Record<string, string> = {
  "/@": pathResolve("src"),
  "/#": pathResolve("types"),
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const viteEnv = wrapperEnv(env);
  const { VITE_PUBLIC_PATH } = viteEnv;

  const isBuild = command === "build";

  return {
    root,
    base: VITE_PUBLIC_PATH,
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias,
    },
    build: {
      sourcemap: true,
    },
    // 服务设置
    server: {
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      port: 4000,
      open: true, // 自动打开浏览器
      strictPort: true, // 端口被占用直接退出
      // 接口代理
      proxy: {
        "/api": {
          target: "http://localhost:8081/",
          changeOrigin: true, // 允许跨域
          ws: true,
          rewrite: (path) => {
            return path.replace(/^\/api/, "");
          }, // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
        },
      },
    },
  };
};

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     AutoImport({
//       resolvers: [ElementPlusResolver()],
//     }),
//     Components({
//       resolvers: [ElementPlusResolver()],
//     }),
//   ],

// });
