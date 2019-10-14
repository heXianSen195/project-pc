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
          <el-radio v-model="status" label="">全部</el-radio>
          <el-radio v-model="status" label="0">草稿</el-radio>
          <el-radio v-model="status" label="1">待审核</el-radio>
          <el-radio v-model="status" label="2">审核通过</el-radio>
          <el-radio v-model="status" label="3">审核失败</el-radio>
        </el-form-item>
        <el-form-item label="频道列表">
          <!-- clearable -->
          <el-select clearable v-model="form.channelid" placeholder="请选择活动区域">
            <!-- getChannelsList 遍历文章频道 -->
            <el-option v-for="(item,index) in channelsList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker value-format="yyyy-MM-dd" v-model="dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchList">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <!-- 分页卡片头部 -->
      <div slot="header" class="clearfix myTop">
        <span>共找到{{total_count}}条符合条件的内容</span>
      </div>
      <!-- 表格区域 -->
      <el-table v-loading="disabloca" :data="dataList" :stripe="true" :border="true" style="width: 100%">
        <el-table-column align="center" label="图片" width="180">
          <template align="center" slot-scope="scope">
            <img class="scopeImg" :src="scope.row.cover.images[0]" />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column align="center" prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.status===0">草稿</span>
            <span v-if="scope.row.status===1">待审核</span>
            <span v-if="scope.row.status===2">审核通过</span>
            <span v-if="scope.row.status===3">审核失败</span>
            <span v-if="scope.row.status===4">已删除</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="pubdate" label="发布日期" width="180">
        </el-table-column>
        <el-table-column align="center" prop="date" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" round>
              <i class="el-icon-edit"></i>修改</el-button>
            <!-- scope.row 获取数据源 -->
            <el-button size="mini" round @click="delArticle(scope.row)">
              <i class="el-icon-delete"></i>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- :disabled="disabloca" 选中时禁用 -->
      <!-- @current-change="pageChange" element-ui 自带触发点击事件 -->
      <!-- @next-click="nextClick" 下一页触发事件 @prev-click="perClick" 下一页触发事件  -->
      <el-pagination :disabled="disabloca" @current-change="pageChange" @next-click="nextClick" @prev-click="perClick" background layout="prev, pager, next" :total="total_count">
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
        channelid: '',
        resource: ''
      },
      // 当前时间定义
      dateTime: '',
      // 保存文章列表数据
      dataList: [],
      // 文章的总条数默认为0
      total_count: 0,
      // 默认第一页
      page: 1,
      // 默认每页的条数
      per_page: 10,
      // 加载动画
      disabloca: false,
      // 文章频道
      channelsList: [],
      // 筛选的状态属性： 0 , 1, 2, 3 没有内容
      status: ''
    }
  },
  methods: {
    getList () {
      // 请求数据加载动画
      this.disabloca = true
      setTimeout(() => {
        // 异步请求获取数据
        this.$http({
          url: '/articles',
          method: 'GET',
          params: {
            page: this.page,
            per_page: this.per_page
          }
        }).then(res => {
          // 获取数据对象
          this.dataList = res.results
          // 获取总页数
          this.total_count = res.total_count
          // 请求数据成功 取消加载动画
          this.disabloca = false
        })
      }, 1000)
    },
    // 异步请求删除文章
    delArticle (row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 将数据进行删除
        this.$http({
          url: `/articles/${row.id}`,
          method: 'DELETE'
        }).then(res => {
          console.log(res) // undefined:说明删除成功了
          // 需要重新请求数据
          this.searchList()
          // 提示删除成功
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      })
    },
    // 上一页
    perClick () {
      this.page = this.page--
      this.getList()
    },
    // 下一页
    nextClick () {
      this.page = this.page++
      this.getList()
    },
    // 触发当前点击的页码
    pageChange (page) {
      this.page = page
      this.getList()
    },
    // 获取文章频道
    getChannels () {
      this.$http({
        url: '/channels',
        method: 'GET'
      }).then(res => {
        this.channelsList = res.channels
      })
    },
    // 筛选数据
    searchList () {
      this.tableLoading = true
      // 创建一个参数对象：
      //      如果我们的参数在这里存在就直接添加到对象中，如果参数不存在，就不放到对象中
      let paramsObj = {}
      // 判断是否存在状态
      if (this.status) {
        paramsObj.status = this.status
      }
      // 判断是否存在频道数据
      if (this.form.channelid) {
        paramsObj.channel_id = this.form.channelid
      }
      // 判断是否存在时间
      if (this.dateTime != null && this.dateTime.length !== 0) {
        paramsObj.begin_pubdate = this.dateTime[0]
        paramsObj.end_pubdate = this.dateTime[1]
      }
      // 1.0 得到所有搜索相关的属性
      // 状态： status 频道 form.channelId 时间 dateTime
      // 2.0 以这些数据为参数到服务器中请求:发送请求到服务器
      this.$http({
        url: '/articles',
        method: 'GET',
        params: {
          page: this.page,
          per_page: this.per_page,
          ...paramsObj
        }
      }).then(res => {
        // 将数据保存
        this.dataList = res.results
        this.total_count = res.total_count
        this.tableLoading = false
      })
    }
  },
  created () {
    // 文章列表
    this.getList()
    // 文章频道
    this.getChannels()
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
