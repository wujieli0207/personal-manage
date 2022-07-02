<template>
  <basic-form :schemas="schemas"></basic-form>
</template>

<script lang="ts" setup>
  import { BasicForm } from "/@/components/Form";
  import { FormSchema } from "/@/components/Form/src/types/form";

  const schemas: FormSchema[] = [
    {
      field: "divider-basic",
      component: "Divider",
      label: "基础字段",
      colProps: {
        span: 24,
      },
    },
    {
      field: "date-picker",
      component: "DatePicker",
      label: "日期",
      colProps: {
        span: 8,
      },
    },
  ];
</script>
