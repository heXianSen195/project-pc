import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 获取接口值
  state: {
    userString: JSON.parse(window.localStorage.getItem('userInfo')) || {}
  },
  mutations: {
    // statell 实参是state里面获取的数值
    // newUser 实参是 修改用户信息接口获取的数值
    changeUserInfo (statell, newUser) {
      statell.userString.name = newUser.name
      statell.userString.intro = newUser.intro
      statell.userString.email = newUser.email
      // 将数据同步到 localStorage 中
      // JSON.stringify(state.userString) 转换的修改用户信息数值赋值给 前面的 'userInfo'
      window.localStorage.setItem('userInfo', JSON.stringify(this.state.userString))
    },
    // 修改图片信息
    changeUserInfoImg (statell, newImg) {
      statell.userString.photo = newImg
      // JSON.stringify(state.userString) 转换的修改用户信息数值赋值给 前面的 'userInfo'
      window.localStorage.setItem('userInfo', JSON.stringify(this.state.userString))
    },
    // 登录信息
    setUserInfo (state, userInfo) {
      state.userString = userInfo
      window.localStorage.setItem('userInfo', JSON.stringify(this.state.userString))
    }
  },
  actions: {

  }
})
