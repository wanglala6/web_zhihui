import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import ElderMsg from "@/components/ElderMsg"
import NewsEdit from "../components/NewsEdit"
import News from "../components/News"
import StartNewsDetail from "@/components/StartNewsDetail";
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
    path: '/welcome',
    component: Welcome
  },
  {
    path: '/home',
    component: Home,
    name: '/home',

    children: [
      {
        path: '/elderMsg',
        component: ElderMsg
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
