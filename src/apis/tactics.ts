import storage from '@pinkbin/storage'
import { message } from 'ant-design-vue'
import router from '/@/router/index'

// 服务端状态码策略
export const SERVER_STRATEGY = new Map([
    [
        200,
        (res) => {
            return Promise.resolve(res)
        }
    ],
    [
        201,
        (res) => {
            message.success(res.message)
            return Promise.resolve(res)
        }
    ],
    [
        204,
        (res) => {
            return Promise.resolve(res)
        }
    ],
    [
        207,
        (res) => {
            message.error(res.message)
            return Promise.resolve(null)
        }
    ],
    [
        208,
        (res) => {
            message.success(res.message)
            return Promise.resolve(res)
        }
    ],
    [
        209,
        (res) => {
            message.error(res.message)
            return Promise.resolve(null)
        }
    ],
    [
        210,
        (res) => {
            message.success(res.message)
            return Promise.resolve(res)
        }
    ],
    [
        211,
        (res) => {
            message.error(res.message)
            return Promise.resolve(null)
        }
    ],
    [
        212,
        (res) => {
            message.error(res.message)
            return Promise.resolve(null)
        }
    ],
    [
        400,
        (res) => {
            message.error(res.message)
            return Promise.resolve(null)
        }
    ],
    [
        500,
        (res) => {
            message.error(res.message)
            return Promise.resolve(null)
        }
    ],
    [
        506,
        (res) => {
            message.error(res.message)
            return Promise.resolve(null)
        }
    ]
])

// HTTP状态码策略
export const HTTP_STRATEGY = new Map([
    [
        400,
        () => {
            message.error('400，参数错误!')
        }
    ],
    [
        401,
        () => {
            message.error('授权失败，请重新登录!')
            storage.cookie.remove('token')
            router.push('/login')
        }
    ],
    [
        403,
        () => {
            message.error('拒绝访问!')
            storage.cookie.remove('token')
            router.push('/login')
        }
    ],
    [
        404,
        (e) => {
            message.error(`接口地址错误，不存在接口：'${e.config.url}'`)
        }
    ],
    [
        500,
        () => {
            message.error('服务器发生错误，请联系管理员!')
        }
    ],
    [
        503,
        () => {
            message.error('Service Unavailable!')
        }
    ],
    [
        504,
        () => {
            message.error('接口发布中，请稍后再试...')
        }
    ]
])
