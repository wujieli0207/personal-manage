import { ColProps } from "element-plus";
import { VNodeChild } from "vue";
import { NamePath } from "./index";

export interface FormItem {
  label?: string | VNodeChild | JSX.Element;
  labelAlign?: "left" | "right";
  name?: NamePath;
  rules?: object | object[];
  colon?: boolean; // 展示在 label text 后的内容
  extra?: string | VNodeChild | JSX.Element; // 类似 help 的提示内容
  hasFeedback?: boolean;
  help?: string | VNodeChild | JSX.Element; // 提示信息
  labelCol?: ColProps;
  required?: boolean;
  validateStatus?: "" | "success" | "warning" | "error" | "validating";
  wrapperCol?: ColProps;
  htmlFor?: string;
  autoLink?: boolean;
  validateFirst?: boolean;
  validateTrigger?: string | string[] | false;
}
