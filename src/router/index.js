import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import ElderMsg from "@/components/ElderMsg"
import Map from "@/components/Map.vue";
import MapComponent from "@/components/MapComponent.vue";
import Clue from '@/components/Clue.vue'
import Post from '@/components/Post.vue'
import ActionManage from "@/components/ActionManage";
import NewsEdit from "../components/NewsEdit"
import News from "../components/News"
import StartNewsDetail from "@/components/StartNewsDetail";
import VolunteerStatus from '@/components/VolunteerStatus'
import UnAction from '@/components/Unaction'
import Weather from "@/components/Weather";
import ValSearch from "@/components/ValSearch";
import Volunteer from "@/components/Volunteer"
import Monitor from "@/components/Monitor"
import MainMonitor from "@/components/Monitor/MainMonitor";
import VolunteerTrack from "@/components/Monitor/VolunteerTrack";
import RecognizedImgs from "@/components/Monitor/RecognizedImgs";
import CountTable from "@/components/Monitor/CountTable";
import VolStatusTb from "@/components/Monitor/VolStatusTb";
import MsgBox from "@/components/Monitor/MsgBox";
import DonutChart from "@/components/Monitor/DonutChart";
import VaryMsgTabs from "@/components/Monitor/VaryMsgTabs";
import ClueNewest from "@/components/Monitor/ClueNewest";
import StatisticsCard from "@/components/Monitor/StatisticsCard";
import Action from "@/components/Action"
import InAction from "@/components/InAction"
import Statistics from "@/components/Statistics"
import Location from "@/components/Location";
import NotFound from "@/components/NotFound"
import VolManage from "@/components/VolManage";
import MapSearch from "@/components/MapSearch";
import IdentifyRecord from "@/components/IdentifyRecord";
import AchivedAction from "@/components/AchivedAction"
import FinishAction from "@/components/FinishAction"

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/notFound'
  },
  {
        path: '/',
        redirect: '/login'
    },
    {
      path: '/location',
      component: Location
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
      path: '/notFound',
      component: NotFound
    },
    {
        path: '/welcome',
        component: Welcome,
        redirect: '/inAction',
        children: [
            {
                path: '/action',
                component: Action,
                name: '/action',
                children: [
                  {
                    path: '/inAction',
                    component: InAction,
                    name: '/inAction'
                  },
                  {
                    path: '/unAction',
                    component: UnAction,
                    name: '/unAction'
                  },
                  {
                    path: '/achivedAction',
                    component: AchivedAction,
                    name: '/achivedAction'
                  },
                  {
                    path: "/finishAction",
                    component: FinishAction,
                    name: "/finishAction"
                  }
                ]
            },
            {
                path: '/volunteer',
                component: Volunteer
            },
            {
              path: '/statistics',
              component: Statistics
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
            path: '/identifyRecord',
            component: IdentifyRecord,
          },
          {
            path: '/mapSearch',
            component: MapSearch,
          },
          {
            path: '/volManage',
            component: VolManage,
          },
          {
            path: '/actionManage',
            component: ActionManage,
            name: 'actionManage'
          },
          {
            path: '/mainMonitor',
            component: MainMonitor,
            children: [
              {
                path: '/volTrack',
                component: VolunteerTrack,
              },
              {
                path: '/recognizedImgs',
                component: RecognizedImgs,
              },
              {
                path: '/countTable',
                component: CountTable,
              },
              {
                path: '/volStatusGTb',
                component: VolStatusTb,
              },
              {
                path: '/msgBox',
                component: MsgBox
              },
              {
                path: '/donutChart',
                component: DonutChart
              },
              {
                path: '/varyMsgTabs',
                component: VaryMsgTabs
              },
              {
                path: 'clueNewest',
                component: ClueNewest
              },
              {
                path: 'statisticsCard',
                component: StatisticsCard
              }
            ]
          },
          {
            path: '/monitor',
            component: Monitor
          },
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
            },
            {
              path: '/mapMsg',
              component: Map
            }
    ]
  },
    {
      path: '*',
      redirect: '/notFound',
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
