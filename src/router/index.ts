import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from './types'

// static modules
import Login from '/@/views/sys/Login.vue'
import NotFound from '/@/views/sys/NotFound.vue'
import Homepage from '/@/views/sys/Homepage.vue'
import Layout from '/@/layouts/dashboard'

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
    // to place the route who don't have children
    {
        path: '/app',
        component: Layout,
        name: 'app',
        children: [{ path: '/homepage', component: Homepage, name: 'homepage', meta: { title: '首页' } }]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        // always scroll to top
        return { top: 0 }
    }
})
export default router
