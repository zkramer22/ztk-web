import { createRouter, createWebHistory } from 'vue-router'
import BaseView from '../views/BaseView.vue'
import MeView from '../views/MeView.vue'
import ExpView from '../views/ExpView.vue'
import WorkView from '../views/WorkView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseView,
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
    // {
    //   path: '/audio',
    //   component: BaseView,
    // },
    // {
    //   path: '/web',
    //   component: BaseView,
    // },
    // {
    //   path: '/audio/voiceover',
    //   name: 'voiceover',
    //   component: VoiceoverView,
    // },
    // {
    //   path: '/audio/music',
    //   name: 'music',
    //   component: MusicView,
    // },
    // {
    //   path: '/audio/engineering',
    //   name: 'engineering',
    //   component: EngineeringView,
    // },
    // {
    //   path: '/audio/education',
    //   name: 'education',
    //   component: EducationView,
    // },
  ]
})

export default router
