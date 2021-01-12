import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import dynamicImport from '../utils/helper/dynamicImport'

import Login from '/@/views/sys/Login.vue'
import NotFound from '/@/views/sys/NotFound.vue'
import Homepage from '/@/views/sys/Homepage.vue'
import Layout from '/@/layouts/dashboard'

type MenuType = 'MODULE' | 'MENU' | 'BUTTON'

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

// export type IRouteRecordRaw = Omit<RouteRecordRaw, 'meta'> & {
//     meta?: IRouteMeta
// }

export const resource: IResource[] = [
    {
        id: 'ecc34ab196cb42fe88594294b45d2dd6',
        title: '中央控制台',
        path: '/platform',
        name: 'platform',
        type: 'MENU',
        component: '/platform/index',
        icon: 'mdi:monitor-dashboard'
    },
    {
        id: 'a7d20965884d40aebd7808827741023e',
        title: '系统设置',
        name: 'system',
        type: 'MENU',
        path: '/system',
        icon: 'ri:settings-5-line',
        children: [
            {
                id: 'ae7e6a3f4ff943859eefa0977f370bcd',
                title: '用户管理',
                name: 'user',
                type: 'MENU',
                path: 'user',
                component: '/system/user',
                icon: 'ri:user-3-fill',
                noCache: true
            },
            {
                id: 'a3b182d1c12d46658eb497717764d80c',
                title: '组织管理',
                name: 'organization',
                type: 'MENU',
                path: 'organization',
                component: '/system/organization',
                icon: 'octicon:organization'
            },
            {
                id: 'cdaa427913be4206a52bf540f134517c',
                title: '角色管理',
                name: 'role',
                type: 'MENU',
                path: 'role',
                component: '/system/role',
                icon: 'carbon:user-role',
                fullscreen: true
            },
            {
                id: '27b2e6818b1e48a68fc7c59674b4954d',
                title: '资源管理',
                name: 'resource',
                type: 'MENU',
                path: 'resource',
                component: '/system/resource',
                icon: 'grommet-icons:resources'
            }
            // {
            //     id: '424bbbc89b4b4cc7bab0c2733950c550',
            //     title: '测试',
            //     name: 'test',
            //     type: 'MENU',
            //     path: 'test',
            //     component: '@Layout',
            //     children: [
            //         { id: 'ffa83aac3e124e68870d5bfb13594d0e', title: 'a', name: 'a', type: 'MENU', path: 'a', component: '/test' },
            //         { id: '27dcad7af6ae43c3a7572172a498b74f', title: 'b', name: 'b', type: 'MENU', path: 'b', component: '/test' },
            //         { id: '4cf9efbad549466ba6e38904806c2da0', title: 'c', name: 'c', type: 'MENU', path: 'c', component: '/test' },
            //         { id: '8fbdf6a50b9749f99be0089579e7e12b', title: 'd', name: 'd', type: 'MENU', path: 'd', component: '/test' }
            //     ]
            // }
        ]
    },
    {
        id: '2d252c47e52742e6a51d9d2854f31c9b',
        title: '组件Test',
        path: '/components',
        name: 'components',
        type: 'MENU',
        component: '/components/index'
    }
]

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
                    component: component ? dynamicImport(component) : Layout,
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

export const asyncRoutes = generateRoutes(resource)

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/homepage'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound
    },
    // 该路由用于存放只有一级菜单的路由
    {
        path: '/app',
        component: Layout,
        name: 'app',
        children: [
            {
                path: '/homepage',
                component: Homepage,
                name: 'homepage',
                meta: { title: '首页' }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        // always scroll to top
        return { top: 0 }
    }
})
export default router
