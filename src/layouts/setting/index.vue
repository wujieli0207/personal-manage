<template>
  <el-drawer :model-value="show" title="系统设置" :before-close="handleCloseDrawer">
    <app-dark-mode-toggle v-if="getShowDarkModeToggle" />
  </el-drawer>
</template>

<script lang="ts" setup>
  import { AppDarkModeToggle } from "/@/components/Application";
  import { useRootSetting } from "/@/hooks/setting/useRootSetting";

  defineProps({
    show: {
      type: Boolean,
      default: false,
    },
  });

  const emits = defineEmits(["update:show"]);

  const { getShowDarkModeToggle } = useRootSetting();

  /**
   * @description 处理关闭 setting drawer
   */
  function handleCloseDrawer() {
    emits("update:show", false);
  }
</script>
