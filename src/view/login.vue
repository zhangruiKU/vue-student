<template>
  <div class="login-content">
    <div class="container">
      <div class="content">
        <div class="left-img">
          <el-image src="https://hooray.gitee.io/fantastic-admin-example/assets/login-banner.a565fac8.png"></el-image>
        </div>
        <div class="right-login-box">
          <div class="content">
            <div class="title">
              <p>学生公寓管理系统</p>
            </div>
            <div class="login-form">
              <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-radio-group @change="resetForm(ruleFormRef)" v-model="data.loginType" class="ml-4">
                  <el-radio label="student" size="small">学生端</el-radio>
                  <el-radio label="admin" size="small">管理员端</el-radio>
                </el-radio-group>
                <el-form-item>
                  <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                  <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { IsHaveUser } from '../api/login/index'
import { ElMessage } from 'element-plus'
const store = useStore()
const VuexData = reactive({
  adminUser: store.state.vx_user.adminUser,
  studentUser: store.state.vx_user.studentUser,
})
const data = reactive({
  loginType: ref('student'),
})

const route = useRoute(),
  router = useRouter()

const ruleFormRef = ref<FormInstance>()

const checkUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入你的用户名'))
  } else if (value.length === 0) {
    return callback(new Error('用户名不能为空'))
  } else {
    callback()
  }
}

const checkPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  username: '',
  password: '',
})

const rules = reactive({
  username: [{ validator: checkUsername, trigger: 'blur' }],
  password: [{ validator: checkPassword, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const result = await IsHaveThisUser()
      if (result.result) {
        if (data.loginType === 'student') {
          store.dispatch('vx_user/getUserInfo', { user_id: result.user_id, queryType: data.loginType }).then(() => {
            router.replace('/student/home')
          })
        } else if (data.loginType === 'admin') {
          router.replace('/admin/home')
        }
      } else {
        return ElMessage({
          message: '没有这个用户！',
          type: 'error',
        })
      }
      store.commit('vx_power/getLoginType', data.loginType)
    } else {
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const IsHaveThisUser = async () => {
  const result = await IsHaveUser({
    username: ruleForm.username,
    password: ruleForm.password,
    loginType: data.loginType,
  })
  return result
}
onMounted(() => {
  // 强行导航到登陆界面将自动删除用户信息
  localStorage.clear()
})
</script>

<style lang="scss" scoped>
.login-content {
  width: 100vw;
  height: 100vh;
  background: #f4f4f6;
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    > .content {
      display: flex;
      width: 950px;
      height: 500px;
      background: #fff;
      border-radius: 30px;
      box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
      .left-img {
        width: 450px;
        height: 100%;
        background: #f5f7fa;
        .el-image {
          transform: scale(0.8);
        }
      }
      .right-login-box {
        width: 500px;
        .content {
          padding: 30px;
          .title {
            text-align: center;
            font-size: 24px;
          }
          .login-form {
            margin-top: 50px;
            .el-radio-group {
              width: 100%;
              justify-content: flex-end;
              margin-bottom: 20px;
              padding-right: 20px;
            }
            :deep(.el-form-item) {
              .el-form-item__content {
                margin: 0 !important;
                justify-content: center;
              }
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
    }
  }
}
</style>
