import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios'
import Cookies from 'js-cookie'
import { message } from 'ant-design-vue'

const BASE_URL = '/'

const service: AxiosInstance = axios.create({
    baseURL: BASE_URL
})

// request interceptors
service.interceptors.request.use(
    (request: AxiosRequestConfig) => {
        const token = Cookies.get('token')
        token && (request.headers.token = token)
        return request
    },
    (error: AxiosError) => {
        const { response } = error
        message.error({
            content: response?.status
        })
    }
)

// response interceptors
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const { data } = response
        return Promise.resolve(data)
    },
    (error: AxiosError) => {
        const { response } = error
        message.error({
            content: response?.status
        })
    }
)

export default service
