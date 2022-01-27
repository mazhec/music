<template>
  <div class="play-bar" :class="{show: !toggle}">
    <div class="item-up" @click="toggle=!toggle" :class="{turn: toggle}">
      <svg class="icon">
        <use xlink:href="#icon-jiantou-xia-cuxiantiao"></use>
      </svg>
    </div>
    <div class="kongjian">
      <!-- 上一首 -->
      <div class="item" @click="prev">
        <svg class="icon">
          <use xlink:href="#icon-ziyuanldpi"></use>
        </svg>
      </div>

      <!-- 播放 -->
      <div class="item" @click="togglePlay">
        <svg class="icon">
          <use :xlink:href="playBUttonUrl"></use>
        </svg>
      </div>

      <!-- 下一首 -->
      <div class="item" @click="next">
        <svg class="icon">
          <use xlink:href="#icon-ziyuanldpi1"></use>
        </svg>
      </div>

      <!-- 歌曲图片 -->
      <div class="item-img" @click="toLyric">
        <img :src="picUrl" alt="">
      </div>

      <!-- 播放进度 -->
      <div class="playing-speed">
        <!-- 播放开始时间 -->
        <div class="current-time">{{ nowTime }}</div>
        <div class="progress-box">
          <div class="item-song-title">
            <div>{{ title }}</div>
            <div>{{ artist }}</div>
          </div>
          <div ref="progress" class="progress" @mousemove="mousemove">
            <!-- 进度条 -->
            <div class="bg" ref="bg" @click="updatemove">
              <div class="cur-progress" ref="curProgress" :style="{width: curLength + '%'}"></div>
            </div>

            <!-- 拖动的点点 -->
            <div @mousedown="mousedown" @mouseup="mouseup" class="idot" ref="idot" :style="{left: curLength + '%'}"></div>
          </div>
        </div>

        <!-- 播放结束时间 -->
        <div class="left-time">{{ songTime }}</div>

        <!-- 音量 -->
        <div class="item item-volume" ref="itemVolume">
          <svg v-if="volume > 0" class="icon" @click="showVolume">
            <use xlink:href="#icon-yinliang1"></use>
          </svg>
          <svg v-else class="icon" @click="showVolume">
            <use xlink:href="#icon-yinliangjingyinheix"></use>
          </svg>
          <el-slider ref="volume" class="volume" v-model="volume" vertical></el-slider>
        </div>

        <!-- 收藏 -->
        <div class="item" @click="collection">
          <svg :class="{active: isActive}" class="icon">
            <use xlink:href="#icon-xihuan-shi"></use>
          </svg>
        </div>

        <!-- 下载 -->
        <div class="item" @click="download">
          <svg class="icon">
            <use xlink:href="#icon-xiazai"></use>
          </svg>
        </div>

        <!-- 当前播放的歌曲列表 -->
        <div class="item item-volume" @click="changeAside">
          <svg class="icon">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mixin } from '../mixins'
