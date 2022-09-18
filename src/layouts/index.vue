<template>
  <el-container>
    <el-aside v-if="getShowSidebar" :class="getCollapsed ? 'el-menu--collapse' : ''">
      <wujie-siderbar />
    </el-aside>
    <el-container>
      <el-header :class="getElHeaderClass">
        <wujie-header />
      </el-header>
      <el-main>
        <wujie-page class="mt-4" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
  import { computed, unref } from 'vue'
  import WujiePage from './page/index.vue'
  import WujieHeader from './header/index.vue'
  import WujieSiderbar from './siderbar/index.vue'

  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'

  const { getCollapsed, getShowSidebar, getShowHeader } = useMenuSetting()

  const getElHeaderClass = computed(() => {
    return unref(getShowHeader) ? 'h-16' : 'h-4'
  })
</script>
