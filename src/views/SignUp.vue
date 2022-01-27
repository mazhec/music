<template>
  <div>
    <login-logo />
    <div class="signUp">
      <div class="signUp-head">
        <span>用户注册</span>
      </div>
      <el-form 
        :model="registerForm" 
        ref="registerForm" 
        label-width="70px" 
        class="demo-ruleForm"
        :rules="rules">
          <el-form-item prop="username" label="用户名">
            <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="sex" label="性别">
            <el-radio-group v-model="registerForm.sex">
              <el-radio :label="0">女</el-radio>
              <el-radio :label="1">男</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="phoneNum" label="手机">
            <el-input v-model="registerForm.phoneNum" placeholder="手机"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="birth" label="生日">
            <el-date-picker v-model="registerForm.birth" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item prop="introduction" label="签名">
            <el-input v-model="registerForm.introduction" placeholder="签名"></el-input>
          </el-form-item>
          <el-form-item prop="location" label="地区">
            <el-select v-model="registerForm.location" placeholder="地区" style="width: 100%;">
              <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <div class="login-btn">
            <el-button @click="goback(-1)">取消</el-button>
            <el-button type="primary" @click="SignUp">确定</el-button>
          </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import LoginLogo from '../components/LoginLogo'
import { rules, cities } from '../assets/data/form'
import { mixin } from '../mixins'
import { SignUp } from '../api'
export default {
  name: 'sign-up',
  components: {
    LoginLogo
  },
  created() {
    this.rules = rules
    this.cities = cities
  },
  mixins: [mixin],
  data() {
    return {
      registerForm: {
        username: '',     // 用户名
        password: '',     // 密码
        sex: '',          // 性别
        phoneNum: '',     // 手机
        email: '',        // 邮箱
        birth: '',        // 生日
        introduction: '', // 签名
        location: '',     // 地区
      },
      cities: [],         // 所有地区
      rules: {}           // 表单提交的规则
    }
  },
  methods: {
    SignUp() {
      // let d = this.registerForm.birth
      // let datatime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      let _this = this
      this.registerForm.avator = '/img/user.jpg'
      SignUp(this.registerForm).then(res => {
        console.log(res)
        if (res.data.code == 1) {
          _this.notify('注册成功', 'success')
          setTimeout(() => {
            _this.$router.push('/')
          }, 2000)
        } else {
          _this.notify('注册失败', 'error')
        }
      }).catch(err => _this.notify('注册失败', 'error'))
    },
    goback(index) {
      this.$router.go(index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/sign-up.scss';
</style>