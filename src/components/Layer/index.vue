<template>
  <div>
    <el-dialog v-model="isDialogShow" :title="title">
      <slot></slot>

      <template #footer v-if="showButton">
        <div class="flex justify-evenly">
          <el-button type="primary" @click="handleConfirm" class="w-20">确认</el-button>
          <el-button type="primary" @click="handleCancel" class="w-20">取消</el-button>
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
