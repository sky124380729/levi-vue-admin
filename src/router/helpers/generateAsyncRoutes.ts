import type { IResource, RouteRecordRaw } from '../types'
import dynamicImport from './dynamicImport'

// 生成可访问的路由表
const generateRoutes = (routes: IResource[], cname = '', level = 1): RouteRecordRaw[] => {
    return routes.reduce((prev: RouteRecordRaw[], curr: IResource) => {
        // 如果是菜单项则注册进来
        const { id, type, path, component, name, title, icon, redirect, hidden, fullscreen, noCache, children } = curr
        if (type === 'MENU') {
            // 如果是一级菜单没有子菜单，则挂在在app路由下面
            if (level === 1 && !(children && children.length)) {
                prev.push({
                    path,
                    component: dynamicImport(component!),
                    name,
                    props: true,
                    meta: { id, title, icon, hidden, type, fullscreen, noCache, parentName: 'app' }
                })
            } else {
                prev.push({
                    path,
                    component: component ? dynamicImport(component) : () => import('/@/layouts/dashboard'),
                    name: (cname + '-' + name).slice(1),
                    props: true,
                    redirect,
                    meta: { id, title, icon, hidden, type, fullscreen, noCache },
                    children: children?.length ? generateRoutes(children, cname + '-' + name, level + 1) : []
                })
            }
        }
        return prev
    }, [])
}

export default generateRoutes
