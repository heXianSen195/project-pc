<template>
  <div>
    <!-- 分页 -->
    <el-card class="box-card">
      <!-- 分页卡片头部 -->
      <div slot="header" class="clearfix">
        <span>全部图片</span>
      </div>
      <!-- from表单区域 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="开发者资讯" value="shanghai"></el-option>
            <el-option label="ios" value="beijing"></el-option>
            <el-option label="c++" value="beijing"></el-option>
            <el-option label="android" value="beijing"></el-option>
            <el-option label="css" value="beijing"></el-option>
            <el-option label="数据库" value="beijing"></el-option>
            <el-option label="区块链" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker v-model="value1" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <!-- 分页卡片头部 -->
      <div slot="header" class="clearfix myTop">
        <span>共找到56952条符合条件的内容</span>
      </div>
      <!-- 表格区域 -->
      <el-table :data="dataList" :stripe="true" :border="true" style="width: 100%">
        <el-table-column align="center" label="图片" width="180">
          <template align="center" slot-scope="scope">
            <img class="scopeImg" :src="scope.row.cover.images[0]" />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column align="center" label="状态" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.status===0">草稿</span>
            <span v-if="scope.row.status===1">待审核</span>
            <span v-if="scope.row.status===2">审核通过</span>
            <span v-if="scope.row.status===3">审核失败</span>
            <span v-if="scope.row.status===4">已删除</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="pubdate" label="当前时间" width="180">
        </el-table-column>
        <el-table-column align="center" prop="date" label="操作" width="180">
          <template>
            <el-button size="mini" round><i class="el-icon-edit"></i>修改</el-button>
            <el-button size="mini" round><i class="el-icon-delete"></i>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 获取axios数据信息
// let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
export default {
  data () {
    return {
      form: {
        region: '',
        resource: ''
      },
      // 当前时间定义
      value1: '',
      // 保存文章列表数据
      dataList: [],
      // 文章的总条数默认为0
      total_count: 0
    }
  },
  methods: {
    getList () {
      // 异步请求获取数据
      this.$http({
        url: '/articles',
        method: 'GET'
        // headers: {
        //   Authorization: `Bearer ${userInfo.token}`
        // }
      })
        .then(res => {
          console.log(res)
          // 获取数据对象
          this.dataList = res.results
          // 获取总页数
          this.total_count = res.total_count
        })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.myTop {
  margin-top: 20px;
}
.scopeImg {
  width: 150px;
  height: 100px;
}
</style>
