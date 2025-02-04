import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MeView from '../views/MeView.vue'
import ExpView from '../views/ExpView.vue'
import WorkView from '../views/WorkView.vue'
import WorkDetails from '../components/WorkDetails.vue'
import MsgView from '../views/MsgView.vue'

import { state } from '../store.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'home',
            path: '/',
            component: HomeView,
        },
        {
            path: '/me',
            component: MeView,
        },
        {
            path: '/exp',
            component: ExpView,
        },
        {
            path: '/msg',
            component: MsgView,
        },
        {
            path: '/work',
            component: WorkView,
            children: [
                { 
                    path: ':category', 
                    component: WorkDetails, 
                    props: true,
                }
            ],
        },
    ],
})

router.beforeEach((to, from) => {
    const basePath = to.fullPath.split('/')[1]
    state.selectorActive = basePath
    window.scrollTo({ top: 0, behavior: 'instant' })
})

export default router
