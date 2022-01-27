<template>
  <div>
    <div class="comment">
      <h2>评论</h2>
      <div class="comment-msg">
        <div class="comment-img">
          <img :src="attachImageUrl(avator)" alt="">
        </div>
        <el-input class="comment-input" type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      </div>
      <el-button type="primary" class="sub-btn" @click="postComment">评论</el-button>
    </div>
    <p>精彩评论：共{{ commentList.length }}条评论</p>
    <ul class="popular" v-for="(item, index) in commentList" :key="index">
      <li>
        <div class="popular-img">
          <img :src="attachImageUrl(userPic[index])" alt="">
        </div>
        <div class="popular-msg">
          <ul>
            <li class="name">{{ username[index] }}</li>
            <li class="time">{{ item.createTime }}</li>
            <li class="content">{{ item.content }}</li>
          </ul>
        </div>
        <div class="up" ref="up" @click="postUp(item.id, item.up, index)">
          <svg class="icon">
            <use xlink:href="#icon-zan"></use>
          </svg>
          {{ item.up }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mixin } from '../mixins'
import { mapGetters } from 'vuex'
import { setComment, setLike, getAllComment, getUserOfId } from '../api'
export default {
  name: 'comment',
  mixins: [mixin],
  computed: {
    ...mapGetters([
      'id',           // 当前歌曲或歌单id
      'loginIn',      // 用户是否已经登录
      'userId',       // 当前登录用户id
      'avator',       // 当前登录用户头像
      
    ])
  },
  props: [
    'playId',       // 歌曲或歌单id
    'type'          // 0歌曲、1歌单
  ],
  data() {
    return {
      textarea: '',     // 存放输入的评论内容
      commentList: [],  // 存放评论列表
      userPic: [],      // 用户的头像
      username: [],     // 用户的昵称
    }
  },
  created() {
    this.getComment()
  },
  methods: {
    // 提交评论
    postComment () {
      if (this.loginIn) {
        let params = {}
        if (this.type == 0) {
          params.songId = this.playId
        } else {
          params.songListId = this.playId
        }
        params.userId = this.userId
        params.type = this.type
        params.content = this.textarea
        setComment(params).then(res => {
          console.log(res)
          if (res.data.code == 1) {
            this.notify('评论成功', 'success')
            this.textarea = ''
            this.getComment()
          } else {
            this.notify('评论失败', 'error')
          }
        }).catch(err => this.notify('评论失败', 'error'))
      } else {
        this.notify('请先登录', 'warning')
      }
    },
    // 评论列表
    getComment() {
      getAllComment(this.type, this.playId).then(res => {
        console.log('getAllComment', res)
        this.commentList = res.data
        res.data.forEach(item => {
          this.getUsers(item.userId)
        })
      }).catch(err => this.notify('评论加载失败', 'error'))
    },
    // 获取用户头像和昵称
    getUsers(id) {
      getUserOfId(id).then(res => {
        console.log(res)
        this.userPic.push(res.data.avator)
        this.username.push(res.data.username)
      }).catch(err => console.log(err))
    },
    // 给某个评论点赞
    postUp(id, up, index){
      if (this.loginIn) {
        let params = {}
        params.id = id
        params.up = up + 1
        setLike(params).then(res => {
          console.log(res)
          if (res.data.code == 1) {
            this.$refs.up[index].children[0].style.color = '#2796cd'
            this.getComment()
          } else {
            this.notify('点赞失败', 'error')
          }
        }).catch(err => this.notify('点赞失败', 'error'))
      } else {
        this.notify('请先登录', 'warning')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/comment.scss';
</style>