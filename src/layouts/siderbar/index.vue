<template>
  <div class="flex items-center justify-center h-12 text-xl font-semibold text-white bg-slate-900">
    <div v-if="!getCollapsed">{{ title }}</div>
  </div>
  <el-menu class="h-screen" :router="true" :collapse="getCollapsed" :default-active="activeMenu">
    <sub-item :menu-list="menuList"></sub-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SubItem from './components/SubItem.vue'
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
import { Menu } from '/@/router/types'
import { getMenus } from '/@/router/menus'

const route = useRoute()

const { getCollapsed } = useMenuSetting()

const title = import.meta.env.VITE_GLOB_APP_TITLE

const activeMenu = computed(() => route.path)
const menuList: Menu[] = getMenus()
</script>
