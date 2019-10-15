<template>
  <!-- 卡片 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 标题 -->
      <span>图片管理</span>
    </div>
    <!-- 按钮 -->
    <div class="itemBtn">
      <div class="items">
        <el-radio-group v-model="myradio" size="mini" @change="changeAll">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="upload">
        <el-button @click="uploadMat" type="primary">上传素材</el-button>
      </div>
    </div>
    <!-- 布局内容 -->
    <el-row :gutter="20" class="box-top">
      <el-col :span="6" v-for="(item,index) in matericalList" :key="index">
        <el-card class="mycard">
          <!-- 图片 -->
          <img class="myimg" :src="item.url" alt="">
          <div class="mybtns">
            <el-button @click="collect(true, item.id)" v-if="item.is_collected === false" type="text">
              <i class="el-icon-star-off"></i>
              <!-- 空心：未收藏 -->
            </el-button>
            <el-button @click="collect(false, item.id)" v-if="item.is_collected === true" type="text">
              <i class="el-icon-star-on"></i>
              <!-- 实心：已收藏 -->
            </el-button>
            <!-- 删除图标 -->
            <el-button @click="delMat(item.id)" type="text">
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <el-pagination @current-change="pageChange" @prev-click="prevClick" @next-click="nextClick" background layout="prev, pager, next" :total="total_count">
    </el-pagination>
    <!-- 隐藏与显示面板 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <!-- 上传图片 -->
      <!-- on-success 成功的钩子函数 -->
      <el-upload class="avatar-uploader" action="http://ttapi.research.itcast.cn/mp/v1_0/user/images" :show-file-list="false" :headers='headers' name="image" :on-success="uploadsuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closBtn">关闭</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
export default {
  data () {
    return {
      // 默认选中
      myradio: '全部',
      // 数据源
      matericalList: [],
      // 面板隐藏
      dialogFormVisible: false,
      // 默认第一页
      page: 1,
      // 默认每页图片数
      per_page: 20,
      // 图片总数
      total_count: 0,
      // 定义上传图片
      imageUrl: '',
      // 上传请求头
      headers: {
        'Authorization': `Bearer ${userInfo.token}`
      }
    }
  },
  methods: {
    // 异步请求数据获取素材
    getMatericalList (collect) {
      this.$http({
        url: '/user/images',
        method: 'GET',
        params: {
          collect: collect,
          // 页数
          page: this.page,
          // 图片总数
          per_page: this.per_page
        }
      }).then(res => {
        // 数据源
        this.matericalList = res.results
        // 图片总数
        this.total_count = res.total_count
      })
    },
    // 点击全部与收藏获取内容
    changeAll (params) {
      if (params === '全部') {
        this.getMatericalList(false)
      } else {
        this.getMatericalList(true)
      }
    },
    // 点击收藏与取消收藏素材
    collect (bool, id) {
      this.$http({
        url: `/user/images/${id}`,
        method: 'PUT',
        data: {
          collect: bool
        }
      }).then(res => {
        // 提醒收藏成功与取消
        this.$message({
          message: res.collect ? '收藏成功' : '取消收藏',
          type: 'success'
        })
      })
      // 更新数据
      if (this.myradio === '全部') {
        this.getMatericalList(false)
      } else {
        this.getMatericalList(true)
      }
    },
    // 删除方法
    delMat (id) {
      // 获取id值删除对应的数据
      this.$http({
        url: `/user/images/${id}`,
        method: 'DELETE'
      }).then(res => {
        // 提醒删除成功
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
      // 更新数据
      if (this.myradio === '全部') {
        this.getMatericalList(false)
      } else {
        this.getMatericalList(true)
      }
    },
    // 上一页
    prevClick () {
      this.page--
      this.getMatericalList()
    },
    // 下一页
    nextClick () {
      this.page++
      this.getMatericalList()
    },
    // 点击触发翻页事件
    pageChange (id) {
      this.page = id
      this.getMatericalList()
    },
    // 面板显示
    uploadMat () {
      this.dialogFormVisible = true
    },
    // 上传图片成功时触发
    uploadsuccess (response, file, fileList) {
      this.imageUrl = response.data.url
    },
    // 隐藏面板 刷新页面
    closBtn () {
      // 隐藏面板
      this.dialogFormVisible = false
      // 刷新页面
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      // 刷新页面
      this.getMatericalList(false)
    }
  },
  // 刷新页面
  created () {
    this.getMatericalList()
  }
}
</script>

<style lang="less" scoped>
.itemBtn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mycard {
  .myimg {
    width: 100%;
    height: 200px;
  }
  .mybtns {
    display: flex;
    justify-content: space-around;
    i {
      font-size: 20px;
    }
  }
}
.box-top {
  margin-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-pagination.is-background {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
