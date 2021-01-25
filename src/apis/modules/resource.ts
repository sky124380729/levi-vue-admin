import request from '../request'
// 获取资源树
export const getResourceTree = () => request.get('resource/button/tree/all')
// 新增
export const createResource = (data: any) => request.post('resource/save/', data)
// 删除
export const removeResource = (id: string) => request.delete(`resource/delete/${id}`)
// 更新
export const updateResource = (data: any) => request.put('resource/update', data)
// 查询
export const getResource = (id: string) => request.get(`resource/${id}`)
// 获取当前用户资源树(含按钮)
export const getUserResourceTree = (code: string) => request.get(`/resource/button/${code}`)
