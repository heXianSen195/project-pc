<template>
  <div class="appheader">
    <el-row>
      <el-col :span="14">江苏传智播客教育科技股份有限公司</el-col>
      <el-col :offset="7" :span="3">
        <div class="userinfo">
          <el-dropdown :hide-on-click="false" trigger="click">
            <span class="el-dropdown-link">
              <img class="icon" src="./avatar.jpg" alt />
              <span class="name">群姐</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>git地址</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.userinfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .icon {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    text-align: center;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
