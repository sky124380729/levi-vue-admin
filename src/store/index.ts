import { createStore } from 'vuex'
import router from '/@/router'
import generateRoutes from '/@/router/helpers/generateAsyncRoutes'
import resource from '/@/router/menu.json'
import { getUserResourceTree } from '/@/apis/modules/resource'
import { getAllDictMap } from '/@/apis/modules/sysDict'

export interface GlobalData {
    authorized: boolean
    isCollapse: boolean
    dict: Record<string, any>
    cachedViews: string[]
}

const store = createStore<GlobalData>({
    state: {
        authorized: false,
        isCollapse: false,
        dict: {},
        cachedViews: []
    },
    getters: {
        getCachedViews(state) {
            return state.cachedViews
        }
    },
    mutations: {
        setAuthority(state) {
            state.authorized = true
        },
        setDict(state, dict) {
            state.dict = dict
        },
        setCollapse(state, flag) {
            state.isCollapse = flag
        },
        setCachedViews(state, cachedViews) {
            state.cachedViews = cachedViews
        }
    },
    actions: {
        setAuthority: async ({ commit }) => {
            return new Promise<void>(async (resolve) => {
                const IS_MOCKING = true
                /* 注册路由 */
                const res = IS_MOCKING ? resource : (await getUserResourceTree('admin')).data
                const asyncRoutes = generateRoutes(res)
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
                resolve()
            })
        }
    },
    modules: {}
})

export default store
