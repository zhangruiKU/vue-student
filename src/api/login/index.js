import axios from '@/axios/axios'
import qs from 'qs'

export const IsHaveUser = (userData) => {
  return axios.post('/login/IsHaveUser', { userData })
}
export const getUserInfo = (queryData) => {
  return axios.post('/login/getUserInfo', { queryData })
}
