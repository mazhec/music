export default {
  state: {
    userId: '',                     // 用户id
    username: '',                   // 用户账号
    avator: '',                     // 用户头像
  },
  getters: {
    userId: state => state.userId ? state.userId : JSON.parse(window.sessionStorage.getItem('userId')),
    username: state => state.username,
    avator: state => state.avator
  },
  mutations: {
    setUserId: (state, userId) => {
      state.userId = userId
      window.sessionStorage.setItem('userId', JSON.stringify(userId))
    },
    setUsername: (state, username) => state.username = username,
    setAvator: (state, avator) => state.avator = avator
  },
  actions: {
  },
  modules: {
  }
}