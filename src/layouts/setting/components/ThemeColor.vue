<template>
  <div class="flex flex-col items-center">
    <el-divider content-position="center">
      <div class="text-xl">系统配色</div>
    </el-divider>
    <div>
      <template v-for="item in colorList" :key="item.color">
        <el-tooltip placement="top" :content="item.tip">
          <span
            :style="{ background: item.color }"
            class="h-5 w-5 mx-2 inline-block rounded hover:cursor-pointer"
            @click="handleChangeThemeColor(item.color)"
          >
            <svg-icon v-if="item.color === def" name="successLine" class="m-auto text-white" />
          </span>
        </el-tooltip>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from "vue";
  import { AppPresentColor } from "/@/settings/designSetting";
  import { SvgIcon } from "/@/components/Icon";
  import { HandlerEnum } from "/@/enums/appEnum";
  import { baseHandler } from "../handler";

  const props = defineProps({
    colorList: {
      type: Array as PropType<AppPresentColor[]>,
      default: () => [],
    },
    def: {
      type: String,
      default: "",
    },
    event: {
      type: String as PropType<HandlerEnum>,
      default: "",
    },
  });

  function handleChangeThemeColor(color: string) {
    const body = document.getElementsByTagName("body")[0];
    // 设置全局顶部body上的class名称，即为主题名称，便于自定义配置符合当前主题的样式统一入口
    body.setAttribute("data-theme", props.def);

    // 设置主题色
    body.style.setProperty("--system-primary-color", props.def);

    console.log("color: ", color);
    // 修改已选择的系统配色
    props.event && baseHandler(props.event, color);
  }
</script>
