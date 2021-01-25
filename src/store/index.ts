import { createStore } from 'vuex'
import router from '/@/router'
import generateRoutes from '/@/router/helpers/generateAsyncRoutes'
import resource from '/@/router/menu.json'
import { getUserResourceTree } from '/@/apis/modules/resource'

export interface GlobalData {
    authorized: boolean
    isCollapse: boolean
    cachedViews: string[]
}

const store = createStore<GlobalData>({
    state: {
        authorized: false,
        isCollapse: false,
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
                commit('setAuthority')
                resolve()
            })
        }
    },
    modules: {}
})

export default store
