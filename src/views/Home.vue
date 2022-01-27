<template>
  <div class="home">
    <swiper />
    <div class="section" v-for="(item, index) in songsList" :key="index">
      <div class="section-title">{{ item.name }}</div>
      <content-list :contentList="item.list" />
    </div>
  </div>
</template>

<script>
import { getAllSinger, getAllSongList } from '../api/index'
import ContentList from '../components/ContentList'
import Swiper from '../components/Swiper'
export default {
  name: 'Home',
  components: {
    Swiper,
    ContentList
  },
  data() {
    return {
      songsList: [
        { name: '歌单', list: [] },
        { name: '歌手', list: [] }
      ]
    }
  },
  created() {
    this.getSongList()
    this.getSinger()
  },
  methods: {
    getSongList() {
      getAllSongList().then(res => {
        console.log('getAllSongList', res)
        this.songsList[0].list = res.data.slice(0, 10)
      }).catch(err => {
        console.log(err)
      })
    },
    getSinger() {
      getAllSinger().then(res => {
        console.log('getAllSinger', res)
        this.songsList[1].list = res.data.slice(0, 10)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/home.scss'
</style>
