import request from '../request'

interface Role {
    name: string
    code: string
}

interface UserRole {
    /** 测试 */
    test: string
}

export const createRole = (data: Role) => request.post<UserRole>('xxx/role', data)
export const updateRole = (data: Role) => request.post<UserRole>('xxx/role', data)
