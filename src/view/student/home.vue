<template>
  <div class="home-content">
    <div class="left-submenu">
      <el-menu
        :collapse="data.isCollapse"
        default-active="1-1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <h5 class="mb-2" @click="data.isCollapse = !data.isCollapse">
          <el-icon><Menu /></el-icon>
          <p v-if="!data.isCollapse">功能菜单</p>
        </h5>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Refrigerator /></el-icon>
            <span>水电缴费</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="gotoPayElectricEvent" index="1-1"
              >电费缴费</el-menu-item
            >
            <el-menu-item @click="gotoPayWaterEvent" index="1-2"
              >水费缴费</el-menu-item
            >
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item @click="gotoPayRepairEvent" index="3">
          <el-icon><document /></el-icon>
          <span>申请保修</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right-content">
      <Header></Header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "../../router";
import { reactive } from "vue";
let data = reactive({
  isCollapse: true,
});
const gotoPayElectricEvent = () => {
  router.push("/student/home/pay-electric");
};
const gotoPayWaterEvent = () => {
  router.push("/student/home/pay-water");
};
const gotoPayRepairEvent = () => {
  router.push("/student/home/repair");
};
</script>

<style lang="scss" scoped>
.home-content {
  overflow: hidden;
  .left-submenu {
    float: left;
    height: 100vh;
    box-shadow: 10px 0 10px -10px #e8e8e8;
    .el-menu {
      width: 100%;
      height: 100%;
      max-width: 154px;
    }
    .mb-2 {
      padding: 20px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #fff;
      p {
        margin-left: 10px;
      }
    }
  }
  .right-content {
    float: left;
    width: 1382px;
  }
}
</style>
