import request from '../request'

// 新增或者修改角色菜单
export const updateRoleMenu = (roleId: string, data: string[]) => request.post(`roleMenu/saveOrUpdate/${roleId}`, data)

// 角色菜单单个查询
export const getRoleMenu = (roleId: string) => request.get(`roleMenu/roleId/${roleId}`)
