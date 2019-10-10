import Vue from 'vue'
import Router from 'vue-router'
import UseElement from './views/useElement'
// 导入login和home组件
import Login from './views/login'
import Home from './views/home'
import Layout from './views/layout'
import Publish from './views/publish'
// 导入全局css
import '@/views/style/scc.less'

Vue.use(Router)

export default new Router({
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
        { path: '/publish', component: Publish }
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
