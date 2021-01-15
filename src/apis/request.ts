import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios'
import { HTTP_STRATEGY } from './tactics'
import Cookies from 'js-cookie'
import { message } from 'ant-design-vue'

const BASE_URL = 'http://172.16.20.2:9090/server'

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
        const { data = {} } = response
        const { data: res, message: msg, success } = data
        if (success) {
            return Promise.resolve(res)
        } else {
            message.error(msg)
            return Promise.resolve(null)
        }
    },
    (error: AxiosError) => {
        const { status } = error.response!
        const strategy = HTTP_STRATEGY.get(status)
        if (typeof strategy === 'function') {
            strategy(error.response)
        }
        return Promise.resolve(null)
    }
)

export interface ResData<T> {
    code: number
    data: T
    success: boolean
}

export default service
