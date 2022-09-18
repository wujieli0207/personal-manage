<template>
  <el-tabs
    v-model="activeKeyRef"
    closable
    type="card"
    @tab-change="handleTabClick"
    @tab-remove="handleTabClose"
  >
    <el-tab-pane
      v-for="item in getTabsState"
      :key="item.query ? item.fullPath : item.path"
      :name="item.query ? item.fullPath : item.path"
      :label="item.meta.title"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
  import { ref, computed, unref } from 'vue'
  import { RouteLocationNormalized, useRouter } from 'vue-router'
  import { initAffixTabs } from './useMultipleTabs'
  import { useMultipleTabStore } from '/@/store/modules/multipleTab'
  import { useUserStore } from '/@/store/modules/user'
  import { listenerRouteChange } from '/@/logics/mitt/routeChange'
  import { REDIRECT_NAME } from '/@/router/constant'
  import { useGo } from '/@/hooks/web/usePage'
  import { TabPanelName } from 'element-plus'

  const router = useRouter()

  const go = useGo()

  const tabStore = useMultipleTabStore()
  const userStore = useUserStore()

  const activeKeyRef = ref('')
  const _affixTextList = initAffixTabs()

  const getTabsState = computed(() => {
    return tabStore.getTabList.filter((item) => !item.meta.hideTab)
  })

  const unClose = computed(() => unref(getTabsState).length === 1)

  // 监听路由改变，增加 tab
  listenerRouteChange((route: RouteLocationNormalized) => {
    const { name } = route
    if (name === REDIRECT_NAME || !route || !userStore.getToken) return

    const { path, fullPath, meta } = route
    const { currentActiveMenu, hideTab } = meta

    const isHide = !hideTab ? null : currentActiveMenu
    const p = isHide || fullPath || path

    if (activeKeyRef.value !== p) {
      activeKeyRef.value = p as string
    }

    // 如果 meta 配置了 hideTab
    if (isHide) {
      // 存在父级 route， 把父级 route 添加进去
      const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu)
      findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized)
    } else {
      // 直接添加
      tabStore.addTab(unref(route))
    }
  })

  /**
   * @description tab 点击跳转对应路由
   */
  function handleTabClick(name: TabPanelName) {
    activeKeyRef.value = name.toString()
    go(activeKeyRef.value, false)
  }

  /**
   * @description 关闭 tab
   */
  function handleTabClose(name: TabPanelName) {
    // 只有一个 tab 时不关闭
    if (unref(unClose)) return

    tabStore.closeTabByKey(name.toString(), router)
  }
</script>
