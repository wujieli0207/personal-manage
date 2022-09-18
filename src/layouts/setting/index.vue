<template>
  <el-drawer :model-value="show" title="系统设置" :before-close="handleCloseDrawer">
    <app-dark-mode-toggle v-if="getShowDarkModeToggle" />
    <theme-color
      :def="getThemeColor"
      :color-list="APP_PRESET_COLOR_LIST"
      :event="HandlerEnum.CHANGE_THEME_COLOR"
    />
  </el-drawer>
</template>

<script lang="ts" setup>
  import { AppDarkModeToggle } from '/@/components/Application'
  import ThemeColor from './components/ThemeColor.vue'
  import { useRootSetting } from '/@/hooks/setting/useRootSetting'
  import { APP_PRESET_COLOR_LIST } from '/@/settings/designSetting'
  import { HandlerEnum } from '/@/enums/appEnum'

  defineProps({
    show: {
      type: Boolean,
      default: false,
    },
  })

  const emits = defineEmits(['update:show'])

  const { getShowDarkModeToggle, getThemeColor } = useRootSetting()

  /**
   * @description 处理关闭 setting drawer
   */
  function handleCloseDrawer() {
    emits('update:show', false)
  }
</script>
