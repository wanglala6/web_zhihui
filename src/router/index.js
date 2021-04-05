import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import ElderMsg from "@/components/ElderMsg"
// import Map from "@/components/Map.vue";
import MapComponent from "@/components/MapComponent.vue";
import Clue from '@/components/Clue.vue'
import Post from '@/components/Post.vue'

import NewsEdit from "../components/NewsEdit"
import News from "../components/News"
import StartNewsDetail from "@/components/StartNewsDetail";
import VolunteerStatus from '@/components/VolunteerStatus'
import Inaction from '@/components/Inaction'
import Unaction from '@/components/Unaction'
import Weather from "@/components/Weather";
import ValSearch from "@/components/ValSearch";

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/map',
        component: MapComponent
    },
    {
        path: '/welcome',
        component: Welcome,
        name: 'welcome',
        redirect: '/inaction',
        children: [
            {
                path: '/inaction',
                component: Inaction,
                name: '/inaction'
            },
            {
                path: '/unaction',
                component: Unaction
            }
        ]
    },
    {
        path: '/home',
        component: Home,
        name: '/home',
        redirect: '/elderMsg',

        children: [
            {
                path: '/elderMsg',
                component: ElderMsg,
                name: '/elderMsg'
              },
              {
                  path: '/clue',
                  component: Clue
              },
              {
                  path: '/post',
                  component: Post
              },
              {
                path: '/news',
                component: News
              },
              {
                path: '/newsEdit',
                component: NewsEdit
              },
            {
              path: '/startNewsDetail',
              component: StartNewsDetail
            },
            {
                path: '/VolunteerStatus',
                component: VolunteerStatus
            },
            {
              path: '/weather',
              component: Weather
            },
            {
              path: '/valSearch',
              component: ValSearch
            }
    ]
  }
]

const router = new VueRouter({
    routes
})
// 挂载路由导航守卫
router.beforeEach((to, form, next) => {
    // to 表示将要访问的路径
 // from代表从哪个路径跳转而来
 // next 表示一个函数 表示放行 next('/login') 强制跳转
 if (to.path === '/login') return next();

 // 获取token
const tokenstr = window.sessionStorage.getItem('token')
if (!tokenstr) return next('/login')
 next()
});

export default router
