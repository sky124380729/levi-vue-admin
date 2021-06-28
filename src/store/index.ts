import { createStore } from 'vuex'
import router from '/@/router'
import storage from '@pinkbin/storage'
import type { IResource } from '/@/router/types'
import { generateRoutes, generateBtns } from '/@/router/helpers/generateAsyncRoutes'
import resource from '/@/router/menu.json'
import { getUserMenuTree } from '/@/apis/modules/menu'
import { getAllDictMap } from '/@/apis/modules/sysDict'
import { MENU_MOCK } from '/@/config'
import md5 from 'md5'

export interface GlobalData {
    authorized: boolean
    isCollapse: boolean
    accessBtns: string[]
    accessRoutes: any[]
    dict: Record<string, any>
    cachedViews: string[]
}

// 过滤meta为hidden的菜单
const filterResource = (routes: IResource[]) => {
    return routes.filter((route) => {
        if (route.children) {
            route.children = filterResource(route.children)
        }
        return route.type === 'MENU' && !route.hidden
    })
}

// 如果菜单没有id,为菜单根据name使用md5生成id
export const createMenuId = (routes: IResource[]) => {
    routes.forEach((route) => {
        if (route.children) {
            createMenuId(route.children)
        }
        if (!route.id) {
            route.id = md5(route.name)
        }
    })
}

const store = createStore<GlobalData>({
    state: {
        authorized: false,
        isCollapse: storage.local.get('isCollapse'),
        dict: {},
        accessBtns: [],
        accessRoutes: [],
        cachedViews: []
    },
    getters: {
        getCollapse(state) {
            return state.isCollapse
        },
        getCachedViews(state) {
            return state.cachedViews
        },
        getMenuList(state) {
            return filterResource(state.accessRoutes)
        }
    },
    mutations: {
        setAuthority(state) {
            state.authorized = true
        },
        setAccessRoutes(state, accessRoutes) {
            state.accessRoutes = accessRoutes
        },
        setAccessBtns(state, accessBtns) {
            state.accessBtns = accessBtns
        },
        setDict(state, dict) {
            state.dict = dict
        },
        setCollapse(state, flag) {
            state.isCollapse = flag
            storage.local.set('isCollapse', flag)
        },
        setCachedViews(state, cachedViews) {
            state.cachedViews = cachedViews
        }
    },
    actions: {
        setAuthority: async ({ commit }) => {
            return new Promise<void>(async (resolve) => {
                /* 注册路由 */
                let data = []
                if (MENU_MOCK) {
                    data = resource.find((v: any) => v.name === 'admin').children
                    createMenuId(data)
                } else {
                    const res = await getUserMenuTree('admin')
                    data = res && res.data ? res.data : []
                }
                const asyncRoutes = generateRoutes(data)
                asyncRoutes.forEach((route: any) => {
                    const { parentName } = route.meta!
                    if (parentName) {
                        router.addRoute(parentName, route)
                    } else {
                        router.addRoute(route)
                    }
                })
                /* 获取数据字典 */
                const dictRes = await getAllDictMap()
                commit('setDict', dictRes.data)
                /* OK */

                commit('setAuthority')
                commit('setAccessRoutes', data)
                commit('setAccessBtns', generateBtns(data))
                resolve()
            })
        }
    },
    modules: {}
})

export default store
