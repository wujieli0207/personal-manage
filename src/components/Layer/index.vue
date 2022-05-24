<template>
  <div>
    <el-dialog :model-value="isDialogShow" :title="title">
      <slot></slot>

      <template v-if="showButton" #footer>
        <div class="flex justify-evenly">
          <el-button type="primary" class="w-20" @click="handleConfirm">确认</el-button>
          <el-button type="primary" class="w-20" @click="handleCancel">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    isDialogShow: {
      type: Boolean,
      default: false,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    showButton: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "",
    },
  });

  const emits = defineEmits(["update:isDialogShow", "confirm"]);

  /**
   * @description 处理确认事件
   */
  function handleConfirm() {
    emits("confirm");
  }
  /**
   * @description 处理取消事件
   */
  function handleCancel() {
    emits("update:isDialogShow", false);
  }
</script>
