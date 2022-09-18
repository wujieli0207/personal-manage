<template>
  <el-form v-bind="getBindValue">
    <el-row>
      <template v-for="schema in getSchema" :key="schema.field">
        <form-item
          :schema="schema"
          :form-props="getProps"
          :all-default-values="defaultValueRef"
        ></form-item>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
  import { cloneDeep } from 'lodash-es'
  import { computed, onMounted, reactive, ref, unref, useAttrs } from 'vue'
  import { basicProps } from './props'
  import FormItem from './components/FormItem.vue'
  import { FormSchema, PersonFormProps } from './types/form'
  import { useFormValues } from './hooks/useFormValues'

  const props = defineProps(basicProps)
  const attrs = useAttrs()

  const formModel = reactive<Recordable>({})

  const defaultValueRef = ref<Recordable>({})

  const getProps = computed((): PersonFormProps => {
    return { ...props } as PersonFormProps
  })

  const getSchema = computed((): FormSchema[] => {
    const schemas = props.schemas

    return cloneDeep(schemas) as FormSchema[]
  })

  const getBindValue = computed(() => {
    return { ...attrs, ...props, ...unref(getProps) }
  })

  const { initDefault } = useFormValues({ defaultValueRef, getSchema, getProps, formModel })

  onMounted(() => {
    initDefault()
  })
</script>
