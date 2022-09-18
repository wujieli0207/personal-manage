import { MenuSetting } from '/#/config'
import { computed, unref } from 'vue'
import { useAppStore } from '/@/store/modules/app'
import { useFullContent } from '/@/hooks/web/useFullContent'

export function useMenuSetting() {
  const appStore = useAppStore()
  const { getFullContent: fullContent } = useFullContent()

  // 侧边栏折叠属性
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)

  // 侧边栏是否展示
  // 1. 全屏时隐藏侧边栏
  const getShowSidebar = computed(() => !unref(fullContent))

  // header是否展示
  // 1. 全屏时隐藏header
  const getShowHeader = computed(() => !unref(fullContent))

  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting })
  }

  /**
   * @description 控制侧边栏折叠
   */
  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    })
  }

  return {
    setMenuSetting,
    toggleCollapsed,

    getCollapsed,
    getShowSidebar,
    getShowHeader,
  }
}
