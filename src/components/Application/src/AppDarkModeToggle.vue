<template>
  <div v-if="getShowDarkModeToggle" class="flex flex-col items-center">
    <el-divider content-position="center">
      <span class="text-xl">系统主题</span>
    </el-divider>
    <el-switch
      class=""
      v-model="isDark"
      active-text="暗色"
      inactive-text="亮色"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRootSetting } from "/@/hooks/setting/useRootSetting";

import { useDark } from "/@/hooks/web/useDark";

const { getShowDarkModeToggle } = useRootSetting();

const isDark = useDark();
</script>
