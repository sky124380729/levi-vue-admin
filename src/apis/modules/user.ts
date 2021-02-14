import request from '../request'

// interface User {
//     name: string
//     code: string
// }

// 新增
export const createUser = (data: any) => request.post('user/save', data)
// 删除
export const removeUser = (id: string) => request.delete(`user/${id}`)
// 更新
export const updateUser = (data: any) => request.put('user/update', data)
// 查询
export const getUser = (id: string) => request.get(`user/${id}`)
// 列表查询
export const fetchUserList = (data: any) => request.post('user/list', data)
// 分页查询
export const fetchUserPage = (data?: any) => request.post('user/page', data)
// 唯一性校验
export const checkUser = (data: any) => request.post('user/unique', data)
// 修改密码
export const changePwd = (id: string, password: string) => request.put('user/updatePassWord', { id, password })
