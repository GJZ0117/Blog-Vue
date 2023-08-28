import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('@/views/blog/blog-index'),
    },
    {
        path: '/index',
        component: () => import('@/views/blog/blog-index'),
    },
    {
        path: '/type',
        component: () => import('@/views/blog/blog-type')
    },
    {
        path: '/tag',
        component: () => import('@/views/blog/blog-tag')
    },
    {
        path: '/archive',
        component: () => import('@/views/blog/blog-archive')
    },
    {
        path: '/article',
        component: () => import('@/views/blog/blog-article')
    },
    {
        path: '/search',
        component: () => import('@/views/blog/blog-search')
    },
    {
        path: '/login',
        component: () => import('@/views/admin/admin-login')
    },
    {
        path: '/admin/article',
        component: () => import('@/views/admin/admin-article')
    },
    {
        path: '/admin/type',
        component: () => import('@/views/admin/admin-type')
    },
    {
        path: '/admin/article/edit',
        component: () => import('@/views/admin/admin-edit-article')
    },
    {
        path: '/admin/tag',
        component: () => import('@/views/admin/admin-tag')
    },
    {
        path: '/404',
        component: () => import('@/views/blog/blog-404')
    },
    {
        path: '/500',
        component: () => import('@/views/blog/blog-500')
    },
    {
        path: '*',
        redirect: '/404'
    }
]

const router = new VueRouter({
    // mode: 'history', // 默认为hash,前端url是ip/#/xxx,改为history后不需要在输入#/
    routes: routes
})

export default router
