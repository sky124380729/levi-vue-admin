import request from '../request'

// 新增或者修改角色菜单
export const updateRoleResource = (roleId: string, data: string[]) => request.post(`roleResource/saveOrUpdate/${roleId}`, data)

// 角色菜单单个查询
export const getRoleResource = (roleId: string) => request.get(`roleResource/roleId/${roleId}`)
