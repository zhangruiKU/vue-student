<template>
  <div class="pay-electric-content">
    <div class="content">
      <div class="pay-history">
        <div class="title">
          <p>公寓住户登记表</p>
          <el-button type="primary" @click="activeAddUserCheckBoxEvent"
            >添加</el-button
          >
          <el-button type="primary" @click="refreshCheckUserInfoListEvent"
            >刷新</el-button
          >
        </div>
        <div class="history-box">
          <el-table
            height="400"
            ref="multipleTableRef"
            :data="VuexData.allcheckInUserList"
          >
            <el-table-column
              property="checkUser"
              label="登记人员"
              width="130"
            />
            <el-table-column property="checkTime" label="登记时间" width="160">
              <template #default="scope">{{ scope.row.checkTime }}</template>
            </el-table-column>
            <el-table-column property="checkAdmin" label="登记管理员" />
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="data.activeAddCheckInfoBox"
      title="登记用户"
      width="30%"
    >
      <span>请输入你要登记的用户名：</span>
      <el-input
        style="margin-top: 10px"
        v-model="data.addCheckData.checkUser"
        placeholder="登记用户"
      />
      <div style="margin: 20px 0"></div>
      <span>请输入你登记的时间：</span>
      <el-input
        style="margin-top: 10px"
        v-model="data.addCheckData.checkTime"
        placeholder="登记时间"
      />
      <div style="margin: 20px 0"></div>
      <span>请输入登记的管理员：</span>
      <el-input
        style="margin-top: 10px"
        v-model="data.addCheckData.checkAdmin"
        placeholder="登记管理员"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.activeAddUserBox = false">关闭</el-button>
          <el-button type="primary" @click="addCheckInUserInfoEvent"
            >确认登记</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElTable } from "element-plus";
import { useStore } from "vuex";
import O from "../../tools/O";
interface User {
  date: string;
  name: string;
  address: string;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const store = useStore();
const VuexData = reactive({
  allcheckInUserList: store.state.vx_admin.checkInUserList,
});
const data = reactive({
  activeAddCheckInfoBox: ref(false),
  addCheckData: {
    checkUser: "",
    checkTime: O.timeHandler(),
    checkAdmin: "",
  },
});
const addCheckInUserInfoEvent = async () => {
  await store
    .dispatch("vx_admin/addUserCheckInfo", data.addCheckData)
    .then((res) => {
      ElMessage({
        message: res.msg,
        type: res.result ? "success" : "error",
      });
      data.activeAddCheckInfoBox = false;
      VuexData.allcheckInUserList = store.state.vx_admin.checkInUserList;
      data.addCheckData = {
        checkUser: "",
        checkTime: O.timeHandler(),
        checkAdmin: "",
      };
    });
};
const activeAddUserCheckBoxEvent = () => {
  data.activeAddCheckInfoBox = true;
};
const refreshCheckUserInfoListEvent = () => {
  VuexData.allcheckInUserList = store.state.vx_admin.checkInUserList;
  ElMessage({
    message: "刷新成功",
    type: "success",
  });
};
onMounted(async () => {
  await store.dispatch("vx_admin/getCheckInUserList").then((res) => {
    VuexData.allcheckInUserList = res;
  });
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
