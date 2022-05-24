<template>
  <!-- 顶部菜单栏：面包屑、用户设置、系统设置 -->
  <div v-if="getShowHeader" class="flex items-center justify-between h-12 bg-slate-900">
    <div class="flex items-center">
      <!-- 右侧菜单栏折叠 -->
      <div
        class="flex flex-row p-4 cursor-pointer hover:bg-slate-700"
        @click.stop="toggleCollapsed"
      >
        <el-icon v-if="getCollapsed">
          <fold v-if="getCollapsed" class="text-white rotate-180" />
        </el-icon>
        <el-icon v-else>
          <fold class="text-white" />
        </el-icon>
      </div>

      <!-- 面包屑导航 -->
      <bradcrumb class="ml-4" />
    </div>

    <div class="flex items-center">
      <!-- 右侧下拉菜单 -->
      <user-menu />

      <!-- 设置 -->
      <div
        class="flex items-center h-12 p-4 cursor-pointer hover:bg-slate-700"
        @click="openSettingDrawer"
      >
        <el-icon>
          <Setting class="text-xl text-white" />
        </el-icon>
      </div>
    </div>
  </div>

  <!-- 导航 Tab、全屏设置 -->
  <div class="flex justify-between h-8 px-4 bg-gray-200">
    <div>
      <tabs />
    </div>

    <div>
      <!-- 全屏 -->
      <full-screen />
    </div>
  </div>

  <!-- 样式设置抽屉 -->
  <setting-drawer v-model:show="isSettingShow"></setting-drawer>
</template>

<script lang="ts" setup>
  import { Fold, Setting } from "@element-plus/icons-vue";
  import { ref } from "vue";
  import SettingDrawer from "../setting/index.vue";
  import Bradcrumb from "./components/Bradcrumb.vue";
  import UserMenu from "./components/UserMenu.vue";
  import FullScreen from "./components/FullScreen.vue";
  import Tabs from "../Tabs/index.vue";
  import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";

  const { getCollapsed, getShowHeader, toggleCollapsed } = useMenuSetting();

  const isSettingShow = ref(false);

  /**
   * @description 打开后台设置侧边栏抽屉
   */
  function openSettingDrawer() {
    isSettingShow.value = true;
  }
</script>
