<template>
  <el-card>
    <markdown v-model:value="markdownValue" class="my-4" @change="handleChange" />
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Markdown } from '/@/components/Markdown'

const markdownValue = ref('')

/**
 * @description markdown 数据改变
 */
function handleChange(v: string) {
  markdownValue.value = v
}
</script>
