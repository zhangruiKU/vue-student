import {
  getAllUserDataList,
  addUserTipsMessageItem,
  deleteUser,
  addUser,
  getAllFacilitiesInepectData,
  addFacilitiesInspectTerm,
  updateUser,
  getCheckInUserList,
  addCheckInUserData,
  getAllUserRepairFormList
} from '@/api/admin/index'

export default {
  namespaced: true,
  state: {
    allUserElectricList: [],
    allFacilitiesInepectList: [],
    checkInUserList: [],
    allUserRepairFormList: []
  },
  mutations: {
    getAllUserDataList(state, value) {
      state.getAllUserElectricList = value
    },
    getAllFacilitiesInepectList(state, value) {
      state.allFacilitiesInepectList = value
    },
    getCheckInUserList(state, value) {
      state.checkInUserList = value
    },
    getAllUserRepairFormList(state, value) {
      state.allUserRepairFormList = value
    }
  },
  actions: {
    async getAllUserDataList({
      commit
    }) {
      const result = await getAllUserDataList()
      commit('getAllUserDataList', result.data)
      return result.data
    },
    async addUserTipsMessageItem({
      commit
    }, addData) {
      const result = await addUserTipsMessageItem(addData)
      return result
    },
    async deleteUser({
      dispatch
    }, user_id) {
      await deleteUser(user_id).then(() => {
        dispatch('getAllUserDataList')
      })
    },
    async addUser({ dispatch }, addData) {
      var result;
      await addUser(addData).then(async (res) => {
        result = res
        await dispatch('getAllUserDataList')
      })
      return result
    },
    async getAllFacilitiesInepectList({ commit }) {
      await getAllFacilitiesInepectData().then((res) => {
        commit('getAllFacilitiesInepectList', res.data)
      })
    },
    async addInspectTerm({ dispatch }, addData) {
      return await addFacilitiesInspectTerm(addData).then(() => {
        dispatch('getAllFacilitiesInepectList')
      })
    },
    async updateUser({ dispatch }, updateData) {
      return await updateUser(updateData).then(async (res) => {
        await dispatch('getAllUserDataList')
        return res
      })
    },
    async getCheckInUserList({ commit }) {
      const result = await getCheckInUserList()
      commit('getCheckInUserList', result.data)
      return result.data
    },
    async addUserCheckInfo({ dispatch }, addData) {
      return await addCheckInUserData(addData).then(async (res) => {
        await dispatch('getCheckInUserList')
        return res
      })
    },
    async getAllUserRepairFormList({ commit }) {
      return await getAllUserRepairFormList().then((res) => {
        commit('getAllUserRepairFormList', res.data)
        return res.data
      })
    },
  },
  getters: {
    getUserTipsMessageTypeByElectric: (state) => (messageList) => {
      if (messageList.allUserElectricList.length === 0) {
        return true
      }
      return messageList.allUserElectricList.every((message) => {
        return message.type !== '电费'
      })
    },
    getUserTipsMessageTypeByWater: (messageList) => {
      if (messageList.allUserElectricList.length === 0) {
        return true
      }
      return messageList.allUserElectricList.every((message) => {
        return message.type !== '水费'
      })
    }
  },
  modules: {},
}