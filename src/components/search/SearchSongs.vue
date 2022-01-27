<template>
  <div class="search-songs">
    <album-content :songList="listOfSongs" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mixin } from '../../mixins'
import AlbumContent from '../AlbumContent'
export default {
  name: 'SearchSongs',
  computed: {
    ...mapGetters(['listOfSongs'])
  },
  mixins: [mixin],
  components: { AlbumContent },
  created() {
    this.getSong()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/search-songs.scss';
</style>