<template>
  <Layer :is-dialog-show="isDialogShow" :title="dialogTitle" @confirm="handleSubmit">
    <el-form :model="formValue" label-position="left" label-width="auto">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="ID">
            <el-input v-model="formValue.id" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="周总结标题">
            <el-input v-model="formValue.title" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="工作日番茄钟学习数">
            <el-input v-model="formValue.workDayPomo" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="休息日番茄钟学习数">
            <el-input v-model="formValue.restDayPomo" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="本周健身次数">
            <el-input v-model="formValue.workoutTimes" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="平均睡眠时长(小时)">
            <el-input v-model="formValue.averageSleepHour" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="formValue.startDate"
              type="date"
              format="YYYY年MM月DD日"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="formValue.endDate"
              type="date"
              format="YYYY年MM月DD日"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </Layer>
</template>

<script lang="ts" setup>
import { omit } from 'lodash-es'
import { computed, PropType } from 'vue'
import Layer from '/@/components/Layer/index.vue'
import { WeekReport } from '/@/api/model/weekReportModel'
import { editWeekReportApi, createWeekReportApi } from '/@/api/weekReport'
import { EditType } from '/@/enums/appEnum'
import { useMessage } from '/@/hooks/web/useMessage'

const { createMessage } = useMessage()

const props = defineProps({
  formData: {
    type: Object as PropType<WeekReport>,
    default: () => ({}),
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
    default: '',
  },
})

const emit = defineEmits(['update:isDialogShow'])

const formValue = computed(() => props.formData)

/**
 * @description 提交保存
 */
async function handleSubmit() {
  if (props.editType === EditType.CREATE) {
    const result = await createWeekReportApi(omit(formValue.value, 'id'))

    if (result.id) {
      emit('update:isDialogShow', false)
      createMessage.success({
        message: '新增成功！',
      })
    }
  }
  if (props.editType === EditType.UPDATE) {
    const id = props.formData.id
    const result = await editWeekReportApi(id, omit(formValue.value, 'id'))

    if (id === result.id) {
      emit('update:isDialogShow', false)
      createMessage.success({
        message: '修改成功！',
      })
    }
  }
}
</script>
