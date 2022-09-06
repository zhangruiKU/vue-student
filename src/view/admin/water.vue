<template>
  <div class="pay-electric-content">
    <div class="content">
      <div class="pay-history">
        <div class="title">
          <p>公寓水费信息表</p>
          <el-button @click="toggleSelection('all-selected')">全选</el-button>
          <el-button @click="toggleSelection('all-not-select')"
            >全不选</el-button
          >
        </div>
        <div class="history-box">
          <el-table
            ref="multipleTableRef"
            :data="VuexData.allUserDataList"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column label="公寓号码" width="120">
              <template #default="scope">{{
                scope.row.apartment_code
              }}</template>
            </el-table-column>
            <el-table-column property="username" label="用户名" width="120" />
            <el-table-column
              property="waterData.surplus"
              label="剩余水费"
              width="120"
            />
            <el-table-column
              property="waterData.Used"
              label="已使用水费"
              show-overflow-tooltip
            />
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button
                  v-if="getRemindPaymentButtonType(scope.row.tipsMessageList)"
                  @click="remindPaymentEvent(scope.row.user_id)"
                  type="primary"
                  size="small"
                  :icon="Bell"
                  >提醒缴费</el-button
                >
                <el-button
                  v-else
                  disabled
                  type="primary"
                  size="small"
                  :icon="Bell"
                  >已提醒</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElTable } from "element-plus";
import { useStore } from "vuex";
import { Bell } from "@element-plus/icons-vue";
import message from "element-plus/es/components/message";
interface User {
  date: string;
  name: string;
  address: string;
}
const store = useStore();
const VuexData = reactive({
  allUserDataList: store.state.vx_admin.allUserDataList,
});
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const toggleSelection = (type) => {
  if (type === "all-selected") {
    VuexData.allUserDataList.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(row, true);
    });
  } else {
    multipleTableRef.value!.clearSelection();
  }
};
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
const remindPaymentEvent = (user_id: String) => {
  store
    .dispatch("vx_admin/addUserTipsMessageItem", {
      user_id,
      data: {
        type: "水费",
        message: "您的水费余额即将用尽，请尽快充值",
      },
    })
    .then(async () => {
      VuexData.allUserDataList = store.state.vx_admin.allUserElectricList =
        await store.dispatch("vx_admin/getAllUserDataList");
      ElMessage({
        message: "提醒用户缴费成功",
        type: "success",
      });
    });
};
const getRemindPaymentButtonType = (messageList: Object[]) => {
  if (!messageList) {
    return false;
  }
  return messageList.every((message) => {
    return message.type !== "水费";
  });
};
onMounted(async () => {
  // 强行导航到登陆界面将自动删除用户信息
  VuexData.allUserDataList = store.state.vx_admin.allUserElectricList =
    await store.dispatch("vx_admin/getAllUserDataList");
});
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
        color: #b2bec3;
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
