import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),


    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/auth/Login.vue'),
            meta: {
                middleware: "guest"
            },
        },
        {
            path: '/blogs',
            name: 'blog',
            component: () => import('../views/blog/index.vue'),
            meta: {
                middleware: "auth"
            },
        },
        {
            path: '/blogs/create/',
            name: 'create',
            component: () => import('../views/blog/form.vue'),
            meta: {
                middleware: "auth"
            },
        },
        {
            path: '/blogs/:id/',
            name: 'blog-edit',
            component: () => import('../views/blog/form.vue'),
            meta: {
                middleware: "auth"
            },
        },
    ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.middleware == "guest") {
        if (localStorage.getItem('access_token')) {
            next({ name: "home" })
        }
        next()
    } else {
        if (localStorage.getItem('access_token')) {
            next()
        } else {
            next({ name: "login" })
        }
    }
})
export default router

