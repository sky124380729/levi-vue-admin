export type MenuType = 'MODULE' | 'MENU' | 'BUTTON'

export type { RouteRecordRaw } from 'vue-router'

// export type IRouteRecordRaw = Omit<RouteRecordRaw, 'meta'> & {
//     meta?: IRouteMeta
// }

export interface IResource {
    /** 唯一值 */
    id: string
    /** 标题 */
    title: string
    /** 唯一标识 */
    name: string
    /** 资源类型 */
    type: MenuType
    /** 资源的路径 */
    path: string
    /** 重定向 */
    redirect?: string
    /** 资源图标 */
    icon?: string
    /** 资源对应前端地址 */
    component?: string
    /** 作为菜单是否隐藏 */
    hidden?: boolean
    /** 作为菜单是否缓存 */
    noCache?: boolean
    /** 作为菜单是否全屏显示 */
    fullscreen?: boolean
    /** 子集 */
    children?: IResource[]
}
