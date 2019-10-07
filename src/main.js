// 导入了Vue
import Vue from 'vue'
// 导入了组件App.vue
import App from './App.vue'
// 导入了路由
import router from './router'
// 导入了vuex
import store from './store'
// 导入Element-ui
import ElementUI from 'element-ui'
// 导入Element-ul的css文件
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
