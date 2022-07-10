import { Column } from "element-plus";
import { VueNode } from "/@/utils/propTypes";

export interface BasicColumn extends Omit<Column<Recordable>, "width"> {
  slots?: Recordable;
  // 字段名称
  prop: string;
  // 字典展示标签
  label: string;
  customLabel?: VueNode;
  helpMessage?: string | string[];
  dataIndex?: string;
  // 列宽
  width?: number;
}
