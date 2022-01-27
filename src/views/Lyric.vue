<template>
  <div class="song-lyric">
    <h1 class="lyric-title">歌词</h1>
    <!-- 有歌词 -->
    <ul class="has-lyric" v-if="lyr.length">
      <li v-for="(item, index) in lyr" :key="index">
        {{ item[1] }}
      </li>
    </ul>
    <!-- 没有歌词 -->
    <div class="no-lyric" v-else>
      <span>暂无歌词</span>
    </div>
  </div>
</template>

<script>
import { mixin } from '../mixins'
import { mapGetters } from 'vuex'
export default {
  name: 'lyric',
  computed: {
    ...mapGetters([
      'curTime',      // 当前歌曲播放到的位置
      'id',           // 当前播放歌曲id
      'lyric',        // 歌词
      'listIndex',    // 当前歌曲在歌单中的位置
      'listOfSongs',  // 当前歌单列表
    ])
  },
  mixins: [mixin],
  data() {
    return {
      lyr: []       // 当前歌曲的歌词
    }
  },
  watch: {
    id() {
      this.lyr = this.parseLyric(this.listOfSongs[this.listIndex].lyric)
    },
    curTime() {
      if (this.lyr.length > 0) {
        this.lyr.forEach((item, index) => {
          if (this.curTime >= item[0]) {
            this.lyr.forEach((item1, indez) => {
              document.querySelectorAll('.has-lyric li')[indez].style.color = '#000'
              document.querySelectorAll('.has-lyric li')[indez].style.fontSize = '15px'
            })
            if (index >= 0) {
              document.querySelectorAll('.has-lyric li')[index].style.color = '#95d2f6'
              document.querySelectorAll('.has-lyric li')[index].style.fontSize = '25px'
            }
          }
        })
      }
    }
  },
  created() {
    this.lyr = this.lyric
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/lyric.scss';
</style>