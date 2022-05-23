<template>
  <el-dropdown class="flex items-center h-12 p-4 text-center cursor-pointer hover:bg-slate-700">
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
</template>

<script lang="ts" setup>
  // TODO 头像链接暂时写死
  import avatar from "/@/assets/image/avatar.jpg";
  import { useMessage } from "/@/hooks/web/useMessage";
  import { useUserStore } from "/@/store/modules/user";

  const userStore = useUserStore();

  const { createConfirmMessage } = useMessage();

  /**
   * @description 退出登录
   */
  function handleLogout() {
    createConfirmMessage({ message: "确认是否要退出" }, () => {
      return userStore.logout(true);
    });
  }
</script>
