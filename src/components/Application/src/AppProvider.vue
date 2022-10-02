<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import { prefixCls as defaultPrefixCls } from '/@/settings/designSetting'
import { createAppProviderContext } from '/@/components/Application/src/useAppContext'

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  props: {
    prefixCls: {
      type: String,
      default: defaultPrefixCls,
    },
  },
  setup(props, { slots }) {
    const { prefixCls } = toRefs(props)
    const isMobile = ref(false)

    // 注入全局变量
    createAppProviderContext({ prefixCls, isMobile })

    return () => slots.default?.()
  },
})
</script>
