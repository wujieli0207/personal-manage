<template>
  <basic-title v-if="getTitle" :help-message="helpMessage">
    {{ getTitle }}
  </basic-title>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { PropType } from 'vue'
import { BasicTitle } from '/@/components/Basic'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  helpMessage: {
    type: [Array, String] as PropType<string[] | string>,
    default: '',
  },
})

const getTitle = computed(() => {
  const { title } = props

  return title
})
</script>
