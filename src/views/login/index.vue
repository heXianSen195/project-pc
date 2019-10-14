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
          <el-row>
            <el-col :span="14">
              <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <!-- offset 控制盒子之间的间距的 -->
            <el-col :span="8" :offset="2">
              <el-button class="colbtn" :disabled="!!timer" @click="getCode">{{timer ? `${codeTime}s后获取`:'获取验证码'}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="read">
          <el-checkbox v-model="form.read" name="type">
            我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-button type="primary" :loading="loginloading" @click="login" class="login-btn">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单的参数
      form: {
        // 定义输入框
        mobile: '13911111111',
        code: '246810',
        read: false
      },
      // 给登录添加 加载 属性定义为false
      loginloading: false,
      // 定义登录规则
      rules: {
        mobile: [
          // 必填
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // 限制长度
          { min: 11, max: 11, message: '长度在 11 到 11 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度在 6 到 6 个字符', trigger: 'blur' }
        ],
        read: [
          { required: true, message: '请先阅读用户协议', trigger: 'change' },
          // 限制结果为 true: 正则表达式
          { pattern: /true/, message: '请先阅读用户协议', trigger: 'change' }
        ]
      },
      // 倒计时的时候
      codeTime: 10,
      // 设置一个定时器
      timer: null
    }
  },
  methods: {
    // 获取登录方法
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
      // 请求服务器时显示等待加载 true
      this.loginloading = true
      // 发送请求到服务器
      this.$http({
        url: '/authorizations',
        method: 'POST',
        data: this.form
      })
        .then(res => {
          console.log(res)
          // res 中有一个属性叫做 data, 在 data 中有两个属性后面我们会用上： token , refresh_token
          // 获取用户信息
          let userInfo = res
          // 将用户信息保存到localStorage 中
          // 通过 JSON.stringify 把 userInfo 用户信息转成 字符串
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          // 只要进入到这个方法中说明登录成功
          // 请求服务器成功返回为 false
          this.loginloading = false
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
    },
    // 获取验证码方法
    getCode () {
      // 获取form表单
      // errMsg: 验证不通过时的提示文本
      this.$refs['form'].validateField('mobile', errMsg => {
        if (errMsg.trim().length > 0) {
          // 说明验证不通果
          return
        }
        // 验证通过: 开启倒计时
        this.timer = setInterval(() => {
          // 时间需要减少
          this.codeTime--
          // 当时间为0时, 需要将定时器清除
          if (this.codeTime <= 0) {
            // 关闭计时器
            clearTimeout(this.timer)
            // 重置计时器
            this.codeTime = 10
            // 将定时器重新设置为null
            this.timer = null
          }
        }, 1000)
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
  background: url("../../assets/login_ed.jpg") no-repeat center;
  background-size: 100%;
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
  .colbtn {
    width: 100%;
  }
}
</style>
