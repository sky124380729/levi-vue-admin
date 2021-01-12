// this ts for auth

import router from './router/index'
import store from './store/index'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import Cookies from 'js-cookie'
router.beforeEach(async (to, from, next) => {
    const token = Cookies.get('token')
    NProgress.start()
    if (token) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            if (!store.state.authorized) {
                // set authority
                await store.dispatch('setAuthority')
                // it's a hack func,avoid bug
                next({ ...to, replace: true })
            } else {
                next()
            }
        }
    } else {
        if (to.path !== '/login') {
            next({ path: '/login' })
        } else {
            next(true)
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
