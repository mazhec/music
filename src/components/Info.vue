<template>
  <div>
    <div class="info">
      <div class="title">
        <span>编辑个人资料</span>
      </div>
      <hr />
      <div class="personal">
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
            <el-date-picker :editable="false" v-model="registerForm.birth" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item prop="introduction" label="签名">
            <el-input v-model="registerForm.introduction" placeholder="签名"></el-input>
          </el-form-item>
          <el-form-item prop="location" label="地区">
            <el-select v-model="registerForm.location" placeholder="地区" style="width: 100%;">
              <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <div class="btn">
            <el-button type="primary" @click="saveMsg">保存</el-button>
            <el-button @click="goback(-1)">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { rules, cities } from '../assets/data/form'
import { mixin } from '../mixins'
import { UpdataUserMsg, getUserOfId } from '../api'
export default {
  name: 'Info',
  computed: {
    ...mapGetters([
      'userId'
    ])
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
  created() {
    this.rules = rules
    this.cities = cities
    this.getMsg(this.userId)
  },
  methods: {
    getMsg(userId) {
      getUserOfId(userId).then(res => {
        console.log(res)
        this.registerForm = res.data
      })
    },
    saveMsg() {
      UpdataUserMsg(this.registerForm).then(res => {
        console.log(res)
        if (res.data.code == 1) {
          this.$store.commit('setUserName', this.registerForm.username)
          this.notify('修改成功', 'success')
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        } else {
          this.notify('修改失败', 'error')
        }
      }).catch(err => this.notify('修改失败', 'error'))
    },
    goback(index) {
      this.$router.go(index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/info.scss';
</style>