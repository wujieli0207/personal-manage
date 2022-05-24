import type { PropType as _VuePropType } from "vue";

declare global {
  type Recordable<T = any> = Record<string, T>;

  type Nullable<T> = T | null;

  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };

  interface ViteEnv {
    VITE_PORT: number; // 项目端口号
    VITE_USE_MOCK: boolean; // 是否使用 mock 数据
    VITE_PUBLIC_PATH: string;
  }
}
