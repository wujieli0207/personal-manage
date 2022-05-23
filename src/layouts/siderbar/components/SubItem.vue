<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 处理存在 children 的情况 -->
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
      <template #title>
        <el-icon>
          <span class="iconify" :data-icon="item.icon" />
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <sub-item :menu-list="item.children"></sub-item>
    </el-sub-menu>
    <!-- else 为不存在 children 的情况 -->
    <el-menu-item v-else :index="item.path">
      <template #title>
        <el-icon v-if="!!item.icon">
          <span class="iconify" :data-icon="item.icon" />
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
  import { PropType } from "vue";
  import { Menu } from "/@/router/types";

  defineProps({
    menuList: {
      type: Array as PropType<Menu[]>,
      default: () => [],
    },
  });
</script>
