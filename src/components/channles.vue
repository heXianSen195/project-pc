<template>
  <el-select v-model="ruleForm.channel_id">
    <el-option v-for="(item, index) in channleList" :key="index" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  data () {
    return {
      channleList: [],
      ruleForm: ''
    }
  },
  methods: {
    getChannlesList () {
      this.$http({
        url: '/channels',
        method: 'GET'
      }).then(res => {
        console.log(res)
      })
    }
  },
  created () {
    this.getChannlesList()
  }
}
</script>

<style>
</style>
