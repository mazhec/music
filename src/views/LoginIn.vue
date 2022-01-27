<template>
  <div>
    <login-logo />
    <div class="signUp">
      <div class="signUp-head">
        <span>账号登录</span>
      </div>
      <el-form 
        :model="loginForm" 
        ref="loginForm" 
        label-width="70px" 
        class="demo-ruleForm"
        :rules="rules">
          <el-form-item prop="username" label="用户名">
            <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          
          <div class="login-btn">
            <el-button @click="goSignUp">注册</el-button>
            <el-button type="primary" @click="handleLogin">登录</el-button>
          </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import LoginLogo from '../components/LoginLogo'
import { mixin } from '../mixins'
import { loginIn } from '../api'
export default {
  name: 'sign-up',
  components: {
    LoginLogo
  },
  mixins: [mixin],
  data() {
    return {
      loginForm: {
        username: 'Yin',     // 用户名
        password: '123',     // 密码
      },
      rules: {           // 表单提交的规则
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ],
      }
    }
  },
  methods: {
    handleLogin() {
      loginIn(this.loginForm).then(res => {
        console.log(res)
        if (res.data.code == 1) {
          const userInfo = res.data.userMsg
          this.notify(res.data.msg, 'success')
          this.$store.commit('setLoginIn', true)
          this.$store.commit('setUserId', userInfo.id)
          this.$store.commit('setUsername', userInfo.username)
          this.$store.commit('setAvator', userInfo.avator)
          setTimeout(() => {
            this.changeIndex('首页')
            this.$router.push('/')
          }, 2000)
        } else {
          this.notify(res.data.msg, 'error')
        }
      }).catch(err => this.notify(res.data.msg, 'error'))
    },
    goSignUp() {
      this.$router.push('/sign-up')
      this.changeIndex('注册')
    },
    changeIndex(val) {
      this.$store.commit('setActiveName', val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/sign-up.scss';
</style>