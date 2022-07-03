import { cloneDeep } from "lodash-es";
import { isUnDef, isNullOrUnDef } from "/@/utils/is";
import { ComputedRef, Ref, unref } from "vue";
import { FormSchema, PersonFormProps } from "../types/form";

interface UseFormValuesContext {
  defaultValueRef: Ref<any>;
  getSchema: ComputedRef<FormSchema[]>;
  getProps: ComputedRef<PersonFormProps>;
  formModel: Recordable;
}

export function useFormValues({
  defaultValueRef,
  getSchema,
  getProps,
  formModel,
}: UseFormValuesContext) {
  console.log("getProps: ", getProps);

  // 初始化默认值
  function initDefault() {
    const schemas = unref(getSchema);
    const obj: Recordable = {};

    schemas.forEach((item) => {
      const { defaultValue } = item;
      console.log("defaultValue: ", defaultValue);

      if (!isNullOrUnDef(defaultValue)) {
        obj[item.field] = defaultValue;

        if (isUnDef(formModel[item.field])) {
          formModel[item.field] = defaultValue;
        }
      }
    });
    defaultValueRef.value = cloneDeep(obj);
  }

  return { initDefault };
}
