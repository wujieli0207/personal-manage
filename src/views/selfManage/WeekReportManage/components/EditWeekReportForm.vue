<template>
  <el-dialog v-model="isDialogShow" :title="dialogTitle">
    <el-form label-position="left" label-width="auto">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="ID">
            <el-input v-model="formData.id" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="周总结标题">
            <el-input v-model="formData.title" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="工作日番茄钟学习数">
            <el-input v-model="formData.workDayPomo" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="休息日番茄钟学习数">
            <el-input v-model="formData.restDayPomo" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="本周健身次数">
            <el-input v-model="formData.workoutTimes" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="平均睡眠时长(小时)">
            <el-input v-model="formData.averageSleepHour" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="formData.startDate"
              type="date"
              format="YYYY年MM月DD日"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="formData.endDate"
              type="date"
              format="YYYY年MM月DD日"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 底部按钮 -->
    <div class="flex justify-evenly">
      <el-button type="primary" @click="handleSubmit">确定</el-button>
      <el-button type="primary" @click="handleClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { omit } from "lodash-es";
import { onMounted, PropType, Ref, ref } from "vue";
import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";
import { WeekReport } from "/@/api/model/weekReportModel";
import { editWeekReportApi, createWeekReportApi } from "/@/api/weekReport";
import { EditType } from "/@/enums/appEnum";

const props = defineProps({
  formData: {
    type: Object as PropType<WeekReport>,
    default: () => {},
    required: true,
  },
  editType: {
    type: String as PropType<EditType>,
    default: EditType.CREATE,
    required: true,
  },
  isDialogShow: {
    type: Boolean,
    default: false,
    required: true,
  },
  dialogTitle: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:isDialogShow"]);

/**
 * @description 提交保存
 */
async function handleSubmit() {
  if (props.editType === EditType.CREATE) {
    console.log("formData: ", props.formData);
  }
  if (props.editType === EditType.UPDATE) {
    const id = props.formData.id;
    const result = await editWeekReportApi(id, omit(props.formData, "id"));

    if (id === result.id) {
      handleClose();
      ElMessage({
        message: "修改成功！",
        type: "success",
      });
    }
  }
}

/**
 * @description 取消
 */
function handleClose() {
  emit("update:isDialogShow", false);
}
</script>
