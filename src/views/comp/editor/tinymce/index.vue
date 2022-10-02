<template>
  <div>
    <el-card>
      <tinymce v-model="value" class="my-4" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Tinymce } from '/@/components/Tinymce'

const value = ref('')
</script>
