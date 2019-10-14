<template>
  <div>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 抬头 -->
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <!-- 表单区域 -->
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题">
          <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <label>封面暂无</label>
        </el-form-item>
        <el-form-item label="频道">
          <channleList v-model="ruleForm.channel_id" />
          <!-- <el-select v-model="ruleForm.channel_id">
            <el-option v-for="(item, index) in channleList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入下拉框 频道信息 组件
import channleList from '@/components/channles'
export default {
  data () {
    return {
      ruleForm: {
        title: '',
        content: '',
        channel_id: 2
      }
    }
  },
  components: {
    channleList
  }
}
</script>

<style>
</style>
