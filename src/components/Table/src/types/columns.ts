export interface ColumnProps {
  // 字段名称
  prop: string;
  // 字典展示标签
  label: string;
  // 列是否固定
  fixed?: boolean | "left" | "right";
  // 对齐方式
  align?: "left" | "right" | "center";
  // 列宽
  width?: string | number;
  // 插槽
  slots?: Recordable<string>;
}
