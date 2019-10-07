import Vue from 'vue'
import Router from 'vue-router'
import UseElement from './views/useElement/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'useElement',
      component: UseElement
    },
    {
      path: '/useElement',
      name: 'useElement',
      component: UseElement
    }
  ]
})
