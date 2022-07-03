import { ColProps, FormItemProp, FormProps, FormRules } from "element-plus";
import { VNode } from "vue";
import { ComponentType, NamePath } from "./index";
import { TableActionType } from "/@/components/Table/src/types/table";

export interface RenderCallbackParams {
  schema: FormSchema;
  values: Recordable;
  model: Recordable;
  field: string;
}

// 表单操作相关函数类型定义
export interface FormActionType {
  submit: () => Promise<void>;
  getFieldsValue: () => Recordable;
  setFieldsValue: <T>(values: T) => Promise<void>;
  resetFields: () => Promise<void>;
  clearValidate: (name?: string | string[]) => Promise<void>;
  updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
  resetSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
  setProps: (PersonFormProps: Partial<PersonFormProps>) => Promise<void>;
  removeSchemaByField: (field: string | string[]) => Promise<void>;
  appendSchemaByField: (
    schema: FormSchema,
    prefixField: string | undefined,
    first?: boolean | undefined
  ) => Promise<void>;
  validateFields: (nameList?: NamePath) => Promise<unknown>;
  validate: (nameList?: NamePath[]) => Promise<unknown>;
  scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<unknown>;
}

export interface PersonFormProps extends FormProps {
  schemas?: FormSchema[];
  autoSetPlaceHolder?: boolean;
  // 规则提示是否要携带 label 内容
  rulesMessageJoinLabel: boolean;
}

export interface FormSchema {
  field: string; // 字段名
  label: string | VNode; // 字段标签
  subLabel?: string; // 字段辅助标签
  // 文字右侧的提示内容
  helpMessage?:
    | string
    | string[]
    | ((renderCallbackParams: RenderCallbackParams) => string | string[]);
  helpComponentProps?: Partial<HelpComponentProps>;
  labelWidth?: string | number; // 标签宽度
  component: ComponentType; // 渲染的组件类型
  // 渲染的组件配置参数
  componentProps?:
    | ((opt: {
        schema: FormSchema;
        formActionType: FormActionType;
        tableActionType: TableActionType;
        formModel: Recordable;
      }) => Recordable)
    | object;
  // 是否必填
  required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
  // 后缀
  suffix?: string | number | ((renderCallbackParams: RenderCallbackParams) => string | number);
  rules?: FormRules[]; // 校验规则
  rulesMessageJoinLabel?: boolean; // 检验后标签是否有提示信息
  itemProps?: Partial<FormItemProp>; // 表单项属性
  colProps?: Partial<ColProps>; // 列属性
  defaultValue?: any; // 默认值
  isAdvanced?: boolean;
  span?: number;
  // 特定情况下展示
  ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
  // 是否展示
  show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  render?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string;
  renderColContent?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string;
  renderComponentContent?:
    | ((renderCallbackParams: RenderCallbackParams) => unknown)
    | VNode
    | VNode[]
    | string;
  slot?: string; // 为 formItem 定义的插槽
  colSlot?: string; // 列插槽
  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
  dynamicRules?: (renderCallbackParams: RenderCallbackParams) => FormRules[];
}

// 提示内容相关属性
export interface HelpComponentProps {
  maxWidth: string;
  showIndex: boolean;
  text: string | number;
  color: string;
  fontSize: string;
  icon: string;
  absolute: boolean;
  position: string;
}
