<template>
  <div class="pay-electric-content">
    <div class="content">
      <div class="pay-history">
        <div class="title">
          <p>公寓保修申请表</p>
          <el-button type="primary" @click="refreshRepairFormListEvent"
            >刷新</el-button
          >
        </div>
        <div class="history-box">
          <el-table :data="VuexData.allUserRepairFormList" style="width: 100%">
            <el-table-column property="goods_name" label="报修物品" width="120">
            </el-table-column>
            <el-table-column property="position" label="报修位置" width="120" />
            <el-table-column
              property="price"
              label="报修价格"
              show-overflow-tooltip
              width="120"
            />
            <el-table-column
              property="reason"
              label="保修原因"
              show-overflow-tooltip
              width="200"
            />
            <el-table-column label="保修等级" width="120">
              <template #default="scope">
                <el-tag
                  v-if="scope.row.grade === '初级'"
                  type="info"
                  disable-transitions
                  >{{ scope.row.grade }}</el-tag
                >
                <el-tag
                  v-if="scope.row.grade === '中级'"
                  type="warning"
                  disable-transitions
                  >{{ scope.row.grade }}</el-tag
                >
                <el-tag
                  v-if="scope.row.grade === '特级'"
                  type="danger"
                  disable-transitions
                  >{{ scope.row.grade }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template #default="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click.prevent="deleteRow(scope.$index)"
                  >查看</el-button
                >
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="搜索">
              <template #header>
                <el-input
                  v-model="data.repairSearchKeyWord"
                  @input="searchRepairListEvent"
                  placeholder="请输入你要搜索的内容"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from "vue";
import { ElMessage, ElTable } from "element-plus";
import { useStore } from "vuex";
import message from "element-plus/es/components/message";
interface User {
  date: string;
  name: string;
  address: string;
}
const store = useStore();
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const VuexData = reactive({
  allUserRepairFormList: store.state.vx_admin.allUserRepairFormList,
});
const refreshRepairFormListEvent = () => {
  allUserRepairFormList: store.state.vx_admin.allUserRepairFormList;
  ElMessage({
    message: "刷新成功",
    type: "success",
  });
};
const data = reactive({
  repairSearchKeyWord: ref(""),
});
const searchRepairListEvent = () => {
  if (data.repairSearchKeyWord.trim() === "") {
    return (VuexData.allUserRepairFormList =
      store.state.vx_admin.allUserRepairFormList);
  }
  VuexData.allUserRepairFormList = VuexData.allUserRepairFormList.filter(
    (repair) => {
      return (
        repair.goods_name.includes(data.repairSearchKeyWord) ||
        repair.position.includes(data.repairSearchKeyWord) ||
        repair.grade.includes(data.repairSearchKeyWord) ||
        repair.reason.includes(data.repairSearchKeyWord)
      );
    }
  );
};

onMounted(async () => {
  await store.dispatch("vx_admin/getAllUserRepairFormList").then((res) => {
    VuexData.allUserRepairFormList = res;
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
