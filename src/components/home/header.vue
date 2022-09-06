<template>
  <div class="header-content">
    <div class="content">
      <div class="flex-box">
        <div class="title">
          <h1>学生公寓在线管理系统（{{ VuexData.IsAdmin }}）</h1>
        </div>
        <div class="user-center">
          <el-button @click="LogOutEvent" type="danger">退出登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
let store = useStore();
const router = useRouter();
let VuexData = reactive({
  IsAdmin: store.getters["vx_power/getLoginType"],
});
const LogOutEvent = () => {
  localStorage.clear();
  router.push("/login");
  ElMessage({
    message: "退出登陆成功",
    type: "success",
  });
};
</script>

<style lang="scss" scoped>
.header-content {
  box-shadow: 10px 0 10px 5px #e8e8e8;
  .content {
    padding: 20px 0;
    .flex-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 50px;
      .title {
        font-size: 20px;
      }
      .user-center {
        cursor: pointer;
      }
    }
  }
}
</style>
