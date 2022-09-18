<template>
  <div>
    <table-title :title="title" :help-message="titleHelpMessage" />
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue'
  import TableTitle from './TableTitle.vue'

  defineProps({
    title: {
      type: String,
      default: '',
    },
    titleHelpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: null,
    },
  })
</script>
