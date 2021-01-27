import request from '../request'
// 新增
export const createSysDict = (data: any) => request.post('sysDict/save/', data)
// 删除
export const removeSysDict = (id: string) => request.delete(`sysDict/${id}`)
// 更新
export const updateSysDict = (data: any) => request.put('sysDict/update', data)
// 查询
export const getSysDict = (id: string) => request.get(`sysDict/${id}`)
// 列表查询
export const fetchSysDictList = (data: any) => request.post('sysDict/list', data)
// 分页查询
export const fetchSysDictPage = (data?: any) => request.post('sysDict/page', data)
// 获取所有字典Map格式
export const getAllDictMap = () => request.get('sysDict/map')
