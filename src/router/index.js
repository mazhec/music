import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/song-list',
    name: 'song-list',
    component: () => import('../views/SongList.vue')
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('../views/Singer.vue')
  },
  {
    path: '/my-music',
    name: 'my-music',
    component: () => import('../views/MyMusic.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/lyric',
    name: 'lyric',
    component: () => import('../views/Lyric.vue')
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/login-in',
    name: 'login-in',
    component: () => import('../views/LoginIn.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/Setting.vue')
  },
  {
    path: '/singer-album/:id',
    name: 'singer-album',
    component: () => import('../views/SingerAlbum.vue')
  },
  {
    path: '/song-list-album/:id',
    name: 'song-list-album',
    component: () => import('../views/SongListAblum.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