import { download, setCollect } from '../api'
export default {
  name: 'play-bar',
  mixins: [mixin],
  computed:{
    ...mapGetters([
      'id',
      'url',
      'isPlay',
      'playBUttonUrl',
      'picUrl',
      'title',
      'artist',
      'curTime',
      'duration',
      'listOfSongs', // 当前歌单列表
      'listIndex',     // 当前歌曲在歌单中的位置
      'autoNext',      // 自动播放
      'loginIn',
      'userId',
      'isActive'
    ])
  },
  data() {
    return {
      nowTime: '00:00',
      songTime: '00:00',    // 当前歌曲总时间
      curLength: 0,         // 进度条的位置
      progressLength: 0,    // 进度条总长度
      mouseStartX: 0,       // 拖拽开始位置
      tag: false,           // 拖拽开始结束的标志
      volume: 50,
      toggle: true,        // 显示隐藏底部播放栏
    }
  },
  watch: {
    isPlay() {
      if (this.isPlay) {
        this.$store.commit('setPlayBUttonUrl', '#icon-zanting')
      } else {
        this.$store.commit('setPlayBUttonUrl', '#icon-bofang')
      }
    },
    curTime() {
      this.nowTime = this.formatSeconds(this.curTime)
      this.songTime = this.formatSeconds(this.duration)
      this.curLength = (this.curTime / this.duration) * 100
    },
    volume() {
      this.$store.commit('setVolume', this.volume / 100)
    },
    autoNext() {
      this.next()
    }
  },
  mounted() {
    this.progressLength = this.$refs.progress.getBoundingClientRect().width
    if(this.$refs.volume.$el != 'undefined') {
      this.$refs.volume.$el.addEventListener('click', function(e) {
        e.stopPropagation()
      }, false)
    }
    document.addEventListener('click', () => {
      if(this.$refs.volume.$el != 'undefined') {
        this.$refs.volume.$el.classList.remove('show-volume')
      }
    }, false)
  },
  methods: {
    togglePlay() {
      if (this.isPlay) {
          this.$store.commit('setIsPlay', false)
      } else {
        this.$store.commit('setIsPlay', true)
      }
    },
    formatSeconds(value) {
      let theTime = parseInt(value)
      let result = ''
      let hour = parseInt(theTime / 3600)
      let minute = parseInt((theTime / 60) % 60)
      let second = parseInt(theTime % 60)
      if (hour > 0) {
        if (hour < 10) {
          result = '0' + hour + ':'
        } else {
          result = hour + ':'
        }
      }
      if (minute > 0) {
        if (minute < 10) {
          result += '0' + minute + ':'
        } else {
          result += minute + ':'
        }
      } else {
        result += '00:'
      }
      if (second > 0) {
        if (second < 10) {
          result += '0' + second
        } else {
          result += second
        }
      } else {
        result += '00'
      }
      return result
    },
    // 拖拽开始
    mousedown(e) {
      this.mouseStartX = e.clientX
      this.tag = true
    },
    mouseup() {
      this.tag = false
    },
    // 拖拽中
    mousemove(e) {
      if (!this.duration) {
        return false
      }
      if (this.tag) {
        let movementX = e.clientX - this.mouseStartX  // 点点移动的距离
        let curLength = this.$refs.curProgress.getBoundingClientRect().width
        let newCurLength = ((curLength + movementX) / this.progressLength) * 100
        if (newCurLength > 100) {
          newCurLength = 100
        }
        this.curLength = newCurLength
        this.mouseStartX = e.clientX
        this.changeTime(newCurLength)
      }
    },
    // 更改歌曲进度
    changeTime(percent) {
      let newCurTime = percent * 0.01 * this.duration
      this.$store.commit('setChangeTime', newCurTime)
    },
    updatemove(e) {
      if (!this.tag) {
        // 进度条左侧坐标
        let curLength = this.$refs.bg.offsetLeft
        let newPercent = ((e.clientX - curLength) / this.progressLength) * 100
        if (newPercent > 100) {
          newPercent = 100
        } else if (newPercent < 0) {
          newPercent = 0
        }
        this.curLength = newPercent
        this.changeTime(newPercent)
      }
    },
    showVolume(e) {
      console.log(this.$refs.volume)
      this.$refs.volume.$el.classList.add('show-volume')
      e.stopPropagation()
    },
    // 显示播放中的歌曲列表
    changeAside() {
      this.$store.commit('setShowAside', true)
    },
    // 上一首
    prev() {
      if (this.listIndex !== -1 && this.listOfSongs.length > 1) { // 只有一首歌曲是不执行
        if (this.listIndex > 0) {                                 // 不是第一首音乐
          this.$store.commit('setListIndex', this.listIndex - 1)  // 直接返回上一首音乐
        } else {
          this.$store.commit('setListIndex', this.listOfSongs.length - 1)  // 切换到倒数第一首
        }
        this.play(this.listOfSongs[this.listIndex].url)
      }
    },
    // 下一首
    next() {
      if (this.listIndex !== -1 && this.listOfSongs.length > 1) { // 只有一首歌曲是不执行
        if (this.listIndex < this.listOfSongs.length - 1) {      // 不是最后一首音乐
          this.$store.commit('setListIndex', this.listIndex + 1)  // 直接返回下一首音乐
        } else {
          this.$store.commit('setListIndex', 0)  // 切换到第一首
        }
        this.play(this.listOfSongs[this.listIndex].url)
      }
    },
    play(url) {
      if (url && url !== this.url) {
        this.$store.commit('setId', this.listOfSongs[this.listIndex].id)
        this.$store.commit('setUrl', this.$store.state.configure.HOST + url)
        this.$store.commit('setPicUrl', this.$store.state.configure.HOST + this.listOfSongs[this.listIndex].pic)
        this.$store.commit('setTitle', this.replaceFname(this.listOfSongs[this.listIndex].name))
        this.$store.commit('setArtist', this.replaceLname(this.listOfSongs[this.listIndex].name))
        this.$store.commit('setLyric', this.parseLyric(this.listOfSongs[this.listIndex].lyric))
        this.$store.commit('setIsPlay', true)
      }
    },
    toLyric() {
      this.$router.push('/lyric')
    },
    // 下载音乐
    download() {
      download(this.url).then(res => {
        console.log(res.data)
        let elelink = document.createElement('a')
        elelink.download = `${this.artist}-${this.title}.mp3`
        elelink.style.display = 'none'
        // 把字符内容转换成blob地址
        let blob = new Blob([res.data])
        elelink.href = URL.createObjectURL(blob)
        // 把链接地址加到document里
        document.body.appendChild(elelink)
        // 触发点击事件
        elelink.click()
        // 然后移除掉a标签
        document.body.removeChild(elelink)
      }).catch(err => {
        console.log(err)
      })
    },
    // 收藏
    collection() {
      if(this.loginIn) {
        setCollect({userId: this.userId, type: 0, songId: this.id}).then(res => {
          if(res.data.code == 1) {
            this.$store.commit('setIsActive', true)
            this.notify('收藏成功', 'success')
          } else if(res.data.code == 2) {
            this.$store.commit('setIsActive', true)
            this.notify('已收藏', 'warning')
          } else {
            this.notify('收藏失败', 'error')
          }
        })
      } else {
        this.notify('请先登录', 'warning')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/play-bar.scss';
</style>