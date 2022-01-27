<template>
  <div class="my-music">
    <div class="album-slide">
      <div class="album-img">
        <img :src="attachImageUrl(avator)">
      </div>
      <ul class="album-info">
        <li>昵称:{{ username }}</li>
        <li>性别:{{ userSex }}</li>
        <li>生日:{{ birth }}</li>
        <li>故乡:{{ location }}</li>
      </ul>
    </div>
    <div class="album-content">
      <div class="album-title">个性签名:{{ introduction }}</div>
      <div class="songs-body">
        <album-content :songList="collectList">
          <template slot="title">我的收藏</template>
        </album-content>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from '../mixins'
import { mapGetters } from 'vuex'
import { getUserOfId, getCollectOfUserId, songOfSongId } from '../api'
import AlbumContent from '../components/AlbumContent.vue'
export default {
  components: { AlbumContent },
  name: 'my-music',
  computed: {
    ...mapGetters([
      'listOfSong',
      'tempList',
      'loginIn',
      'userId'
    ])
  },
  mixins: [mixin],
  data() {
    return {
      // 用户头像
      avator: '',
      // 用户名
      username: '',
      // 性别
      userSex: '',
      // 生日
      birth: '',
      // 故乡
      location: '',
      // 签名
      introduction: '',
      // 收藏的歌曲列表
      collection: [],
      // 收藏的歌曲列表(带歌曲详情)
      collectList: []
    }
  },
  created() {
    this.getMsg(this.userId)
    this.getCollection(this.userId)
  },
  methods: {
    getMsg(userId) {
      getUserOfId(userId).then(res => {
        this.avator = res.data.avator
        this.username = res.data.username
        if(res.data.sex == 0) {
          this.userSex = '女'
        } else if(res.data.sex == 1) {
          this.userSex = '男'
        }
        this.birth = res.data.birth
        this.location = res.data.location
        this.introduction = res.data.introduction
      })
    },
    // 获取我的收藏列表
    getCollection(userId) {
      getCollectOfUserId(userId).then(res => {
        this.collection = res.data
        this.collection.forEach(item => {
          this.getSongsOfIds(item.songId)
        })
      })
      .catch(err => console.log(err))
    },
    // 通过歌曲id获取歌曲信息
    getSongsOfIds(id) {
      songOfSongId(id).then(res => {
        this.collectList.push(res.data)
      })
      .catch(err => console.log(err))
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/my-music.scss';
</style>