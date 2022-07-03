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
    {
      field: "Input",
      component: "Input",
      label: "输入框",
      helpMessage: ["Input组件", "Input组件换行示例"],
      componentProps: () => {
        return {
          placeholder: "自定义 Input placeholder",
        };
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: "Select",
      component: "Select",
      label: "选择框",
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: "选项1",
            value: "1",
            key: "1",
          },
          {
            label: "选项2",
            value: "2",
            key: "2",
          },
        ],
      },
    },
    {
      field: "Switch",
      component: "Switch",
      label: "开关",
      colProps: {
        span: 8,
      },
    },
    {
      field: "Checkbox",
      component: "Checkbox",
      label: "复选框",
      colProps: {
        span: 8,
      },
    },
  ];
</script>
