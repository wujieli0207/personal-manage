<template>
  <!-- TODO tailwind leading-12 无效 -->
  <div
    class="h-12 text-xl font-semibold text-center text-white bg-slate-900"
    style="line-height: 3rem"
  >
    <div v-if="!getCollapsed">{{ title }}</div>
  </div>
  <!-- TODO 侧边栏暂时不是动态生成的 -->
  <el-menu class="h-screen" :router="true" :collapse="getCollapsed">
    <el-menu-item index="/home">
      <el-icon><home-filled /></el-icon>
      <template #title>
        <span>首页</span>
      </template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><picture-filled /></el-icon>
        <span>个人管理</span>
      </template>
      <el-menu-item index="/weekReport">
        <template #title> 每周统计数据查看 </template>
      </el-menu-item>
      <el-menu-item index="">
        <template #title> 每周统计数据维护 </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { HomeFilled, PictureFilled } from "@element-plus/icons-vue";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";

const { getCollapsed } = useMenuSetting();

const title = import.meta.env.VITE_GLOB_APP_TITLE;
</script>
