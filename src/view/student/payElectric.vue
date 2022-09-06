<template>
  <div class="pay-electric-content">
    <div class="content">
      <div class="pay-electric-box">
        <div class="title">电费缴费</div>
        <div class="floor">
          <span>A栋304</span>
        </div>
        <div class="electric-surplus">
          <p>本月剩余电费：{{ VuexData.electricsData.surplus }}元</p>
        </div>
        <div class="used-electric">
          <p>已使用电费：{{ VuexData.electricsData.Used }}元</p>
        </div>
        <div class="recharge-bth">
          <el-button @click="payElectricEvent" type="success">充值</el-button>
        </div>
      </div>
      <div class="pay-history">
        <div class="title">
          <p>缴费历史</p>
          <el-button @click="refreshPayHistoryEvent" type="primary">刷新</el-button>
        </div>
        <div class="history-box">
          <el-table empty-text="没有查询到您的缴费历史" :data="VuexData.userPayElectricHistory" style="width: 100%">
            <el-table-column prop="pay_time" label="时间" width="180" />
            <el-table-column prop="pay_price" label="金额" width="180" />
            <el-table-column prop="username" label="用户名" />
          </el-table>
        </div>
      </div>
      <el-dialog :modal="false" v-model="data.activePaymentBox" title="Tips" width="30%">
        <span>支付金额</span>
        <el-input style="margin-top: 20px" v-model.number="data.payPrice" class="w-50 m-2" placeholder="请输入充值金额" />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="data.activePaymentBox = false">取消</el-button>
            <el-button type="primary" @click="gotoPay">去支付</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { payment } from '../../api/payment/index'
import { rechargeElectric } from '../../api/electric/index'
import { ElMessage,ElMessageBox  } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const store = useStore()
const VuexData = reactive({
  electricsData: store.state.vx_user.userInfo.userInfo.electricsData,
  userInfo: store.state.vx_user.userInfo.userInfo,
  userPayElectricHistory: store.getters['vx_user/getPayElectricHistory'],
})
const data = reactive({
  activePaymentBox: false,
  payPrice: '',
})
const payElectricEvent = () => {
  data.activePaymentBox = true
}
const refreshPayHistoryEvent = () => {
  VuexData.userPayElectricHistory = store.getters['vx_user/getPayWaterHistory']
  ElMessage({
    message: '刷新成功',
    type: 'success',
  })
}
const gotoPay = async () => {
  if (data.payPrice === 0) {
    ElMessage({
      message: '充值金额不能为0',
      type: 'error',
    })
  } else {
    const result = await payment({
      GoodsPrice: parseInt(data.payPrice),
      GoodName: '充值电费余额',
      resultURL: route.path,
    })
    window.open(result.resultURL)
  }
}
const getPayResult = async () => {
  if (router.currentRoute.value.query.total_amount) {
    const result = await rechargeElectric({
      user_id: VuexData.userInfo.user_id,
      price: router.currentRoute.value.query.total_amount,
    })
    if (result.result) {
      ElMessage({
        message: result.msg,
        type: 'success',
      })
      store.dispatch('vx_user/getUserElectricBalance', VuexData.userInfo.user_id).then((res) => {
        const path = route.path
        router.push(path)
        VuexData.electricsData = res.data
      })
      store.dispatch('vx_user/addUserPayHistory', {
        user_id: VuexData.userInfo.user_id,
        pay_type: '电费',
        pay_price: router.currentRoute.value.query.total_amount,
        username: VuexData.userInfo.username,
      })
    } else {
      ElMessage({
        message: result.msg,
        type: 'error',
      })
    }
  }
}
getPayResult()
onMounted(()=>{
  if(VuexData.userInfo.tipsMessageList.length !== 0){
    VuexData.userInfo.tipsMessageList.forEach((data,index,array)=>{
      ElMessageBox.alert(data.message,data.type,{
        confirmButtonText:'确认',
        callback:async ()=>{
          store.dispatch('vx_user/removeUserTipsMessageItem', VuexData.userInfo.user_id)
        }
      })
    })
  }
})
</script>

<style lang="scss" scoped>
.pay-electric-content {
  width: 90%;
  margin: 0 auto;
  margin-top: 50px;
  box-shadow: 0 0 10px 5px #e8e8e8;
  border-radius: 20px;
  .content {
    padding: 20px;
    > div:not(:first-child) {
      margin-top: 40px;
    }
    .title {
      font-size: 18px;
    }
    .pay-electric-box {
      margin-top: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      > div:not(:first-child) {
        margin-left: 20px;
      }
      .floor {
        color: #000;
        font-size: 16px;
      }
      .electric-surplus {
        color: #d63031;
      }
      .used-electric {
        color: #636e72;
      }
    }
    .pay-history {
      .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        button {
          margin-left: 20px;
        }
      }
      .history-box {
        margin-top: 20px;
      }
    }
  }
}
</style>
