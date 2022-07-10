<template>
  <span>
    <slot></slot>
    <basic-help v-if="helpMessage" :content="helpMessage"></basic-help>
  </span>
</template>

<script lang="ts" setup>
  import type { PropType } from "vue";
  import BasicHelp from "./BasicHelp.vue";

  defineProps({
    helpMessage: {
      type: [Array, String] as PropType<string[] | string>,
      default: "",
    },
  });
</script>
