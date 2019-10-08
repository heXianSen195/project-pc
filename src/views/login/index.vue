<template>
  <div class="login">
    <div class="login-warp">
      <!-- logo区域 -->
      <div class="loginlogo">
        <img src="./logo_index.png" />
      </div>
      <!-- el-form是表单域 -->
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="24">
            <el-col :span="16">
              <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button>发送验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-button type="primary" @click="login" class="login-btn">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
// 导入 axios 第三方文件包
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        // 定义输入框
        mobile: '',
        code: ''
      },
      // 定义规则
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            min: 11,
            max: 11,
            message: '长度在 11 到 11 个字符',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度在 6 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (valid) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // 将数据提到服务器
          this.submitData()
        } else {
          // 结束当前方法
        }
      })
    },
    submitData () {
      // 发送请求到服务器
      axios({
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        method: 'POST',
        data: this.form
      })
        .then(res => {
          // res 中有一个属性叫做 data, 在 data 中有两个属性后面我们会用上： token , refresh_token
          // 只要进入到这个方法中说明登录成功
          // 跳转到主页
          this.$router.push('/')
          this.$message({
            message: '登录成功',
            type: 'success'
          })
        })
        .catch(log => {
          this.$message.error('手机号或者验证码错误')
        })
    }
  }
}
</script>

<style lang="less">
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  .loginlogo {
    text-align: center;
    img {
      width: 150px;
      margin-bottom: 20px;
    }
  }
  .login-warp {
    background-color: #fff;
    padding: 30px;
    min-width: 300px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
