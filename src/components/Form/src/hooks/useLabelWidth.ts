import { FormProps } from "element-plus";
import { computed, Ref, unref } from "vue";
import { FormSchema } from "../types/form";

export function useItemLabelWidth(schemaItemRef: Ref<FormSchema>, propsRef: Ref<FormProps>) {
  return computed(() => {
    const schemaItem = unref(schemaItemRef);

    const { labelWidth } = unref(propsRef);
    return `${schemaItem}${labelWidth}`;
  });
}
