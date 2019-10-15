<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论列表</span>
      </div>
    </el-card>
    <el-card class="box-xia">
      <template>
        <el-table :data="commentList" style="width: 100%">
          <el-table-column prop="title" label="标题" width="180">
          </el-table-column>
          <el-table-column label="评论状态" width="180">
            <template slot-scope="scoped">
              <el-tag v-if="scoped.row.comment_status === false" type="danger">禁止</el-tag>
              <el-tag v-if="scoped.row.comment_status === true" type="success">开启</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数">
          </el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝总评论数">
          </el-table-column>
          <el-table-column label="操作">
            <!-- 关闭与开启评论 -->
            <template slot-scope="scoped">
              <el-button @click="closeComment(scoped.row)" type="text">
                {{ scoped.row.comment_status?'关闭评论':'开启评论' }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="pageChange" @prev-click="prevClick" @next-click="nextClick" background layout="prev, pager, next" :total="total_count">
        </el-pagination>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentList: [],
      // 默认第一页
      page: 1,
      // 默认每页条数
      per_page: 10,
      // 总评论数
      total_count: 0
    }
  },
  methods: {
    // 获取数据源
    getCommentList () {
      this.$http({
        url: '/articles',
        method: 'GET',
        params: {
          response_type: 'comment',
          // 设置页码条数
          page: this.page,
          per_page: this.per_page

        }
      }).then(res => {
        // 设置数据对象
        this.commentList = res.results
        // 设置评论总数
        this.total_count = res.total_count
      })
    },
    // 关闭与开启评论
    closeComment (row) {
      this.$http({
        url: `/comments/status?article_id=${row.id}`,
        method: 'PUT',
        data: {
          allow_comment: !row.comment_status
        }
      }).then(res => {
        // 重新获取数据
        this.getCommentList()
        this.$message({
          message: res.allow_comment ? '开启评论' : '关闭评论',
          type: 'success'
        })
      })
    },
    // 上一页
    prevClick () {
      this.page = this.page--
      this.getCommentList()
    },
    // 下一页
    nextClick () {
      this.page = this.page++
      this.getCommentList()
    },
    // 点击当前页触发
    pageChange (currentPage) {
      this.page = currentPage
      this.getCommentList()
    }
  },
  created () {
    this.getCommentList()
  }
}
</script>

<style lang="less" scoped>
.box-xia {
  margin-top: 20px;
}
</style>
