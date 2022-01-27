<template>
  <div class="upload">
    <p class="title">修改头像</p>
    <hr />
    <div class="section">
      <el-upload drag class="upload-demo" :action="uploadUrl()" :show-file-list="false" :on-success="handleAvatorSuccess" :before-upload="beforeAvatorUpload">
        <i class="el-icon-upload"></i>
        <div>将文件拖到此处，或修改头像</div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10MB</div>
      </el-upload>
      <!-- <el-upload
        class="upload-demo"
        drag
        :action="uploadUrl"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10MB</div>
      </el-upload> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mixin } from '../mixins'
export default {
  name: 'Upload',
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  mixins: [mixin],
  methods: {
    uploadUrl() {
      return `${this.$store.state.configure.HOST}/consumer/updateConsumerPic/${this.userId}`
    },
    handleAvatorSuccess(res, file) {
      if(res.code == 1) {
        this.$store.commit('setAvator', res.pic)
        this.notify('修改成功', 'success')
      } else {
        this.notify('修改失败', 'error')
      }
    },
    // 上传之前的校验
    beforeAvatorUpload(file) {
      const isJPG = file.type == 'image/jpeg'
      const isLt10M = file.size / 1024 /1024 < 10
      if(!isJPG) {
        this.notify('上传头像图片只能是JPG格式', 'error')
        return false
      }
      if(!isLt10M) {
        this.notify('上传头像图片不能大于10MB', 'error')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/upload.scss';
</style>