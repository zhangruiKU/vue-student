<template>
  <div class="pay-electric-content">
    <div class="content">
      <div class="pay-history">
        <div class="title">
          <p>公寓人员信息表</p>
          <el-button type="primary" @click="activeAddUserBoxEvent"
            >新增</el-button
          >
          <el-button type="primary" @click="refreshPersonnelEvent"
            >刷新</el-button
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
            <el-table-column label="公寓号码" width="100">
              <template #default="scope">{{
                scope.row.apartment_code
              }}</template>
            </el-table-column>
            <el-table-column property="username" label="户主" width="110" />
            <el-table-column
              property="rent"
              label="剩余租金"
              show-overflow-tooltip
              width="120"
            />
            <el-table-column label="租金到期日" show-overflow-tooltip>
              <template #default="">2022-10-1</template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
              <template #default="scope">
                <el-button
                  style="float: left"
                  type="primary"
                  size="small"
                  @click.prevent="
                    deleteUserEvent(scope.row.user_id, scope.$index)
                  "
                  >删除</el-button
                >
                <el-button
                  style="float: left"
                  type="primary"
                  size="small"
                  @click.prevent="activeUpdateUserBoxEvent(scope.row)"
                  >修改</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog v-model="data.activeAddUserBox" title="添加用户" width="30%">
      <span>请输入你要添加的用户名：</span>
      <el-input
        style="margin-top: 10px"
        v-model="data.addData.username"
        placeholder="用户名"
      />
      <div style="margin: 20px 0"></div>
      <span>请输入你添加用户的公寓号码：</span>
      <el-input
        style="margin-top: 10px"
        v-model="data.addData.apartment_code"
        placeholder="公寓号码"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.activeAddUserBox = false">Cancel</el-button>
          <el-button type="primary" @click="addUserEvent">确认添加</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="data.activeUpdateUserBox" title="修改用户" width="30%">
      <span>请输入你要添加的用户名：</span>
      <el-input
        style="margin-top: 10px"
        v-model="data.updateUserData.username"
        placeholder="用户名"
      />
      <div style="margin: 20px 0"></div>
      <span>请输入你添加用户的公寓号码：</span>
      <el-input
        style="margin-top: 10px"
        v-model="data.updateUserData.apartment_code"
        placeholder="公寓号码"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.activeUpdateUserBox = false">关闭</el-button>
          <el-button type="primary" @click="updateUserEvent"
            >确认添加</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { ElTable, ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
interface User {
  date: string;
  name: string;
  address: string;
}
const store = useStore();
const VuexData = reactive({
  allUserDataList: store.state.vx_admin.allUserElectricList,
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
const data = reactive({
  activeAddUserBox: ref(false),
  activeUpdateUserBox: ref(false),
  addData: {},
  updateUserData: {},
});
const deleteUserEvent = (user_id: String, index: Number) => {
  store.dispatch("vx_admin/deleteUser", user_id);
  ElMessage({
    message: "删除用户成功",
    type: "success",
  });
  VuexData.allUserDataList.splice(index, 1);
};
const activeAddUserBoxEvent = () => {
  data.activeAddUserBox = true;
};
const addUserEvent = () => {
  store.dispatch("vx_admin/addUser", data.addData).then((res) => {
    if (res.result) {
      data.activeAddUserBox = false;
    }
    ElMessage({
      message: res.msg,
      type: res.result ? "success" : "error",
    });
  });
};
const activeUpdateUserBoxEvent = (userData: Object) => {
  data.updateUserData = userData;
  data.activeUpdateUserBox = true;
};
const updateUserEvent = () => {
  console.log(data.updateUserData);
  store.dispatch("vx_admin/updateUser", data.updateUserData).then((res) => {
    if (res.result) {
      ElMessage({
        message: res.msg,
        type: res.result ? "success" : "error",
      });
      data.activeUpdateUserBox = false;
    }
  });
};
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
const refreshPersonnelEvent = () => {
  store.dispatch("vx_admin/getAllUserDataList").then((res) => {
    VuexData.allUserDataList = res;
    ElMessage({
      message: "刷新成功",
      type: "success",
    });
  });
};
onMounted(async () => {
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
