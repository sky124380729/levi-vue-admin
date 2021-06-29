import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios'
import { HTTP_STRATEGY } from './tactics'
import storage from '@pinkbin/storage'
import { message } from 'ant-design-vue'
import { BASE_URL, API_MOCK } from '/@/config'

const service: AxiosInstance = axios.create({
    baseURL: API_MOCK ? undefined : BASE_URL
})

// request interceptors
service.interceptors.request.use(
    (request: AxiosRequestConfig) => {
        const token = storage.cookie.get('token')
        token && (request.headers.token = token)
        // 如果是post请求没有传body默认给个空的body
        const { method, data } = request
        if (method!.toLocaleUpperCase() === 'POST' && typeof data === 'undefined') {
            request.data = {}
        }
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
        const { message: msg, success } = data
        if (success) {
            return Promise.resolve(data)
        } else {
            message.error(msg)
            return Promise.resolve(null)
        }
    },
    (error: AxiosError) => {
        if (error.response) {
            const { status } = error.response
            const strategy = HTTP_STRATEGY.get(status)
            if (typeof strategy === 'function') {
                strategy(error.response)
            }
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
