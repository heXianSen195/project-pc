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
          <!-- <el-input v-model="ruleForm.content"></el-input> -->
          <quill-editor v-model="ruleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          {{ ruleForm.cover.type }}
          <el-radio-group v-model="ruleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div class="myMess" v-if="ruleForm.cover.type > 0">
            <!-- v-for: 根据ruleForm.cover.type对应的数值 -->
            <div @click="getPrint(index)" class="myImg" v-for="(item,index) in ruleForm.cover.type" :key="index">
              <span>点击图标选择图片</span>
              <img class="myAdd" :src="ruleForm.cover.images[index]?ruleForm.cover.images[index]:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3281196885,1779237671&fm=26&gp=0.jpg'" alt="">

            </div>
          </div>
        </el-form-item>
        <el-form-item label="频道">
          <!-- :mychannel="ruleForm.channel_id" 父传子 -->
          <channleList @tofather="getValue" :mychannel="ruleForm.channel_id" />
          <!-- <el-select v-model="ruleForm.channel_id">
            <el-option v-for="(item, index) in channleList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publish('false')">发表</el-button>
          <el-button @click="publish('true')">存入草稿</el-button>
        </el-form-item>
      </el-form>
      <!-- 选择图片的弹窗 -->
      <el-dialog title="选择封面图片" :visible.sync="imgVisible">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="素材库" name="first">
            <el-radio-group v-model="collectItem" @change="changeCollect">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="收藏"></el-radio-button>
            </el-radio-group>
            <!-- 遍历素材的数据源 -->
            <el-row>
              <el-col :span="8" v-for="(item,index) in collectList" :key="index">
                <img :class="{active: activeIndex === index}" @click="chooseImg(index, item.url)" class="mySetImg" :src="item.url" alt="">
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="second"></el-tab-pane>
          <el-upload class="avatar-uploader" action="http://ttapi.research.itcast.cn/mp/v1_0/user/images" :show-file-list="false" :on-success="handleAvatarSuccess" :headers="{Authorization: `Bearer ${$store.state.userString.token}`}" name="image">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button @click="imgVisible=false">取 消</el-button>
          <el-button type="primary" @click="confrimImg">确 定</el-button>
        </div>
      </el-dialog>
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
        // 标题
        title: '',
        // 封面
        content: '',
        // 文章所属频道id
        channel_id: 2,
        // 图片
        cover: {
          type: 1,
          images: []
        }
      },
      // 要修改数据的 id
      editId: 0,
      // 控制面部隐藏与显示
      imgVisible: false,
      // 设置选中的tab
      activeName: 'first',
      // 默认选择
      collectItem: '全部',
      // 素材图片
      collectList: [],
      // 选中图片的下标
      activeIndex: -1,
      // 图片选中的下标
      selectedIndex: 0,
      // 图片选择器中选中的
      selectedImgUrl: '',
      // 上传图片
      imageUrl: ''
    }
  },
  methods: {
    // 子传父获取id
    getValue (value) {
      this.ruleForm.channel_id = value
    },
    // 实现发表方法
    publish (draft) {
      if (this.$route.path.indexOf('edit') !== -1) {
        // 修改文章
        this.editArticle(draft)
      } else {
        // 发布文章
        this.publistArticle(draft)
      }
    },
    // 发表文章的逻辑
    publistArticle (draft) {
      this.$http({
        url: `/articles?draft=${draft}`, // 请求的路径
        method: 'POST',
        data: {
          // 文章所属频道id
          channel_id: this.ruleForm.channel_id,
          // 封面
          content: this.ruleForm.content,
          // 标题
          title: this.ruleForm.title,
          // 图片先写死
          // cover: {
          //   images: [],
          //   type: 1
          // }
          cover: this.ruleForm.cover
        }
      }).then(res => {
        if (res) {
          this.$message({
            message: draft === 'true' ? '成功存入草稿' : '发表成功',
            type: 'success'
          })
        }
        this.$router.push('/article/list')
      })
    },
    // 修改文章数据
    editArticle (draft) {
      this.$http({
        url: `/articles/${this.editId}?draft=${draft}`,
        method: 'PUT',
        data: this.ruleForm
      }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        // 修改成功跳转页面
        this.$router.push('/article/list')
      })
    },
    // 得到要修改数据的id
    getEditId () {
      this.editId = this.$route.params.id
    },
    // 根据 id 去服务器中得到id对象的数据
    getEditObjById () {
      this.$http({
        url: `/articles/${this.editId}`,
        method: 'GET'
      }).then(res => {
        this.ruleForm = res
      })
    },
    // 显示与隐藏面板
    getPrint (index) {
      this.imgVisible = true
      // 这里的index表示当前点击的图片选择器的下标
      this.selectedIndex = index
    },
    // 获取素材图片
    getCollectList (collect) {
      this.$http({
        url: '/user/images',
        method: 'GET',
        params: {
          collect: collect
        }
      }).then(res => {
        this.collectList = res.results
      })
    },
    // 获取全部或隐藏数据
    changeCollect (index) {
      if (this.collectItem === '全部') {
        this.getCollectList(false)
      } else {
        this.getCollectList(true)
      }
    },
    // 获取当前点击图片的下标
    chooseImg (index, url) {
      this.activeIndex = index
      // 获取点击的图片
      this.selectedImgUrl = url
    },
    // 当点击确定按钮: 完成关闭面板, 将选中的图片保存到cover中的Imges中
    confrimImg () {
      // 关闭弹窗面板
      this.imgVisible = false
      // 设置属性
      this.ruleForm.cover.images[this.selectedIndex] = this.selectedImgUrl
    },
    // 上传成功回调
    handleAvatarSuccess (response, file, fileList) {
      console.log(response)
      // 上传到图框中
      this.imageUrl = response.data.url
      // 上传到发表图框中
      this.selectedImgUrl = response.data.url
    }
  },
  created () {
    // 判断路由
    if (this.$route.path.indexOf('edit') !== -1) {
      this.getEditId()
      // 根据id获取数据
      this.getEditObjById()
    }
    // 调用获取图片素材方法
    this.getCollectList()
  },
  components: {
    channleList // 频道信息
  },
  // 侦听器
  watch: {
    // 侦听路由信息对象
    $route: function () {
      if (this.$route.path.indexOf('publish') !== -1) {
        // 清除数据
        this.ruleForm = {
          // 标题
          title: '',
          // 封面
          content: '',
          // 文章所属频道id
          channel_id: 2
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ql-container.ql-snow {
  height: 400px;
}
.myMess {
  display: flex;
  .myImg {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    text-align: center;
    .myAdd {
      width: 150px;
      height: 150px;
    }
  }
}
.mySetImg {
  width: 200px;
  height: 200px;
  margin: 20px;
}
.active {
  border: 5px solid blue;
  box-sizing: border-box;
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
.avatar-uploader {
  display: flex;
  justify-content: center;
  .el-upload.el-upload--text {
    border: 1px dashed #ccc;
  }
}
</style>
