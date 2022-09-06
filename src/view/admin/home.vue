<template>
  <div class="home-content">
    <div class="left-submenu">
      <el-menu
        :collapse="data.isCollapse"
        default-active="1-1"
        class="el-menu-demo"
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
            <el-icon><SetUp /></el-icon>
            <span>水电管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="gotoElectricEvent" index="1-1"
              >电费管理</el-menu-item
            >
            <el-menu-item @click="gotoWaterEvent" index="1-2"
              >水费管理</el-menu-item
            >
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item @click="gotoPersonnelEvent" index="3">
          <el-icon><List /></el-icon>
          <span>人员信息管理</span>
        </el-menu-item>
        <el-menu-item index="4" @click="gotoSecurityEvent">
          <el-icon><WarnTriangleFilled /></el-icon>
          <span>安全设施管理</span>
        </el-menu-item>
        <el-menu-item index="5" @click="gotoCheckinEvent">
          <el-icon><Avatar /></el-icon>
          <span>学生访客登记</span>
        </el-menu-item>
        <el-menu-item index="6" @click="gotoRepairEvent">
          <el-icon><Tickets /></el-icon>
          <span>报修管理</span>
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
import { reactive, ref } from "vue";
import router from "../../router";
let data = reactive({
  isCollapse: true,
});
const gotoElectricEvent = () => {
  router.push("/admin/home/electric");
};
const gotoWaterEvent = () => {
  router.push("/admin/home/water");
};
const gotoPersonnelEvent = () => {
  router.push("/admin/home/personnel");
};
const gotoSecurityEvent = () => {
  router.push("/admin/home/security");
};
const gotoCheckinEvent = () => {
  router.push("/admin/home/checkin");
};
const gotoRepairEvent = () => {
  router.push("/admin/home/repair");
};
</script>

<style lang="scss" scoped>
:deep(.el-menu-item-group__title) {
  display: none;
}
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
