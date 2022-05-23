<template>
  <el-table ref="tableElRef" :data="data" v-bind="$attrs" stripe table-layout="auto">
    <el-table-column v-if="allowSelect" type="selection" width="55" />
    <template v-for="item in columns" :key="item.prop">
      <!-- 自定义插槽 -->
      <el-table-column v-if="item.slots" v-bind="item">
        <template #header>
          <slot :name="item.slots?.header">{{ item.label || "自定义 Header" }}</slot>
        </template>
        <template #default="scope">
          <slot :name="item.slots?.body" :data="scope.row">{{
            scope.row[item.prop] || "需要自定义"
          }}</slot>
        </template>
      </el-table-column>
      <!-- 默认展示数据 -->
      <el-table-column v-else v-bind="item"></el-table-column>
    </template>
  </el-table>

  <!-- 分页 -->
  <div class="float-right h-full my-4" v-if="showPaging">
    <basic-pagination :pagination="pagination" @pagingChange="handlePagingChange" />
  </div>
</template>

<script lang="ts" setup>
  import { PropType, ref } from "vue";
  import { ColumnProps } from "./types/columns";
  import { BasicPagination } from "/@/components/Pagination";
  import type { PagingChangingOption } from "/@/components/Pagination/src/types";

  const props = defineProps({
    // 数据
    data: {
      type: Array,
      default: () => [],
    },
    // 表格列
    columns: {
      type: Array as PropType<Array<ColumnProps>>,
      default: () => [],
    },
    rowKey: {
      type: String,
      default: "id",
    },
    // 是否可选
    allowSelect: {
      type: Boolean,
      default: false,
    },
    // 是否分页
    showPaging: {
      type: Boolean,
      default: true,
    },
    // 分页信息
    pagination: {
      type: Object,
      default: () => {
        return {
          page: 1,
          pageSize: 10,
          total: 100,
        };
      },
    },
  });

  const emits = defineEmits(["pagingChange"]);

  const tableElRef = ref(null);

  /**
   * @description 分页数据改变监听函数
   */
  function handlePagingChange(option: PagingChangingOption) {
    emits("pagingChange", option);
  }
</script>
