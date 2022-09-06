<template>
  <div class="pay-electric-content">
    <div class="content">
      <div class="pay-history">
        <div class="title">
          <p>安全设施检查表</p>
          <el-button type="primary" @click="addInspectTermEvent"
            >添加</el-button
          >
          <el-button type="primary" @click="refreshFacilitiesInspectListEvent"
            >刷新</el-button
          >
        </div>
        <div class="history-box">
          <el-table
            ref="multipleTableRef"
            :data="VuexData.allFacilitiesInepectList"
          >
            <el-table-column property="inspectType" label="设施" width="120" />
            <el-table-column
              property="inspectTime"
              label="检查时间"
              width="170"
            >
              <template #default="scope">{{ scope.row.inspectTime }}</template>
            </el-table-column>
            <el-table-column
              property="inspectPerson"
              label="检查人员"
              width="120"
            />
            <el-table-column
              property="inspectPosition"
              label="检查位置"
              width="120"
            />
            <el-table-column property="inspectProblem" label="检查问题" />
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button
                  v-if="scope.row.inspectProblem !== '无'"
                  type="primary"
                  size="small"
                  @click.prevent="lookInspectProblemEvent(scope.row.Problem)"
                  >查看问题</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="data.activeAddInspectTerm"
      title="添加检查设施"
      width="30%"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="检查设施：" prop="inspectType">
          <el-select
            v-model="ruleForm.inspectType"
            class="m-2"
            placeholder="选择你检查的设施"
            prop="inspectType"
          >
            <el-option
              v-for="(item, index) in data.selectTypeList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="检查人：" prop="inspectPerson">
          <el-input
            v-model="ruleForm.inspectPerson"
            type="text"
            placeholder="请输入检查人"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="检查位置："
          placeholder="请输入检查位置"
          prop="inspectPosition"
        >
          <el-input v-model="ruleForm.inspectPosition" />
        </el-form-item>
        <el-form-item label="检查问题：" prop="inspectProblem">
          <el-select
            v-model="ruleForm.inspectProblem"
            class="m-2"
            placeholder="检查设施有无问题"
            prop="inspectType"
          >
            <el-option
              v-for="(item, index) in ['无', '有']"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="ruleForm.inspectProblem !== '无'"
          label="问题说明"
          placeholder="请输入问题说明"
          prop="Problem.explain"
        >
          <el-input v-model="ruleForm.Problem.explain" />
        </el-form-item>
        <el-form-item
          v-if="ruleForm.inspectProblem !== '无'"
          label="处理时间"
          placeholder="请输入处理时间"
          prop="Problem.handlingTime"
        >
          <el-input type="text" v-model="ruleForm.Problem.handlingTime" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="postFacilitiesInspectData(ruleFormRef)"
            >提交</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button
            type="primary"
            @click="postFacilitiesInspectData(ruleFormRef)"
            >提交</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElTable, ElMessageBox } from "element-plus";
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
  allFacilitiesInepectList: store.state.vx_admin.allFacilitiesInepectList,
});
const data = reactive({
  activeAddInspectTerm: ref(false),
  selectTypeList: ["警报器", "灭火器"],
});
const addInspectTermEvent = () => {
  data.activeAddInspectTerm = true;
};
onMounted(async () => {
  store.dispatch("vx_admin/getAllFacilitiesInepectList").then(() => {
    VuexData.allFacilitiesInepectList =
      store.state.vx_admin.allFacilitiesInepectList;
  });
});
import type { FormInstance } from "element-plus";

const ruleFormRef = ref<FormInstance>();

const checkAddInspectData = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("该项不能为空"));
  }
  callback();
};

const ruleForm = reactive({
  inspectType: "",
  inspectPerson: "",
  inspectPosition: "",
  inspectProblem: "无",
  Problem: {
    explain: "",
    handlingTime: O.timeHandler(),
  },
});

const rules = reactive({
  inspectType: [{ validator: checkAddInspectData, trigger: "blur" }],
  inspectPerson: [{ validator: checkAddInspectData, trigger: "blur" }],
  inspectPosition: [{ validator: checkAddInspectData, trigger: "blur" }],
  inspectProblem: [{ validator: checkAddInspectData, trigger: "blur" }],
});

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const postFacilitiesInspectData = (formEl: FormInstance) => {
  formEl.validate((valid) => {
    if (valid) {
      store.dispatch("vx_admin/addInspectTerm", ruleForm).then(() => {
        ElMessage({
          message: "添加检查设施成功",
          type: "success",
        });
        data.activeAddInspectTerm = false;
        VuexData.allFacilitiesInepectList =
          store.state.vx_admin.allFacilitiesInepectList;
      });
    }
  });
};
const refreshFacilitiesInspectListEvent = () => {
  store.dispatch("vx_admin/addInspectTerm", ruleForm).then(() => {
    ElMessage({
      message: "刷新检查设施表成功",
      type: "success",
    });
    VuexData.allFacilitiesInepectList =
      store.state.vx_admin.allFacilitiesInepectList;
  });
};
interface lookData {
  explain: string;
  handlingTime: string;
}
const lookInspectProblemEvent = (lookData: lookData) => {
  ElMessageBox.alert(
    `检查问题：${lookData.explain}
          处理时间：${lookData.handlingTime}`,
    "查看问题",
    {
      confirmButtonText: "关闭",
    }
  );
};
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
:deep(.el-form-item__label) {
  justify-content: flex-start;
}
</style>
