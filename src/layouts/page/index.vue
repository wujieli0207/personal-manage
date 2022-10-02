<template>
  <router-view>
    <template #default="{ Component, route }">
      <!-- !TODO  transition 组件的 openCache，cacheTabs 未处理-->
      <transition
        :name="
          getTransitionName({
            route,
            openCache: false,
            enableTransition: getEnableTransition,
            cacheTabs: [],
            def: getBasicTransition,
          })
        "
        mode="out-in"
        appear
      >
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </template>
  </router-view>
</template>

<script lang="ts" setup>
import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting'
import { getTransitionName } from './transition'

const { getBasicTransition, getEnableTransition } = useTransitionSetting()
</script>
