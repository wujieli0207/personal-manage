<template>
  <div>
    <el-result
      :title="title || getStatusInfo.title"
      :sub-title="subTitle || getStatusInfo.subTitle"
      :icon="getStatusInfo.icon || 'error'"
    >
      <template #extra>
        <el-button type="primary" @click="getStatusInfo.handler">返回</el-button>
      </template>
    </el-result>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { ExceptionMapValue } from './types'
  import { useGo } from '/@/hooks/web/usePage'
  import { ExceptionEnum } from '/@/enums/exceptionEnum'

  const props = defineProps({
    status: {
      type: Number,
      default: ExceptionEnum.PAGE_NOT_FOUND,
    },
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
  })

  const { query } = useRoute()
  const go = useGo()

  const statusMapRef = ref(new Map<string | number, ExceptionMapValue>())

  // 当前路由状态
  const getStatus = computed(() => {
    const { status: routerStatus } = query

    return Number(routerStatus) || props.status
  })

  // 根据路由状态获取错误信息
  const getStatusInfo = computed(() => {
    return unref(statusMapRef).get(unref(getStatus)) as ExceptionMapValue
  })

  initExceptionType()
  /**
   * @description 初始化错误类型
   */
  function initExceptionType() {
    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
      title: ExceptionEnum.PAGE_NOT_ACCESS.toString(),
      status: ExceptionEnum.PAGE_NOT_ACCESS.toString(),
      subTitle: '抱歉，您无权访问此页面',
      btnText: '返回首页',
      handler: () => go(),
    })

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_FOUND, {
      title: ExceptionEnum.PAGE_NOT_FOUND.toString(),
      status: ExceptionEnum.PAGE_NOT_FOUND.toString(),
      subTitle: '抱歉，您访问的页面不存在',
      btnText: '返回首页',
      handler: () => go(),
    })
  }
</script>
