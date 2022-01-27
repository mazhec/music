<template>
  <div class="song-audio">
    <audio
    :src="url"
    id="player"
    controls="controls"
    @canplay="start"
    @ended="ended"
    @timeupdate="timeupdate"
    preload
    ref="player">
  </audio>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCollectOfUserId } from "../api"
export default {
  name: 'song-audio',
  computed: {
    ...mapGetters([
      'id',
      'isPlay',
      'url', 
      'curTime',     
      'changeTime',
      'autoNext',
      'listIndex',
      'userId',
      'volume',
      'listOfSongs',
      'loginIn'
      ])
  },
  data() {
    return {}
  },
  watch: {
    isPlay() {
      this.togglePlay()
    },
    changeTime() {
      this.$refs.player.currentTime = this.changeTime
    },
    // 改变音量
    volume(val) {
      this.$refs.player.volume = val
    }
  },
  methods: {
    // 获取链接后准备播放
    // 开始、暂停
    togglePlay() {
      let player = this.$refs.player
      this.isCollect()
      if (this.isPlay) {
        player.play()
      } else {
        player.pause()
      }
    },
    // 播放完成后触发
    ended() {
      // this.isPlay = false
      this.$store.commit('setCurTime', 0)
      this.$store.commit('setAutoNext', !this.autoNext)
    },
    // 开始、暂停
    start() {
      let player = this.$refs.player
      this.$store.commit('setDuration', player.duration)
      player.play()
      this.isCollect()
    },
    // 音乐播放时记录音乐的播放位置
    timeupdate() {
      this.$store.commit('setCurTime', this.$refs.player.currentTime)
    },
    isCollect() {
      this.$store.commit('setIsActive', false)
      if(this.loginIn) {
        getCollectOfUserId(this.userId).then(res => {
          res.data.forEach(item => {
            if(item.songId == this.id) {
              this.$store.commit('setIsActive', true)
            }
          })
        })
      }
    }
  }
}
</script>

<style>
  .song-audio {
    display: none;
  }
</style>