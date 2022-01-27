<template>
  <div class="song-list-album">
    <div class="album-slide">
      <div class="album-img">
        <img :src="attachImageUrl(tempList.pic)" alt="">
      </div>
      <div class="album-info">
        <h2>简介：</h2>
        <span>{{ tempList.introduction }}</span>
      </div>
    </div>
    <div class="album-content">
      <div class="album-title">
        <p>{{ tempList.title }}</p>
      </div>
      <div class="album-score">
        <div>
          <h3>歌单评分</h3>
          <div>
            <el-rate v-model="average" disabled></el-rate>
          </div>
        </div>
        <span>{{ average * 2 }}</span>
        <div>
          <h3>评价：</h3>
          <div @click="setRank">
            <el-rate v-model="rank" allow-half show-text></el-rate>
          </div>
        </div>
      </div>
      <div class="songs-body">
        <album-content :songList="listOfSongs">
          <template slot="title">歌单</template>
        </album-content>
        <comment :playId="songListId" :type="1" />
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from '../mixins'
import { mapGetters } from 'vuex'
import { listSongDetail, songOfSongId, setRank, getRankOfSongListId } from '../api'
import AlbumContent from '../components/AlbumContent'
import Comment from '../components/Comment'
export default {
  name: 'song-list-album',
  computed: {
    ...mapGetters([
      'listOfSongs',       // 当前播放列表
      'tempList',         // 当前歌单对象
      'loginIn',          // 是否登录
      'userId',           // 当前登录用户id
    ])
  },
  components: {
    AlbumContent,
    Comment
  },
  mixins: [mixin],
  data() {
    return {
      songLists: [],        // 当前页面需要展示的列表
      songListId: '',       // 传递过来的歌单id
      average: 0,           // 平均分
      rank: 0,              // 提交评价的分数
    }
  },
  created() {
    this.songListId = this.$route.params.id
    this.getSongId()
    this.getRank(this.songListId)
  },
  methods: {
    getSongId() {
      listSongDetail(this.songListId).then(res => {
        res.data.forEach(item => {
          this.getSongList(item.songId)
        })
        this.$store.commit('setListOfSongs', this.songLists)
      }).catch(err => console.log(err))
    },
    getSongList(id) {
      songOfSongId(id).then(res => {
        this.songLists.push(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getRank(id) {
      getRankOfSongListId(id).then(res => {
        this.average = res.data / 2
      }).catch(err => console.log(err))
    },
    setRank() {
      if (this.loginIn) {
        setRank({
          songListId: this.songListId,
          consumerId: this.userId,
          score: this.rank * 2
        }).then(res => {
          if (res.data.code == 1) {
            this.notify('评分成功', 'success')
            this.getRank(this.songListId)
          } else {
            this.notify('评分失败', 'error')
          }
        }).catch(err => this.notify('您已经评价过了', 'error'))
      } else {
        this.rank = null
        this.notify('请先登录', 'warning')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/song-list-album.scss';
</style>