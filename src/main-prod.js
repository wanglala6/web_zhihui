import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// 导入全局样式表 入口文件
import './assets/css/global.css'
import axios from 'axios'
import BaiduMap from 'vue-baidu-map'
import VueIntro from 'vue-introjs'
import 'intro.js/introjs.css';
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
Vue.use(BaiduMap, {
  ak: 'pKCbOFewojmC9xuiiGwOq1MAyABiQwD8'
})
Vue.use(VueIntro);
// import dataV from '@jiaminghi/data-view'
// import echarts from 'echart'
//
// Vue.use(dataV)
// Vue.prototype.$echarts = echarts

axios.defaults.baseURL = '/'
axios.defaults.withCredentials = true// axios默认不让后端写入cookie
axios.interceptors.request.use(config => {
    return config;
})
Vue.prototype.$http = axios // 每一个this都可以访问$http发起ajax请求
Vue.config.productionTip = false
// Vue.use(ElementUI)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
