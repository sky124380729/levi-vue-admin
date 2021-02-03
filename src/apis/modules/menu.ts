import request from '../request'

// 获取全部资源树
export const getMenuTree = () => request.get('menu/tree')

// 根据module获取当前用户资源树
export const getUserMenuTree = (module: string) => request.get(`menu/userTree/${module}`)
