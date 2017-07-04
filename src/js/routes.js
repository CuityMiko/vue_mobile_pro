/**
 * 路由配置页
 */
// 向导页
const GuidePagesContainer = r => require.ensure([], () => r(require('../containers/GuidePagesContainer.vue')), 'guide')
// 首页
const HomeContainer = r => require.ensure([], () => r(require('../containers/HomeContainer.vue')), 'home')
// 搜索页
const SearchContainer = r => require.ensure([], () => r(require('../containers/SearchContainer.vue')), 'search')
// 电影页
const MovieContainer = r => require.ensure([], () => r(require('../containers/MovieContainer.vue')), 'movie')
// 404
const NoFindContainer = r => require.ensure([], () => r(require('../containers/NoFindContainer.vue')), '404')

export default[
    {
        path:'/guide',
        component:GuidePagesContainer
    },
    {
        path:'/home',
        component:HomeContainer
    },
    {
        path:'/search',
        component:SearchContainer
    },
    {
        path:'/movie/:type',
        component:MovieContainer
    },
    // {
    //     path:'/movie',component:MovieContainer,
    //     beforeEnter: (to, from, next) => { // 单个路由的导航钩子
    //         next();
    //     },
    //     children:[
    //         {path:'',component:MovieListContainer}, // 设置默认页面
    //         {path:':type/:page/:q',component:MovieListContainer},
    //         {path:'detail/:id',component:MovieDetailContainer}
    //     ]
    // },
    // {path:'/about/:name*',component:AboutContainer},
    {path:'/',redirect:'/guide'}, // 如果路由为/的时候跳转到/home路由
    {path:'*',component:NoFindContainer} // 此配置要放在最下面，如果没有匹配到路由则404
]