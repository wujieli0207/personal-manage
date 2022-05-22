<template>
  <el-tabs v-model="activeKeyRef">
    <template
      v-for="item in getTabsState"
      :key="item.query ? item.fullPath : item.path"
    >
      <el-tab-pane>
        {{ item.meta.title }}
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useMultipleTabStore } from "/@/store/modules/multipleTab";

const tabStore = useMultipleTabStore();

const activeKeyRef = ref("");

const getTabsState = computed(() => {
  return tabStore.getTabList.filter((item) => !item.meta.hideTab);
});
</script>
