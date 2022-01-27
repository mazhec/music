<template>
  <div id="app">
    <the-header />
    <router-view class="music-content"/>
    <song-audio />
    <the-aside />
    <play-bar />
    <scroll-top />
    <the-footer />
  </div>
</template>

<script>
import PlayBar from './components/PlayBar.vue'
import ScrollTop from './components/ScrollTop'
import SongAudio from './components/SongAudio.vue'
import TheAside from './components/TheAside.vue'
import TheFooter from './components/TheFooter'
import TheHeader from './components/TheHeader'
export default {
  name: 'App',
  components: { 
    TheHeader, 
    ScrollTop, 
    TheFooter, 
    SongAudio, 
    PlayBar, 
    TheAside 
  },
}
</script>

<style lang="scss" scoped>
@import './assets/css/app.scss';
</style>
