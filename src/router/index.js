import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../components/Login.vue'
const Login = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ '../components/Login.vue')
    // import Home from '../components/Home.vue'
const Home = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ '../components/Home.vue')
    // import Welcome from '../components/Welcome.vue'
const Welcome = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ '../components/Welcome.vue')


// import Users from '../components/User/Users.vue'
const Users = () =>
    import ( /* webpackChunkName: "users_rights_roles" */ '../components/User/Users.vue')
    // import Rights from '../components/power/Rights.vue'
const Rights = () =>
    import ( /* webpackChunkName: "users_rights_roles" */ '../components/power/Rights.vue')
    // import Roles from '../components/power/Roles.vue'
const Roles = () =>
    import ( /* webpackChunkName: "users_rights_roles" */ '../components/power/Roles.vue')


// import Cate from '../components/goods/Cate.vue'
const Cate = () =>
    import ( /* webpackChunkName: "cate_params" */ '../components/goods/Cate.vue')
    // import Params from '../components/goods/Params.vue' // 参数列表
const Params = () =>
    import ( /* webpackChunkName: "cate_params" */ '../components/goods/Params.vue')


// import GoodsList from '../components/goods/List.vue' // 商品列表
const GoodsList = () =>
    import ( /* webpackChunkName: "goodslist_add" */ '../components/goods/List.vue')
    // import Add from '../components/goods/Add.vue' // 商品列表
const Add = () =>
    import ( /* webpackChunkName: "goodslist_add" */ '../components/goods/Add.vue')


// import Order from '../components/order/Order.vue' // 订单管理
const Order = () =>
    import ( /* webpackChunkName: "order_report" */ '../components/order/Order.vue')
    // import Report from '../components/report/report.vue' // 数据报表
const Report = () =>
    import ( /* webpackChunkName: "order_report" */ '../components/report/report.vue')

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