import Vue from 'vue'
import VueRouter from 'vue-router'

// 파이어베이스 앱 객체 모듈 가져오기
import firebase from 'firebase/compat/app'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/', name:'start_page',
        components: {
            default: () => import('./components/start_page.vue'),
            sidebar: () => import('./components/NavigationBar_components/start_page_nav.vue'),
        },
    },
    // login 관련 path
    {
        // 구글 로그인 + 이메일 로그인 + 회원가입
        path: '/first', name:'first_page',
        components: {
            default: () => import('./components/login_components/first_page.vue'),
            sidebar: () => import('./components/NavigationBar_components/first_page_nav.vue'),
        }
    },
    {
        path: '/main', name:'main_page',
        component: () => import('./components/login_components/main_page.vue'),
        // loginMain 페이지는 인증과 연동
        meta: { bAuth: true }
    },
    {
        path: '/emailLogin', name:'email_Login_page',
        components: {
            default: () => import('./components/login_components/email_Login_page.vue'),
            sidebar: () => import('./components/NavigationBar_components/email_page_nav.vue'),
        },
    },
    {
        path: '/emailRegister', name:'email_Register_page',
        components: {
            default: () => import('./components/login_components/email_Register_page.vue'),
            sidebar: () => import('./components/NavigationBar_components/email_page_nav.vue'),
        },
    },

    // game 관련 path
    {
        path: '/gameSelect', name:'gameSelect_page',
        components: {
            default: () => import('./components/game_components/gameSelect_page.vue'),
            sidebar: () => import('./components/NavigationBar_components/gameSelect_page_nav.vue'),
        }
    },
    {
        path: '/numberBaseball', name:'numberBaseball_game',
        component: () => import('./components/game_components/numberBaseball_game.vue')
    },
    {
         path: '/Updown', name:'Updown_game',
         component: () => import('./components/game_components/Updown_game.vue')
    },
    {
         path: '/seohyeon', name:'seohyeon_game',
         component: () => import('./components/game_components/seohyeon_game.vue')
    },
    {
        path: '/end', name:'end_page',
        component: () => import('./components/end_page.vue')
    }

    // 사용자가 라우터에 등록된 것 외에 다른 주소 입력 시 에러 페이지 연결
  ]
})

// 라우터 이동에 개입하여 인증이 필요한 경우 login 페이지로 전환
router.beforeEach((to, from, next) => {
    const bNeedAuth = to.matched.some(record => record.meta.bAuth)
    const bCheckAuth = firebase.auth().currentUser
    if(bNeedAuth && !bCheckAuth) {
        next('/first')
    }  else {
        next()
    }
})

export default router
