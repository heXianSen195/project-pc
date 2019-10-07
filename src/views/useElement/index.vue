<template>
  <!-- 使用 ElementUI -->
  <div class="useElement">
    <el-row>
        <el-button round>圆角按钮</el-button>
        <el-button type="primary" round :plain="true" @click="open5">主要按钮</el-button>
        <el-button type="success" round :plain="true" @click="open2">成功按钮</el-button>
        <el-button type="info" round :plain="true" @click="open1">信息按钮</el-button>
        <el-button type="warning" round :plain="true" @click="open3">警告按钮</el-button>
        <el-button type="danger" round :plain="true" @click="open4">危险按钮</el-button>
    </el-row>

    <h4>使用 element-ui 中的开关</h4>
    <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949">
    </el-switch>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: true
    }
  },
  methods: {
    open1 () {
      this.$message('恭喜你中奖了')
    },
    open2 () {
      this.$message({
        message: '恭喜你，成功的当上你心仪的岗位',
        type: 'success'
      })
    },

    open3 () {
      this.$message({
        message: '警告哦，前方危险',
        type: 'warning'
      })
    },

    open5 () {
      this.$message({
        message: '现在没空, 有事请留言',
        type: 'warning'
      })
    },

    open4 () {
      this.$message.error('错了哦，这个答案是这样的...')
    }
  }
}
</script>

<style>

</style>
