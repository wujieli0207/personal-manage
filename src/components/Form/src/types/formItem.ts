import { ColProps } from "element-plus";
import { VNode, VNodeChild } from "vue";
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

// 表单项校验规则
export interface ValidationRule {
  message?: VNode | VNode[] | JSX.Element | string;
  type?: string;
  required?: boolean;
  // 将只包含空格的必需字段视为错误
  whitespace?: boolean;
  // 字段具体长度校验
  len?: number;
  // 最小长度校验
  min?: number;
  // 最大长度校验
  max?: number;
  // 枚举值校验
  enum?: string | string[];
  // 正则模式校验
  pattern?: RegExp;
  // 校验前转换内容
  transform?: (value: any) => any;
  // 校验函数
  validator?: (rule: any, value: any, callback: any, source?: any, options?: any) => any;
  trigger?: string;
}
