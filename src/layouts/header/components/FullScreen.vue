<template>
  <div class="flex items-center h-8 cursor-pointer" @click="toggle">
    <el-tooltip :content="getTitle" :show-after="300">
      <el-icon class="text-gray-500 hover:text-black"><FullScreen /></el-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { FullScreen } from "@element-plus/icons-vue";
import { computed, unref } from "vue";
import { useFullContent } from "/@/hooks/web/useFullContent";
import { useAppStore } from "/@/store/modules/app";

const appStore = useAppStore();

const { getFullContent } = useFullContent();

const getTitle = computed(() => {
  return unref(getFullContent) ? "退出全屏" : "全屏";
});

function toggle() {
  appStore.setProjectConfig({ fullContent: !unref(getFullContent) });
}
</script>
