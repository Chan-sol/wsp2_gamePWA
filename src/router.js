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
    {
        path: '/loginMain', name:'loginMain_page',
        component: () => import('./components/login_components/main_page.vue')
    },
    // game 과련 path
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
