/**
 * 项目入口文件
 */
import Vue from 'vue'

// mint-ui
import Mint from 'mint-ui';
// mint-ui css
import 'mint-ui/lib/style.css'
Vue.use(Mint);

// Vue-Router
import VueRouter from 'vue-router'
Vue.use(VueRouter)  // 在Vue中注册VueRouter

import routes from './routes.js' // 引入路由配置文件
const router=new VueRouter({
    // mode: 'history', // 根据HTML5 History API方式将#锚点的方式变成url的方式
    scrollBehavior:()=>({ // 设置当路由切换的时候每次都是从页面开始位置开始显示
        y:0
    }),
    routes // 将路由配置文件配置在VueRouter中，相当于routes:routes的缩写
})

// vuex
import Vuex from 'vuex'
Vue.use(Vuex)
const store = require('./stores/')(Vuex)

// 全局路由的导航钩子 一般用来做用户身份验证、权限验证以及日志记录使用
router.beforeEach((to, from, next) => {
    // console.log(to); // 导航进入的路由
    // console.log(from); // 导航从哪个路由进入的
    next();
    // next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航
})

// http请求封装类
import httpHelper from './commons/httpHelper'
Vue.prototype.$httpHelper=httpHelper; // 将httpHelper作为Vue的属性挂载到Vue上

// lodash在Vue中的集成与使用
import lodash from 'lodash'

// AppContainer
import AppContainer from '../containers/AppContainer.vue'

const app =new Vue({
    router, // 将配置后的VueRouter挂载到Vue根实例上，相当于router:router的缩写
    store, // 将Vuex的Store挂载到vue的根实例上
    data:{
        lodash
    },
    render:h=>h(AppContainer)
}).$mount("#app") // $mount等同于Vue内的el属性
