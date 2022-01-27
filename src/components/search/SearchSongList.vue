<template>
  <div class="search-song-List">
    <content-list :contentList="albumDatas" />
  </div>
</template>

<script>
import ContentList from '../ContentList.vue'
import { getSongListOfLike } from '../../api'
import { mixin } from '../../mixins'
export default {
  name: 'SearchSongList',
  components: { ContentList },
  data() {
    return {
      albumDatas: []
    }
  },
  mixins: [mixin],
  created() {
    this.getSearchList()
  },
  methods: {
    getSearchList() {
      if(!this.$route.query.keywords) {
        this.notify('您输入的内容为空', 'warning')
      } else {
        getSongListOfLike(this.$route.query.keywords).then(res => {
          console.log(res)
          if(res) {
            this.albumDatas = res.data
          } else {
            this.notify('暂无歌曲内容', 'warning')
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/search-song-List.scss';
</style>