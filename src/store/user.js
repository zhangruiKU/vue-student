import { getUserInfo } from '../api/login/index'
import { addUserPayHistory,removeUserTipsMessageItem } from '../api/user/index'
import { getUserWaterBalance } from '../api/water/index'
export default {
  namespaced: true,
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
  },
  mutations: {
    getUserInfo(state, value) {
      localStorage.setItem('userInfo', JSON.stringify(value))
      state.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    getUserElectricBalance(state, value) {
      state.userInfo.userInfo.electricsData = value
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
      this.commit('vx_user/getUserInfo', state.userInfo)
    },
    getUserWaterBalance(state, value) {
      state.userInfo.userInfo.waterData = value
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
      this.commit('vx_user/getUserInfo', state.userInfo)
    },
  },
  actions: {
    async getUserInfo(state, queryData) {
      const result = await getUserInfo(queryData)
      this.commit('vx_user/getUserInfo', result.data)
      return result
    },
    async getUserElectricBalance(state, user_id) {
      const result = await GetUserElectricBalance(user_id)
      this.commit('vx_user/getUserElectricBalance', result.data)
      return result
    },
    async getUserWaterBalance(state, user_id) {
      const result = await getUserWaterBalance(user_id)
      this.commit('vx_user/getUserWaterBalance', result.data)
      return result
    },
    async addUserPayHistory({ commit, state }, addData) {
      await addUserPayHistory(addData).then(() => {
        this.dispatch('vx_user/getUserInfo', {
          user_id: state.userInfo.userInfo.user_id,
          queryType: 'student',
        })
      })
    },
    async removeUserTipsMessageItem({dispatch,state},user_id){
      await removeUserTipsMessageItem(user_id)
      dispatch("getUserInfo",{user_id:state.userInfo.userInfo.user_id,queryType:'student'})
    }
  },
  getters: {
    getPayElectricHistory(state) {
      return state.userInfo.payElectricHistory
    },
    getPayWaterHistory(state) {
      return state.userInfo.payWaterHistory
    },
  },
  modules: {},
}
