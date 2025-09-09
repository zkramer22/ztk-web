import { createRouter, createWebHistory } from 'vue-router'

import { selector } from '../store.js'
import { scrollTop } from '@/utils/scroll.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'home',
            meta: {
                nav: null,
            },
            path: '/',
            component: () => import('../views/Blank.vue'),
        },
        {
            name: 'me',
            meta: {
                nav: '[about me]',
            },
            path: '/me',
            component: () => import('../views/MeView.vue'),
        },
        {
            name: 'exp',
            meta: {
                nav: '[experience]',
            },
            path: '/exp',
            component: () => import('../views/ExpView.vue'),
        },
        {
            name: 'work',
            meta: {
                nav: '[work]',
            },
            path: '/work',
            component: () => import('../views/WorkView.vue'),
            children: [
                {
                    name: 'workDetails',
                    meta: {
                        nav: '[work]',
                    },
                    path: ':slug',
                    component: () => import('../views/WorkDetails.vue'),
                    props: true,
                },
            ],
        },
        {
            name: 'info',
            meta: {
                nav: '[info]',
            },
            path: '/info',
            component: () => import('../views/InfoView.vue'),
        },
        // {
        //     path: '/404',
        //     name: 'notFound',
        //     component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFoundView.vue'),
        //     meta: { title: '404 Not Found' },
        // },
        // {
        //     path: '/:pathMatch(.*)*',
        //     redirect: '/404',
        // },
    ],
})

router.beforeEach((to, from, next) => {
    if (router.currentRoute.value.path === to.path) return
    
    if (to.path === '/') selector.activeRoute = null
    else selector.activeRoute = to.path

    return next()
})

router.afterEach((to, from) => {
    if (to.path === from.path) {
        // console.log('repeat, after');
    }

    scrollTop({ 
        behavior: 'instant', 
        to: to.path, 
        path: from.path 
    })
})

export default router
