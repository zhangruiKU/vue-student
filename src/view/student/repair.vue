<template>
  <div class="repair-content">
    <div class="content">
      <div class="title">
        <p>保修申请单</p>
      </div>
      <div class="repair-form">
        <el-form ref="repairDataRef" :model="repairData" status-icon :rules="rules" label-width="120px" class="demo-repairData">
          <el-form-item label="报修位置" prop="position">
            <el-input v-model="repairData.position" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="报修物品" prop="goods_name">
            <el-input v-model="repairData.goods_name" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="报修原因" prop="reason">
            <div class="mb-2 flex items-center text-sm">
              <el-radio-group @change="changeRepairReasonEvent" v-model="repairData.reason" class="ml-4">
                <el-radio label="人为损坏" size="large">人为损坏</el-radio>
                <el-radio label="自然损坏" size="large">自然损坏</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item v-if="data.activeRepairPrice.index" label="报修费用" prop="price">
            <span class="red-text">{{ data.activeRepairPrice.value }}</span>
          </el-form-item>
          <el-form-item label="报修等级" prop="grade">
            <el-radio-group v-model="repairData.grade" size="small">
              <el-radio label="初级" border>初级</el-radio>
              <el-radio label="中级" border>中级</el-radio>
              <el-radio label="特级" border>特级</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(repairDataRef)">提交</el-button>
            <el-button @click="resetForm(repairDataRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { addRepairForm } from '../../api/repair/index'

const route = useRoute(),
  router = useRouter()
const repairDataRef = ref<FormInstance>()

let data = reactive({
  activeRepairPrice: {
    index: false,
    value: '33.00元',
  },
})

const checkPosition = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入保修位置'))
  } else if (value.trim().length === 0) {
    return callback(new Error('报修位置不能为空'))
  } else {
    callback()
  }
}

const checkGoodsName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else if (value.trim().length === 0) {
    callback(new Error('密码不能为空'))
  } else {
    callback()
  }
}

const repairData = reactive({
  position: '',
  goods_name: '',
  reason: ref('人为损坏'),
  grade: ref('初级'),
  price: '',
})
const rules = reactive({
  position: [{ validator: checkPosition, trigger: 'blur' }],
  goods_name: [{ validator: checkGoodsName, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      await addRepairForm(repairData).then((res) => {
        ElMessage({
          message: res.msg,
          type: res.result ? 'success' : 'error',
        })
      })
    } else {
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const changeRepairReasonEvent = (e: Event) => {
  if (e.toString() === '2') {
    data.activeRepairPrice.index = true
  } else {
    data.activeRepairPrice.index = false
  }
}
</script>

<style lang="scss" scoped>
.red-text {
  color: #d63031;
}

.repair-content {
  width: 70%;
  margin: 0 auto;
  margin-top: 50px;
  box-shadow: 0 0 10px 5px #e8e8e8;
  border-radius: 20px;

  .content {
    padding: 20px;

    .title {
      text-align: center;
      font-size: 18px;
    }

    .repair-form {
      width: 50%;
      margin: 0 auto;
      margin-top: 50px;

      .el-form-item {
        align-items: center;
        margin-bottom: 40px;
      }

      :deep(.el-input .el-input__inner) {
        border: none !important;
      }

      :deep(.el-input__wrapper) {
        margin-right: 20px;
      }

      :deep(.el-form-item__label) {
        width: 70px !important;
      }
    }
  }
}
</style>
