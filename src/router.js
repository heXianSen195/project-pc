import Vue from 'vue'
import Router from 'vue-router'
import UseElement from './views/useElement'
// 导入login和home组件
import Login from './views/login'
import Home from './views/home'
// 导入全局css
import '@/views/style/scc.less'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/useElement',
      name: 'useElement',
      component: UseElement
    }
  ]
})
