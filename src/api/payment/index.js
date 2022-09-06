import axios from '@/axios/axios'
import qs from 'qs'

export const payment = (paymentData) => {
  return axios.post('http://localhost:7000/AlipaySandbox', qs.stringify(paymentData))
}
