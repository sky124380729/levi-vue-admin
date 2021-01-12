import { createStore } from 'vuex'
import router, { asyncRoutes } from '../router/index'

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
        setAuthority: ({ commit }) => {
            return new Promise<void>((resolve) => {
                // add async routes,now is mocking
                setTimeout(() => {
                    asyncRoutes.forEach((route) => {
                        const { parentName } = route.meta!
                        if (parentName) {
                            router.addRoute(parentName, route)
                        } else {
                            router.addRoute(route)
                        }
                    })
                    commit('setAuthority')
                    resolve()
                }, 10)
            })
        }
    },
    modules: {}
})

export default store
