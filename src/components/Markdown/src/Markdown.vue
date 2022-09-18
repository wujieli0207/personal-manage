<template>
  <div ref="wrapRef"></div>
</template>

<script lang="ts" setup>
  import { ref, Ref, unref, useAttrs, onDeactivated } from 'vue'
  import Vditor from 'vditor'
  import 'vditor/dist/index.css'
  import { tryOnBeforeUnmount } from '@vueuse/core'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  import { useRootSetting } from '/@/hooks/setting/useRootSetting'
  import { ThemeEnum } from '/@/enums/appEnum'

  const attrs = useAttrs

  const props = defineProps({
    height: {
      type: Number,
      default: 360,
    },
    value: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits(['update:value', 'change', 'get'])

  const { getDarkMode } = useRootSetting()

  const wrapRef = ref<ElRef>(null)
  const vditorRef: Ref<Nullable<Vditor>> = ref(null)
  const valueRef = ref(props.value || '')
  const initedRef = ref(false)

  const instance = {
    getVditor: (): Vditor => vditorRef.value!,
  }

  onMountedOrActivated(init)

  tryOnBeforeUnmount(destroy)

  onDeactivated(destroy)

  /**
   * @description 初始化编辑器
   */
  function init() {
    const wrapEl = unref(wrapRef) as HTMLElement
    if (!wrapEl) return

    const bindValue = { ...props, ...attrs }

    const instanceEditor = new Vditor(wrapEl, {
      theme: getDarkMode.value === ThemeEnum.LIGHT ? 'classic' : 'dark',
      mode: 'sv',
      fullscreen: {
        index: 520,
      },
      preview: { actions: [] },
      ...bindValue,
      cache: {
        enable: false,
      },
      input: (v) => {
        valueRef.value = v
        emit('change', v)
        emit('update:value', v)
      },
      after: () => {
        instanceEditor.setValue(valueRef.value)
        vditorRef.value = instanceEditor
        initedRef.value = true
        emit('get', instance)
      },
    })
  }

  /**
   * @description 销毁 markdown 实例
   */
  function destroy() {
    const vditorInstance = unref(vditorRef)
    if (!vditorInstance) return

    try {
      vditorInstance?.destroy?.()
    } catch (error) {
      vditorRef.value = null
    }
  }
</script>
