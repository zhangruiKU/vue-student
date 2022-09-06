import axios from '@/axios/axios'

export const rechargeElectric = (rechargeData) => {
  return axios.post('/electric/updateBalance', rechargeData)
}

export const GetUserElectricBalance = (user_id) => {
  return axios.get('/electric/getUserElectricBalance?user_id=' + user_id)
}
