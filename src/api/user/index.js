import axios from '@/axios/axios'

export const getUserPayHistory = (queryData) => {
  return axios.get('user/getUserPayHistory', {
    params: queryData,
  })
}
export const addUserPayHistory = (addData) => {
  return axios.post('user/addUserPayHistory', addData)
}
export const removeUserTipsMessageItem = (user_id) => {
  return axios.post('user/removeTipsMessageItem',{user_id})
}
