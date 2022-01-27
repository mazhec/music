export default {
  state: {
    listOfSongs: [],   // 当前歌曲列表
    isPlay: false,     // 是否播放歌曲
    url: '',
    id: '',
    playBUttonUrl: '#icon-bofang',
    duration: 0,         // 音乐时长
    curTime: 0,          // 当前音乐播放位置
    changeTime: 0,       // 指定播放时刻
    title: '',           // 歌名
    artist: '',          // 歌手名
    picUrl: '',          // 歌曲图片
    autoNext: true,      // 自动触发播放下一首
    lyric: [],           // 未处理的歌词数据
    tempList: {},        // 单个歌单信息
    listIndex: null,     // 当前歌曲在歌单中的位置
    volume: 50,          // 音量
  },
  getters: {
    listOfSongs: state => state.listOfSongs.length ? state.listOfSongs : JSON.parse(window.sessionStorage.getItem('listOfSongs') || null),
    isPlay: state => state.isPlay,
    url: state => state.url ? state.url : JSON.parse(window.sessionStorage.getItem('url')),
    id: state => state.id ? state.id : JSON.parse(window.sessionStorage.getItem('id')),
    playBUttonUrl: state => state.playBUttonUrl ? state.playBUttonUrl : JSON.parse(window.sessionStorage.getItem('playBUttonUrl')),

    duration: state => state.duration ? state.duration : JSON.parse(window.sessionStorage.getItem('duration')),
    curTime: state => state.curTime ? state.curTime : JSON.parse(window.sessionStorage.getItem('curTime')),
    changeTime: state => state.changeTime ? state.changeTime : JSON.parse(window.sessionStorage.getItem('changeTime')),
    title: state => state.title ? state.title : JSON.parse(window.sessionStorage.getItem('title')),
    artist: state => state.artist ? state.artist : JSON.parse(window.sessionStorage.getItem('artist')),
    picUrl: state => state.picUrl ? state.picUrl : JSON.parse(window.sessionStorage.getItem('picUrl')),
    autoNext: state => state.autoNext ? state.autoNext : JSON.parse(window.sessionStorage.getItem('autoNext')),
    lyric: state => state.lyric ? state.lyric : JSON.parse(window.sessionStorage.getItem('lyric')),
    tempList: state => state.tempList ? state.tempList : JSON.parse(window.sessionStorage.getItem('tempList')),
    listIndex: state => state.listIndex ? state.listIndex : JSON.parse(window.sessionStorage.getItem('listIndex')),
    volume: state => state.volume ? state.volume : JSON.parse(window.sessionStorage.getItem('volume'))
  },
  mutations: {
    setListOfSongs: (state, listOfSongs) => {
      state.listOfSongs = listOfSongs
      window.sessionStorage.setItem('listOfSongs', JSON.stringify(listOfSongs))
    },
    setIsPlay: (state, isPlay) => {
      state.isPlay = isPlay
    },
    setUrl: (state, url) => {
      state.url = url
      window.sessionStorage.setItem('url', JSON.stringify(url))
    },
    setId: (state, id) => {
      state.id = id
      window.sessionStorage.setItem('id', JSON.stringify(id))
    },
    setPlayBUttonUrl: (state, playBUttonUrl) => {
      state.playBUttonUrl = playBUttonUrl
      window.sessionStorage.setItem('playBUttonUrl', JSON.stringify(playBUttonUrl))
    },
    setDuration: (state, duration) => {
      state.duration = duration
      window.sessionStorage.setItem('duration', JSON.stringify(duration))
    },
    setCurTime: (state, curTime) => {
      state.curTime = curTime
      window.sessionStorage.setItem('curTime', JSON.stringify(curTime))
    },
    setChangeTime: (state, changeTime) => {
      state.changeTime = changeTime
      window.sessionStorage.setItem('changeTime', JSON.stringify(changeTime))
    },
    setTitle: (state, title) => {
      state.title = title
      window.sessionStorage.setItem('title', JSON.stringify(title))
    },
    setArtist: (state, artist) => {
      state.artist = artist
      window.sessionStorage.setItem('artist', JSON.stringify(artist))
    },
    setPicUrl: (state, picUrl) => {
      state.picUrl = picUrl
      window.sessionStorage.setItem('picUrl', JSON.stringify(picUrl))
    },
    setAutoNext: (state, autoNext) => {
      state.autoNext = autoNext
      window.sessionStorage.setItem('autoNext', JSON.stringify(autoNext))
    },
    setLyric: (state, lyric) => {
      state.lyric = lyric
      window.sessionStorage.setItem('lyric', JSON.stringify(lyric))
    },
    setTempList: (state, tempList) => {
      state.tempList = tempList
      window.sessionStorage.setItem('tempList', JSON.stringify(tempList))
    },
    setListIndex: (state, listIndex) => {
      state.listIndex = listIndex
      window.sessionStorage.setItem('listIndex', JSON.stringify(listIndex))
    },
    setVolume: (state, volume) => {
      state.volume = volume
      window.sessionStorage.setItem('volume', JSON.stringify(volume))
    }
  },
  actions: {
  },
  modules: {
  }
}