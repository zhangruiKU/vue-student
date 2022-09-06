export default {
  namespaced: true,
  state: {
    IsAdmin: false,
  },
  mutations: {
    getLoginType(state, value) {
      this.commit('vx_power/saveLoginType', value)
      this.commit('vx_power/saveLoginState', true)
    },
    saveLoginType(state, value) {
      state.IsAdmin = state.IsAdmin === 'admin'
      const IsAdmin = value === 'student' ? '学生端' : '管理员端'
      localStorage.setItem('loginType', IsAdmin)
    },
    saveLoginState(state, value) {
      localStorage.setItem('loginState', value)
    },
  },
  actions: {},
  getters: {
    getLoginType() {
      return localStorage.getItem('loginType')
    },
    getIsAdmin(state) {},
  },
  modules: {},
}
