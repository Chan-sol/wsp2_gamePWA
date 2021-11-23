import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/', name:'start_page',
        component: () => import('./components/start_page.vue')
    },
    // login 관련 path
    {
        path: '/loginFirst', name:'loginFirst_page',
        component: () => import('./components/login_components/first_page.vue')
    },
    {
        path: '/gameSelect', name:'gameSelect_page',
        component: () => import('./components/game_components/gameSelect_page.vue')
    },
    {
        path: '/end', name:'end_page',
        component: () => import('./components/end_page.vue')
    }
]
})

export default router
