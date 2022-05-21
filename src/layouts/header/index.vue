<template>
  <div class="flex items-center justify-between h-12 bg-slate-900">
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
      <el-dropdown
        class="flex items-center h-12 p-4 text-center cursor-pointer hover:bg-slate-700"
      >
        <div class="flex items-center">
          <el-avatar :size="30" :src="avatar" />
          <span class="ml-2 text-sm text-white">wujieli</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <a href="javascript:;">帮助文档</a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="javascript:;">个人中心</a>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <a @click="handleLogout">退出登录</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 设置 -->
      <div
        class="flex items-center h-12 p-4 cursor-pointer hover:bg-slate-700"
        @click="openSettingDrawer"
      >
        <el-icon class="text-xl text-white">
          <Setting />
        </el-icon>
      </div>
    </div>
  </div>

  <!-- 样式设计抽屉 -->
  <setting-drawer v-model:show="isSettingShow"></setting-drawer>
</template>

<script lang="ts" setup>
import { Fold, Setting } from "@element-plus/icons-vue";
import { ref } from "vue";
import SettingDrawer from "../setting/index.vue";
import Bradcrumb from "./components/Bradcrumb.vue";
// TODO 头像链接暂时写死
import avatar from "/@/assets/image/avatar.jpg";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";
import { useMessage } from "/@/hooks/web/useMessage";
import { useUserStore } from "/@/store/modules/user";

const userStore = useUserStore();

const { getCollapsed, toggleCollapsed } = useMenuSetting();
const { createConfirmMessage } = useMessage();

const isSettingShow = ref(false);

/**
 * @description 退出登录
 */
function handleLogout() {
  createConfirmMessage({ message: "确认是否要退出" }, () => {
    return userStore.logout(true);
  });
}

/**
 * @description 打开后台设置侧边栏抽屉
 */
function openSettingDrawer() {
  isSettingShow.value = true;
}
</script>
