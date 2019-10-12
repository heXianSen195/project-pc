// 导入了Vue
import Vue from 'vue'
// 导入了组件App.vue
import App from './App.vue'
import Router from 'vue-router'
// 导入了路由
import router from './router'
// 导入了vuex
import store from './store'
// 导入Element-ui
import ElementUI from 'element-ui'
// 导入Element-ul的css文件
import 'element-ui/lib/theme-chalk/index.css'
// 导入 axios
import axios from 'axios'
// 设置axios基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    console.log(config)
    // 获取数据源
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    if (userInfo) {
      config.headers.Authorization = `Bearer ${userInfo.token}`
    }
    return config
  }, err => {
    // 在请求错误的时候做些什么
    return Promise.reject(err)
  })

// 响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 当服务器响应信息回来时执行
    // 响应拦截器如果要返回信息，必须 return response
    return response.data.data
  },
  function (error) {
    // 当响应的状态码 >= 400 时执行   4~~ 客户端错误 5~~ 服务器错误
    return Promise.reject(error)
  }
)
// 将axios挂载到Vue的原型上
// 可以通过 this.$http 来使用
// .vue 是vue中的组件
// 所有的组件都是Vue的实例
// 在所有的Vue的实例中都可以使用 $http
// 一般将 axios 挂载为实例属性时, 它有一个固定的名称 $http
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

// 点击 router-link 会造成报错解决版本问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
