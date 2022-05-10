<template>
  <el-container>
    <el-aside :class="getCollapsed ? 'el-menu--collapse' : ''">
      <wujie-siderbar />
    </el-aside>
    <el-container>
      <el-header>
        <wujie-header />
      </el-header>
      <el-main>
        <wujie-page />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import WujiePage from "./page/index.vue";
import WujieHeader from "./header/index.vue";
import WujieSiderbar from "./siderbar/index.vue";

import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";

const { getCollapsed } = useMenuSetting();
</script>
