import request from '../request'
// 新增
export const createRole = (data: any) => request.post('role/save', data)
// 删除
export const removeRole = (id: string) => request.delete(`role/${id}`)
// 更新
export const updateRole = (data: any) => request.put('role/update', data)
// 查询
export const getRole = (id: string) => request.get(`role/${id}`)
// 列表查询
export const fetchRoleList = (data: any) => request.post('role/list', data)
// 分页查询
export const fetchRolePage = (data?: any) => request.post('role/page', data)
// 唯一性校验
export const checkRole = (data: any) => request.post('role/unique', data)
