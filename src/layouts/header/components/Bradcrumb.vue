<template>
  <el-breadcrumb separator="/">
    <template v-for="item in levelList" :key="item.path">
      <el-breadcrumb-item v-if="item.redirect">
        <a @click="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-else>
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

watch(
  () => route.path,
  () => getBradcrumb()
);

/**
 * @description 获取面包屑
 */
function getBradcrumb() {
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.hideBreadCrumb !== false
  );
}

/**
 * @description 处理面包屑点击跳转至 redirect
 */
function handleLink(item: RouteLocationMatched) {
  const { redirect } = item;
  if (redirect) {
    router.push(redirect.toString());
    return;
  }
}
</script>
