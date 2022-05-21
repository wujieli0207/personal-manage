<template>
  <el-breadcrumb separator="/">
    <template v-for="item in levelList" :key="item.path">
      <el-breadcrumb-item>
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { RouteLocationMatched, useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const levelList = ref<RouteLocationMatched[]>([]);

onMounted(() => {
  getBradcrumb();
});

/**
 * @description 获取面包屑
 */
function getBradcrumb() {
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  const first = matched[0];
  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.hideBreadCrumb !== false
  );
}

watch(
  () => route.path,
  () => getBradcrumb()
);
</script>
