<template>
  <textarea v-if="!initOptions.inline" ref="elRef" :style="{ visibility: 'hidden' }"></textarea>
</template>

<script lang="ts" setup>
  import {
    computed,
    nextTick,
    onBeforeUnmount,
    onUnmounted,
    PropType,
    ref,
    unref,
    useAttrs,
    watch,
  } from "vue";
  import type { RawEditorOptions, Editor } from "tinymce";
  import tinymce from "tinymce/tinymce";
  import { useAppStore } from "/@/store/modules/app";
  import { ThemeEnum } from "/@/enums/appEnum";
  import { bindHandlers } from "./help";
  import { onMountedOrActivated } from "/@/hooks/core/onMountedOrActivated";
  import { buildShortUUID } from "/@/utils/uuid";

  const props = defineProps({
    options: {
      type: Object as PropType<Partial<RawEditorOptions>>,
      default: () => ({}),
    },
    height: {
      type: [Number, String] as PropType<number | string>,
      required: false,
      default: 400,
    },
    width: {
      type: [Number, String] as PropType<number | string>,
      required: false,
      default: "auto",
    },
    toolbar: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    plugins: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    modelValue: {
      type: String,
      default: "",
    },
  });

  const emits = defineEmits(["inited", "initError", "update:modelValue", "change"]);

  const attrs = useAttrs();

  const appStore = useAppStore();

  const fullscreen = ref(false);
  const editorRef = ref<Nullable<Editor>>(null);
  const elRef = ref<Nullable<HTMLElement>>(null);
  const tinymceId = ref<string>(buildShortUUID("tiny-vue"));

  const skinName = computed(() => {
    return appStore.getDarkMode === ThemeEnum.LIGHT ? "oxide" : "oxide-dark";
  });

  const initOptions = computed((): RawEditorOptions => {
    const { height, options, toolbar, plugins } = props;
    const publicPath = import.meta.env.VITE_PUBLIC_PATH || "/";

    return {
      selector: `#${unref(tinymceId)}`,
      height,
      toolbar,
      plugins,
      ...options,
      skin_url: `${publicPath}resource/tinymce/skins/ui/${skinName.value}`,
      content_css: `${publicPath}resource/tinymce/skins/ui/${skinName.value}/content.min.css`,
      setup: (editor: Editor) => {
        editorRef.value = editor;
        editor.on("init", (e: any) => initSetup(e));
      },
    };
  });

  onMountedOrActivated(() => {
    if (!initOptions.value.inline) {
      tinymceId.value = buildShortUUID("tiny-vue");
    }
    nextTick(() => {
      initEditor();
    });
  });

  onBeforeUnmount(() => {
    destory();
  });

  onUnmounted(() => {
    destory();
  });

  function setValue(editor: Recordable, newVal: string, oldVal?: string) {
    if (
      editor &&
      typeof newVal === "string" &&
      newVal !== oldVal &&
      newVal !== editor.getContent({ format: attrs.outputFormat })
    ) {
      editor.setContent(newVal);
    }
  }

  function bindModelhandlers(editor: any) {
    const modelEvents = attrs.modelEvnets ? attrs.modelEvnets : null;
    const normalizedEvents = Array.isArray(modelEvents) ? modelEvents.join("") : modelEvents;

    watch(
      () => props.modelValue,
      (newVal: string, oldVal: string) => {
        setValue(editor, newVal, oldVal);
      }
    );

    editor.on(normalizedEvents ? normalizedEvents : "change keyup undo redo", () => {
      const content = editor.getContent({ format: attrs.outputFormat });
      emits("update:modelValue", content);
      emits("change", content);
    });

    editor.on("FullscreenStateChanged", (e: any) => {
      fullscreen.value = e.state;
    });
  }

  /**
   * @description 初始化 tinymce setup 配置
   */
  function initSetup(e: Event) {
    const editor = unref(editorRef);
    if (!editor) return;

    const value = props.modelValue || "";

    editor.setContent(value);
    bindModelhandlers(editor);
    bindHandlers(e, attrs, unref(editorRef));
  }

  /**
   * @description 初始化 tinymce 编辑器
   */
  function initEditor() {
    const el = unref(elRef);
    if (el) {
      el.style.visibility = "";
    }
    console.log("el: ", el);
    tinymce
      .init(unref(initOptions))
      .then((editor) => {
        emits("inited", editor);
      })
      .catch((error) => {
        emits("initError", error);
      });
  }

  /**
   * @description 销毁 tinymce 编辑器
   */
  function destory() {
    if (tinymce !== null) {
      tinymce?.remove?.(unref(initOptions).selector!);
    }
  }
</script>
