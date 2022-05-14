import type { PropType as VuePropType } from "vue";

declare global {
  declare type Recordable<T = any> = Record<string, T>;

  declare type Nullable<T> = T | null;

  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };

  declare interface ViteEnv {
    VITE_PORT: number; // 项目端口号
    VITE_USE_MOCK: boolean; // 是否使用 mock 数据
  }
}
