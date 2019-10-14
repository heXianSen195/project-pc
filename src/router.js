import Vue from 'vue'
import Router from 'vue-router'
import UseElement from './views/useElement'
// 导入进度条第三包文件包
import Nprogress from 'nprogress'
// 导入login和home组件
import Login from './views/login'
import Home from './views/home'
import Layout from './views/layout'
import Publish from './views/article/publish'
import List from '@/views/article/list'
// 导入全局css
import '@/views/style/scc.less'
// 导入进度条css文件
import '../node_modules/nprogress/nprogress.css'

Vue.use(Router)

let router = new Router({
  routes: [
    // 根页面
    {
      path: '/',
      redirect: '/home'
    },
    // 登录页面
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 页面布局
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      children: [
        // 将 home 作为 layout 的子路由
        { path: '/home', component: Home },
        { path: '/article/publish', component: Publish },
        { path: '/article/list', component: List },
        { path: '/article/edit/:id', component: Publish }
      ]
    },
    // 测试页面
    {
      path: '/useElement',
      name: 'useElement',
      component: UseElement
    }
  ]
})
// 导航守卫---给路由对象添加导航守卫：全局前置导航守卫
// to: 要到达的路由
// from: 发起跳转的路由
// next: 函数, 是否后续代码
router.beforeEach((to, from, next) => {
  // 开启进度条
  Nprogress.start()
  // 判断是否在 login 页面
  if (to.path !== '/login') {
    // 得到 localStorage 中 userInfo 用户登录信息
    let userInfo = window.localStorage.getItem('userInfo')
    // 判断用户是否登录
    if (!userInfo) {
      // 如果不存在就跳转到首页
      router.push('/login')
    } else {
      // 执行后续代码
      next()
    }
  } else {
    // 执行后续代码
    next()
  }
})
// 导航守卫--后置钩子
router.afterEach((to, from) => {
  // 结束进度条
  Nprogress.done()
})

export default router
