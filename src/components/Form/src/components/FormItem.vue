<script lang="tsx">
  import { computed, defineComponent, PropType, unref } from "vue";
  import { BasicHelp } from "/@/components/Basic";
  import { FormActionType, FormSchema, RenderCallbackParams } from "../types/form";
  import { TableActionType } from "/@/components/Table/src/types/table";
  import { componentMap } from "../componentMap";
  import { isFunction, isArray } from "/@/utils/is";
  import { getSlot } from "/@/utils/helper/tsxHelper";
  import type { PersonFormProps } from "../types/form";
  import { createPlaceholderMessage } from "../helper";

  export default defineComponent({
    name: "BasicFormItem",
    props: {
      schema: {
        type: Object as PropType<FormSchema>,
        default: () => ({}),
      },
      formProps: {
        type: Object as PropType<PersonFormProps>,
        default: () => ({}),
      },
      allDefaultValues: {
        type: Object as PropType<Recordable>,
        default: () => ({}),
      },
      formModel: {
        type: Object as PropType<Recordable>,
        default: () => ({}),
      },
      setFormModel: {
        type: Function as PropType<(key: string, value: any) => void>,
        default: null,
      },
      tableAction: {
        type: Object as PropType<TableActionType>,
        default: () => ({}),
      },
      formActionType: {
        type: Object as PropType<FormActionType>,
        default: () => ({}),
      },
    },
    setup: (props, { slots }) => {
      const getValues = computed((): RenderCallbackParams => {
        const { schema, formModel } = props;

        return {
          schema,
          values: {} as Recordable,
          model: formModel,
          field: schema.field,
        };
      });

      const getComponentProps = computed(() => {
        const { schema } = props;
        let { componentProps = {} } = schema;

        if (isFunction(componentProps)) {
          componentProps = componentProps({ schema }) ?? {};
        }

        if (schema.component === "Divider") {
          componentProps = Object.assign({ direction: "horizontal" }, componentProps);
        }

        return componentProps as Recordable;
      });

      /**
       * @description 渲染 label 和提示语
       */
      function renderLabelhelpMessage() {
        const { label, subLabel, helpMessage, helpComponentProps } = props.schema;

        const renderLabel = subLabel ? (
          <span>
            {label} <span>{subLabel}</span>
          </span>
        ) : (
          label
        );

        const getHelpMessage = isFunction(helpMessage)
          ? helpMessage(unref(getValues))
          : helpMessage;

        if (!getHelpMessage || (isArray(getHelpMessage) && getHelpMessage.length === 0)) {
          return renderLabel;
        }

        return (
          <span>
            {renderLabel}
            <BasicHelp content={getHelpMessage} placement="top" {...helpComponentProps} />
          </span>
        );
      }

      /**
       * @description 渲染组件
       */
      function renderComponent() {
        const { component, renderComponentContent } = props.schema;

        const Comp = componentMap.get(component) as ReturnType<typeof defineComponent>;

        const { autoSetPlaceHolder } = props.formProps;

        const propsData: Recordable = {
          ...unref(getComponentProps),
        };

        const isCreatePlaceholder = autoSetPlaceHolder;

        if (isCreatePlaceholder && component) {
          propsData.placeholder =
            unref(getComponentProps)?.placeholder || createPlaceholderMessage(component);
        }

        const compAttr: Recordable = {
          ...propsData,
        };

        if (!renderComponentContent) {
          if (component === "Select") {
            return (
              <Comp {...compAttr}>
                {compAttr.options.map((item: Record<string, unknown>) => {
                  return <el-option label={item.label} value={item.value} key={item.key} />;
                })}
              </Comp>
            );
          } else {
            return <Comp {...compAttr} />;
          }
        }
      }

      /**
       * @description 渲染表单项
       */
      function renderItem() {
        const { component, slot, render } = props.schema;

        if (component === "Divider") {
          return <el-divider {...unref(getComponentProps)}>{renderLabelhelpMessage()}</el-divider>;
        } else {
          const getContent = () => {
            return slot
              ? getSlot(slots, slot, unref(getValues))
              : render
              ? render(unref(getValues))
              : renderComponent();
          };

          return (
            <el-form-item>
              <div class="flex">
                <label class="el-form-item__label">{renderLabelhelpMessage()}</label>
                <div class="flex-1">{getContent()}</div>
              </div>
            </el-form-item>
          );
        }
      }

      return () => {
        const getContent = () => {
          return renderItem();
        };
        return <el-col>{getContent()}</el-col>;
      };
    },
  });
</script>
