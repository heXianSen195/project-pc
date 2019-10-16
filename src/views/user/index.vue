<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
    </div>
    <!-- 布局内容 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="头条帐号">
            <el-input type="text" disabled v-model="ruleForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input type="text" disabled v-model="ruleForm.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input type="text" v-model="ruleForm.intro" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="xiuGaiUser">修改</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-upload class="avatar-uploader" action="www.cctv.com" :http-request="UploadImg" :show-file-list="false">
          <img :src="ruleForm.photo" class="avatar">
          <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 图片数据
      ruleForm: {}
    }
  },
  methods: {
    // 获取用户信息
    getUserRule () {
      this.$http({
        url: '/user/profile',
        method: 'GET'
      }).then(res => {
        console.log(res)
        this.ruleForm = res
      })
    },
    // 修改用户信息提交到服务器
    xiuGaiUser () {
      this.$http({
        url: '/user/profile',
        method: 'PATCH',
        data: {
          name: this.ruleForm.name,
          intro: this.ruleForm.intro,
          email: this.ruleForm.email
        }
      }).then(res => {
        console.log(res)
        // 提示用户更新成功
        this.$message({
          message: '修改完成',
          type: 'success'
        })
        // 将信息更新到 vuex 中
        // 调用 vuex 中mutations 中的方法来修改 userInfo
        this.$store.commit('changeUserInfo', res)
      })
    },
    // 获取修改图片信息
    UploadImg (pawodr) {
      console.log(pawodr)
      // 默认是不支持图片的上传
      // 如果要支持图片的上传, 需要将参数通过formData
      // 将参数转为formData 对象
      let fd = new FormData()
      fd.append('photo', pawodr.file)
      this.$http({
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/user/photo',
        method: 'PATCH',
        data: fd
      }).then(res => {
        console.log(res)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        // 获取修改图片 res.photo 赋值到 this.ruleForm.photo 对象中
        this.ruleForm.photo = res.photo
        // 通过 vuex 完成修改图片数据
        this.$store.commit('changeUserInfoImg', res.photo)
      })
    }
  },
  created () {
    this.getUserRule()
  }
}
</script>

<style lang="less" scoped>
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
</style>
