import { createRouter, createWebHistory } from 'vue-router'
import MeView from '../views/MeView.vue'
import ExpView from '../views/ExpView.vue'
import WorkView from '../views/WorkView.vue'
import WorkDetails from '../components/WorkDetails.vue'
import MsgView from '../views/MsgView.vue'

import { state } from '../store.js'
import { render } from 'vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'home',
            path: '/',
        },
        {
            name: 'me',
            path: '/me',
            component: MeView,
        },
        {
            name: 'exp',
            path: '/exp',
            component: ExpView,
        },
        {
            name: 'work',
            path: '/work',
            component: WorkView,
            children: [
                { 
                    path: ':project', 
                    component: WorkDetails, 
                    props: true,
                }
            ],
        },
        {
            name: 'msg',
            path: '/msg',
            component: MsgView,
        },
    ],
})

router.beforeEach((to, from) => {
    const basePath = to.fullPath.split('/')[1]
    state.selectorActive = basePath
    window.scrollTo({ top: 0, behavior: 'instant' })
})

export default router
