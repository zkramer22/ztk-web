import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home.vue'
import MeView from '../views/MeView.vue'
import ExpView from '../views/ExpView.vue'
import WorkView from '../views/WorkView.vue'
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
            name: 'me',
            component: MeView,
        },
        {
            path: '/exp',
            name: 'exp',
            component: ExpView,
        },
        {
            path: '/work',
            name: 'work',
            component: WorkView,
        },
    ],
})

export default router
