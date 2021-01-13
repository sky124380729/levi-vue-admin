import request from '../request'

interface User {
    name: string
    code: string
}

interface UserRes {
    /** 测试 */
    test: string
}

export const createUser = (data: User) => request.post<UserRes>('xxx/user', data)
export const updateUser = (data: User) => request.post<UserRes>('xxx/user', data)
