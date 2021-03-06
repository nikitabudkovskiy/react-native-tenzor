import axios, { AxiosResponse, AxiosError } from 'axios'
import { baseUrl } from 'app/system/helpers'

export const ApiService = axios.create({
  baseURL: baseUrl,
})

ApiService.interceptors.response.use(
  (response: AxiosResponse) => {
   // console.log(response)
    return response.data
  },
  (error: AxiosError) => {
    console.log(error)
  }
)

ApiService.interceptors.request.use(function (config) {
  console.log('conf', config)
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})