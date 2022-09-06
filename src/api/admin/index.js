import axios from '@/axios/axios'

export const getAllUserDataList = () => {
  return axios.get('/admin/electric/getAllUserElectricData')
}
export const addUserTipsMessageItem = (addData) => {
  return axios.post('/admin/user/addUserTipsMessageItem', addData)
}
export const deleteUser = (user_id) => {
  return axios.post('/admin/user/deleteUser', { user_id })
}
export const addUser = (addData) => {
  return axios.post('/admin/user/addUser', addData)
}
export const getAllFacilitiesInepectData = () => {
  return axios.get('/admin/facilities/getFacilitiesInepectData')
}
export const addFacilitiesInspectTerm = (addData) => {
  return axios.post('/admin/facilities/addInspectTerm', addData)
}
export const updateUser = (updateData) => {
  return axios.post('/admin/user/updateUser', updateData)
}
export const getCheckInUserList = () => {
  return axios.get('/admin/checkIn/getCheckUserList')
}
export const addCheckInUserData = (addData) => {
  return axios.post('admin/checkIn/addUserCheckInfo', addData)
}
export const getAllUserRepairFormList = () => {
  return axios.get('/admin/repair/getAllRepairFormList')
}
