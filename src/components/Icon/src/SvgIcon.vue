<template>
  <svg
    :style="getStyle"
    :class="[prefixCls, $attrs.class, spin && 'svg-icon-spin']"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
  import { computed, CSSProperties } from 'vue'
  import { useDesign } from '/@/hooks/web/useDesign'

  const props = defineProps({
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number || String,
      default: 16,
    },
    spin: {
      type: Boolean,
      default: false,
    },
  })

  const { prefixCls } = useDesign('svg-icon')

  const symbolId = computed(() => `#${props.prefix}-${props.name}`)

  const getStyle = computed((): CSSProperties => {
    const { size } = props
    let s = `${size}`
    s = `${s.replace('px', '')}px`
    return {
      width: s,
      height: s,
    }
  })
</script>

<style lang="less" scoped>
  // @prefix-cls: ~'@{namespace}-svg-icon'

  // .@{prefix-cls} {

  // }
  // .svg-icon-spin {
  //   animation: loadingCircle 1s infinite linear;
  // }
</style>
