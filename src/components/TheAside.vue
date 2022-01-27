<template>
  <transition name="slide-fade">
    <div class="the-aside" v-if="showAside">
      <h2 class="title">播放列表</h2>
      <ul class="menus">
        <li @click="toplay(item.id, item.url, item.pic, item.index, item.name, item.lyric)" :class="{ 'is-play': id === item.id }" v-for="(item, index) in listOfSongs" :key="index">{{ replaceFname(item.name) }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { mixin } from '../mixins'
export default {
  name: 'the-aside',
  mixins: [mixin],
  computed: {
    ...mapGetters([
      'showAside',    // 是否显示播放中的歌曲列表
      'listOfSongs',  // 当前歌曲列表
      'id',           // 播放中的音乐id
    ])
  },
  mounted() {
    document.addEventListener('click', () => {
      this.$store.commit('setShowAside', false)
    }, true)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/the-aside.scss';
</style>