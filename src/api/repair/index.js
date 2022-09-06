import axios from '@/axios/axios'

export const addRepairForm = (addData) => {
  return axios.post('/repair/addRepairForm', addData)
}
