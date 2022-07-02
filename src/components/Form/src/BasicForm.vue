<template>
  <el-form>
    <el-row>
      <template v-for="schema in getSchemas" :key="schema.field">
        <form-item :schema="schema"></form-item>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
  import { cloneDeep } from "lodash-es";
  import { computed } from "vue";
  import { basicProps } from "./props";
  import FormItem from "./components/FormItem.vue";
  import { FormSchema } from "./types/form";

  const props = defineProps(basicProps);

  const getSchemas = computed((): FormSchema[] => {
    const schemas = props.schemas;

    return cloneDeep(schemas) as FormSchema[];
  });
</script>
