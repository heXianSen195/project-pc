<template>
  <div class="layout">
    <el-container>
        <el-aside width="200px">
            <layoutasider />
        </el-aside>
      <el-container>
        <el-header>
            <layoutheader />
        </el-header>
        <el-main>
            <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutasider from '../layout/components/layoutAsider'
import layoutheader from '../layout/components/layoutHeader'
export default {
  components: {
    layoutasider,
    layoutheader
  }
}
</script>

<style lang='less' scoped>
.layout{
    height: 100%;
    &>.el-container{
        height: 100%;
    }
}

.el-aside {
  background-color: #323745;
  color: #333;
}
.el-header {
  background-color: #fff;
  color: #333;
}

.el-main {
  background-color: #eee;
  color: #333;
}
</style>
