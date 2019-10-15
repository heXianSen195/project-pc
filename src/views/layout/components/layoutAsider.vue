<template>
  <div class="appasider">
    <div class="logo">
      <img src="./logo_admin.png" alt />
    </div>
    <el-menu :router="true" :unique-opened="true" default-active="2" class="el-menu-vertical-demo" background-color="#353b4e" text-color="#ccc" active-text-color="#ffd04b">
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/article/publish">
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/article/list">
          <span slot="title">内容列表</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <span slot="title">评论列表</span>
        </el-menu-item>
        <el-menu-item index="/material">
          <span slot="title">素材管理</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">
            <span slot="title">图文数据</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <span slot="title">粉丝概况</span>
          </el-menu-item>
          <el-menu-item index="3-3">
            <span slot="title">粉丝画像</span>
          </el-menu-item>
          <el-menu-item index="3-4">
            <span slot="title">粉丝列表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-user-solid"></i>
        <span slot="title">账户管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.logo {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 120px;
  }
}
</style>
