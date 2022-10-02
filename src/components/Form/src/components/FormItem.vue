<script lang="tsx">
import { computed, defineComponent, PropType, unref } from 'vue'
import { BasicHelp } from '/@/components/Basic'
import { FormActionType, FormSchema, RenderCallbackParams } from '../types/form'
import { ValidationRule } from '../types/formItem'
import { TableActionType } from '/@/components/Table/src/types/table'
import { componentMap } from '../componentMap'
import { isFunction, isArray, isNullOrUnDef, isString, isObject } from '/@/utils/is'
import { getSlot } from '/@/utils/helper/tsxHelper'
import type { PersonFormProps } from '../types/form'
import { createPlaceholderMessage } from '../helper'
import { cloneDeep } from 'lodash-es'

export default defineComponent({
  name: 'BasicFormItem',
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
      const { schema, formModel, allDefaultValues } = props

      return {
        schema,
        values: {
          ...allDefaultValues,
        } as Recordable,
        model: formModel,
        field: schema.field,
      }
    })

    const getComponentProps = computed(() => {
      const { schema } = props
      let { componentProps = {} } = schema

      if (isFunction(componentProps)) {
        componentProps = componentProps({ schema }) ?? {}
      }

      if (schema.component === 'Divider') {
        componentProps = Object.assign({ direction: 'horizontal' }, componentProps)
      }

      return componentProps as Recordable
    })

    function handleRules(): ValidationRule[] {
      const {
        component,
        label,
        required,
        rulesMessageJoinLabel,
        rules: defRules = [],
      } = props.schema
      const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } = props.formProps

      let rules: ValidationRule[] = cloneDeep(defRules) as ValidationRule[]

      const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel')
        ? rulesMessageJoinLabel
        : globalRulesMessageJoinLabel

      const defaultMsg = createPlaceholderMessage(component) + `${joinLabel ? label : ''}`

      function validator(rule: any, value: any) {
        const msg = rule.message ?? defaultMsg

        // 空值
        if (isNullOrUnDef(value)) {
          return Promise.reject(msg)
        }
        // 空数组
        if (isArray(value) && value.length === 0) {
          return Promise.reject(msg)
        }
        // 空字符串
        if (isString(value) && value.trim() === '') {
          return Promise.reject(msg)
        }
        // 非关联选择 tree 组件
        if (
          isObject(value) &&
          Reflect.has(value, 'checked') &&
          Reflect.has(value, 'halfChecked') &&
          isArray(value.checked) &&
          isArray(value.halfChecked) &&
          value.checked.length === 0 &&
          value.halfChecked.length === 0
        ) {
          return Promise.reject(msg)
        }

        return Promise.resolve()
      }

      const getRequired = isFunction(required) ? required(unref(getValues)) : required

      // 1. 设置了 required 属性，但是没有其他 rules，就创建一个验证规则
      // 2. 设置了 required 属性，也有其他 rules，只有 rules 中 required 属性不存在时才添加 required
      // 优先级：rules 内的required 大于外部 required

      if (getRequired) {
        // 没有设置 rules 的情况
        if (!rules || rules.length === 0) {
          rules = [{ required: getRequired, validator }]
        } else {
          // 设置了 rules 但是没有 rules 中没有设置 required 的情况
          const requiredIndex = rules.findIndex((rule) => Reflect.has(rule, 'required'))
          if (requiredIndex === -1) {
            rules.push({ required: getRequired, validator })
          }
        }
      }

      // 处理创建了 rule 但没有 validator 的情况
      const requiredruleIndex = rules.findIndex((rule) => {
        return Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator')
      })
      if (requiredruleIndex !== -1) {
        // const rule = rules[requiredruleIndex];
      }

      // 处理内容最大长度规则
      const characterIndex = rules.findIndex((rule) => rule.max)
      if (characterIndex !== -1 && !rules[characterIndex].validator) {
        rules[characterIndex].message =
          rules[characterIndex].message ?? `字符数应该小于${rules[characterIndex].max}位`
      }

      return rules
    }

    /**
     * @description 渲染 label 和提示语
     */
    function renderLabelhelpMessage() {
      const { label, subLabel, helpMessage, helpComponentProps } = props.schema

      const renderLabel = subLabel ? (
        <span>
          {label} <span>{subLabel}</span>
        </span>
      ) : (
        label
      )

      const getHelpMessage = isFunction(helpMessage) ? helpMessage(unref(getValues)) : helpMessage

      if (!getHelpMessage || (isArray(getHelpMessage) && getHelpMessage.length === 0)) {
        return renderLabel
      }

      return (
        <span>
          {renderLabel}
          <BasicHelp content={getHelpMessage} placement="top" {...helpComponentProps} />
        </span>
      )
    }

    /**
     * @description 渲染组件
     */
    function renderComponent() {
      const { component, renderComponentContent } = props.schema

      const Comp = componentMap.get(component) as ReturnType<typeof defineComponent>

      const { autoSetPlaceHolder } = props.formProps

      const propsData: Recordable = {
        ...unref(getComponentProps),
      }

      const isCreatePlaceholder = autoSetPlaceHolder

      if (isCreatePlaceholder && component) {
        propsData.placeholder =
          unref(getComponentProps)?.placeholder || createPlaceholderMessage(component)
      }

      propsData.formValues = unref(getValues)

      const compAttr: Recordable = {
        ...propsData,
      }

      if (!renderComponentContent) {
        if (component === 'Select') {
          return (
            <Comp {...compAttr}>
              {compAttr.options.map((item: Record<string, unknown>) => {
                return <el-option label={item.label} value={item.value} key={item.key} />
              })}
            </Comp>
          )
        } else {
          return <Comp {...compAttr} />
        }
      }
    }

    /**
     * @description 渲染表单项
     */
    function renderItem() {
      const { component, field, itemProps, slot, render, suffix } = props.schema

      if (component === 'Divider') {
        return <el-divider {...unref(getComponentProps)}>{renderLabelhelpMessage()}</el-divider>
      } else {
        const getContent = () => {
          return slot
            ? getSlot(slots, slot, unref(getValues))
            : render
            ? render(unref(getValues))
            : renderComponent()
        }

        const showSuffix = !!suffix
        const getSuffix = isFunction(suffix) ? suffix(unref(getValues)) : suffix

        return (
          <div>
            <el-form-item
              name={field}
              rules={handleRules()}
              {...(itemProps as Recordable)}
              v-slots={{
                label: () => {
                  return renderLabelhelpMessage()
                },
              }}
            >
              <div class="flex">
                <div class="flex-1">{getContent()}</div>
                {showSuffix && <span class="pl-2">{getSuffix}</span>}
              </div>
            </el-form-item>
          </div>
        )
      }
    }

    return () => {
      const { component } = props.schema

      if (!componentMap.has(component)) return null

      const getContent = () => {
        return renderItem()
      }
      return <el-col>{getContent()}</el-col>
    }
  },
})
</script>
