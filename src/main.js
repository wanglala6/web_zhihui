import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入全局样式表 入口文件
import './assets/css/global.css'
import axios from 'axios'
axios.defaults.baseURL = '/'
axios.defaults.withCredentials = true// axios默认不让后端写入cookie
axios.interceptors.request.use(config => {
    return config;
})
Vue.prototype.$http = axios // 每一个this都可以访问$http发起ajax请求
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
