export default {
  state: {
    HOST: 'http://123.57.86.194:8888', // 后台访问地址根目录
    activeName: '首页',                // 当前选中菜单名
    showAside: false,               //  播放中的歌曲列表
    loginIn: false,                 // 用户是否已登录
    isActive: false,               // 当前歌曲是否已收藏
  },
  getters: {
    activeName: state => state.activeName ? state.activeName : JSON.parse(window.sessionStorage.getItem('activeName')),
    showAside: state => state.showAside,
    loginIn: state => JSON.parse(window.sessionStorage.getItem('loginIn')) ? JSON.parse(window.sessionStorage.getItem('loginIn')) : state.loginIn,
    isActive: state => state.isActive
  },
  mutations: {
    setActiveName: (state, activeName) => {
      state.activeName = activeName
      window.sessionStorage.setItem('activeName', JSON.stringify(activeName))
    },
    setShowAside: (state, showAside) => state.showAside = showAside,
    setLoginIn: (state, loginIn) => {
      state.loginIn = loginIn
      window.sessionStorage.setItem('loginIn', JSON.stringify(loginIn))
    },
    setIsActive: (state, isActive) => state.isActive = isActive
  },
  actions: {
  },
  modules: {
  }
}