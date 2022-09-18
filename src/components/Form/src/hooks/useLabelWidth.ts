import { computed, Ref, unref } from 'vue'
import { FormSchema, PersonFormProps } from '../types/form'

export function useItemLabelWidth(schemaItemRef: Ref<FormSchema>, propsRef: Ref<PersonFormProps>) {
  return computed(() => {
    const schemaItem = unref(schemaItemRef)

    const { labelWidth } = unref(propsRef)
    return `${schemaItem}${labelWidth}`
  })
}
