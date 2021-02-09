import request from '../request'

// 查询用户关联的角色
export const getUserRole = (userId: string) => request.get(`userRole/userId/${userId}`)

// 修改用户关联的角色
export const updateUserRole = (userId: string, data: string[]) => request.post(`userRole/saveOrUpdate/${userId}`, data)
