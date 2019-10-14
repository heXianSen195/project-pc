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
          <label>封面暂无</label>
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
        channel_id: 2
      },
      // 要修改数据的 id
      editId: 0
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
          cover: {
            images: ['http://toutiao.meiduo.site/Fhp5OXHbYJzUdd8pCJGjX4i9K_7y'],
            type: 1
          }
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
    }
  },
  created () {
    // 判断路由
    if (this.$route.path.indexOf('edit') !== -1) {
      this.getEditId()
      // 根据id获取数据
      this.getEditObjById()
    }
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

<style>
.ql-container.ql-snow {
  height: 400px;
}
</style>
