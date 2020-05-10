import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/User/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue' // 参数列表
import GoodsList from '../components/goods/List.vue' // 商品列表
import Add from '../components/goods/Add.vue' // 商品列表
import Order from '../components/order/Order.vue' // 订单管理
import Report from '../components/report/report.vue' // 数据报表

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: './login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        redirect: '/welcome', // 路由重定向
        children: [{
            path: '/welcome',
            name: 'welcome',
            component: Welcome
        }, {
            path: '/users',
            name: 'users',
            component: Users
        }, {
            path: '/rights',
            name: 'rights',
            component: Rights
        }, {
            path: '/roles',
            name: 'roles',
            component: Roles
        }, {
            path: '/categories', // 商品分类
            name: 'categories',
            component: Cate
        }, {
            path: '/params', // 参数列表
            component: Params
        }, {
            path: '/goods', // 商品列表
            component: GoodsList
        }, {
            path: '/goods/add', // 商品列表
            component: Add
        }, {
            path: '/orders', // 订单管理
            component: Order
        }, {
            path: '/reports', // 数据报表
            component: Report
        }]
    }
]

const router = new VueRouter({
    routes
})

//  挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from代表从哪个路径跳转而来
    // next 是一个函数,表示放行
    //      next() 放行     next('/login') 强制跳转

    if (to.path === '/login') return next()
        // 获取token
    const toKenStr = window.sessionStorage.getItem('token')
    if (!toKenStr) return next('/login')
    next()
})
export default router