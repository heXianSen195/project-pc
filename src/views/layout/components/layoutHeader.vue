<template>
  <div class="appheader">
    <el-row>
      <el-col :span="14">江苏传智播客教育科技股份有限公司</el-col>
      <el-col :offset="7" :span="3">
        <div class="userinfo">
          <el-dropdown :hide-on-click="false" trigger="click">
            <span class="el-dropdown-link">
              <img class="icon" :src="userInfo.photo" alt />
              <span class="name">{{userInfo.name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>git地址</el-dropdown-item>
              <router-link to="/login">
                <el-dropdown-item>退出</el-dropdown-item>
              </router-link>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // 通过JSON.parse把window.localStorage.getItem('userInfo')转换为对象
    // this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    // 从 vuex 中取出 userInfo
    this.userInfo = this.$store.state.userString
  }
}
</script>

<style lang='less' scoped>
.appheader {
  line-height: 60px;
  .el-dropdown-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    color: #409eff;
    .icon {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      text-align: center;
    }
  }
}
</style>
