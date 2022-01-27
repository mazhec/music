import { likeSongOfSongName } from "../api"
export const mixin = {
  methods: {
    // 提示信息
    notify(title, type) {
      this.$notify({
        title,
        type,
        duration: 2000
      })
    },
    attachImageUrl(srcUrl) {
      return srcUrl ? this.$store.state.configure.HOST + srcUrl : this.$store.state.configure.HOST + '/img/user.jpg'
    },
    // 根据歌名精模糊询歌曲对象
    getSong() {
      if(!this.$route.query.keywords) {
        this.$store.commit('setListOfSongs', [])
        this.notify('您输入的内容为空', 'warning')
      } else {
        likeSongOfSongName(this.$route.query.keywords).then(res => {
          if (!res.data.length) {
            this.$store.commit('setListOfSongs', [])
            this.notify('系统暂无符合条件的歌曲', 'warning')
          } else {
            this.$store.commit('setListOfSongs', res.data)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 获取名字前半部分
    replaceLname(str) {
      let arr = str.split('-')
      return arr[0]
    },
    // 获取名字后半部分
    replaceFname(str) {
      let arr = str.split('-')
      return arr[1]
    },
    // 播放
    toplay(id, url, pic, index, name, lyric) {
      if (this.id !== id) {
        this.$store.commit('setId', id)
        this.$store.commit('setUrl', this.$store.state.configure.HOST + url)
        this.$store.commit('setPicUrl', this.$store.state.configure.HOST + pic)
        this.$store.commit('setListIndex', index)
        this.$store.commit('setTitle', this.replaceFname(name))
        this.$store.commit('setArtist', this.replaceLname(name))
        this.$store.commit('setLyric', this.parseLyric(lyric))
        this.$store.commit('setIsPlay', true)
      } else {
        if (this.isPlay) {
          this.$store.commit('setIsPlay', false)
        } else {
          this.$store.commit('setIsPlay', true)
        }
      }
    },
    // 解析歌词
    parseLyric(text) {
      // let lines = text.split('\n')                  // 将歌词按行分解成数组
      // let pattern = /\[\d{2}:d{2}.(d{3}|\d{2})\]/g  // 时间格式的正则表达式
      // let res = []
      // // 歌词格式不对直接返回
      // if (!(/\[.+\]/.test(text))) {
      //   return [[0, text]]
      // }
      // while(!pattern.test(lines[0])) {
      //   lines = lines.slice(1)
      // }
      // lines[lines.length - 1].length === 0 && lines.pop()
      // // 遍历每一行,形成每行带两元素的数组
      // lines.forEach(item => {
      //   let time = item.match(pattern)
      //   let value = item.replace(pattern, '')
      //   time.forEach(item1 => {
      //     let t = item1.slice(1, -1).split(':')
      //     if (value !== '') {
      //       res.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value])
      //     }
      //   })
      // })
      // res.sort((a, b) => {
      //   return a[0] - b[0]
      // })
      // return res

      let lines = text.split('\n')
      let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g
      let result = []

      // 对于歌词格式不对的特殊处理
      if (!(/\[.+\]/.test(text))) {
        return [[0, text]]
      }

      while (!pattern.test(lines[0])) {
        lines = lines.slice(1)
      }

      lines[lines.length - 1].length === 0 && lines.pop()
      for (let item of lines) {
        let time = item.match(pattern) // 存前面的时间段
        let value = item.replace(pattern, '') // 存歌词
        for (let item1 of time) {
          let t = item1.slice(1, -1).split(':')
          if (value !== '') {
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value])
          }
        }
      }
      result.sort(function (a, b) {
        return a[0] - b[0]
      })
      return result
    },
    attachBirth(val) {
      return val.substr(0, 10)
    }
  },
}