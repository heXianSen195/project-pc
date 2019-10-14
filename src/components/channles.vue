<template>
  <!-- @change="optionChane" 子传父 -->
  <el-select @change="optionChane" :value="mychannel">
    <el-option v-for="(item, index) in channleList" :key="index" :label="item.name" :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  data () {
    return {
      // 数据源
      channleList: [],
      value: ''
    }
  },
  // 子接受
  props: ['mychannel'],
  methods: {
    // 异步请求频道信息
    getChannlesList () {
      this.$http({
        url: '/channels',
        method: 'GET'
      }).then(res => {
        this.channleList = res.channels
      })
    },
    // 子传父方法
    optionChane (value) {
      // 将 value 交给父组件
      this.$emit('tofather', value)
    }
  },
  // 页面更新
  created () {
    this.getChannlesList()
  }
}
</script>

<style>
</style>
