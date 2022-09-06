import axios from '@/axios/axios'

export const rechargeWater = (rechargeData) => {
  return axios.post('/water/updateBalance', rechargeData)
}

export const getUserWaterBalance = (user_id) => {
  return axios.get('/water/getUserWaterBalance?user_id=' + user_id)
}
