import axios from 'axios'
import { get, post, put, del } from './http'



/**
 * 歌手相关
 * @returns 
 */

// 查询歌手
export const getAllSinger = () => get(`singer/allSinger`)

// 根据性别查询歌手
export const getSingerOfSex = sex => get(`singer/singerOfSex/${ sex }`)



/**
 * 歌曲相关
 */

// 查询歌曲
export const songOfSingerId = id => get(`song/singer/detail/${id}`)

// 根据歌曲id查询歌曲对象
export const songOfSongId = songId => get(`song/detail/${songId}`)

// 根据歌名精模糊询歌曲对象
export const likeSongOfSongName = songName => get(`song/likeSongOfSongName/${songName}`)


/**
 * 歌单相关
 * @returns 
 */

// 查询歌单
export const getAllSongList = () => get(`songList/allSongList`)

// 返回标题包含文字的歌单列表
export const getSongListOfLike = keywords => get(`songList/likeTitle/${ keywords }`)

// 根据歌风格题模糊查询列表
export const getSongListOfLikeStytle = style => get(`songList/likeStytle/${ style }`)



/**
 * 歌单的歌曲相关
 */

// 根据歌单id查询歌曲列表
export const listSongDetail = songListId => get(`listSong/detail/${ songListId }`)



/**
 * 用户相关
 * @returns 
 */

// 查询用户
export const getAllConsumer = () => get(`/consumer/allConsumer`)

// 注册
export const SignUp = params => post(`/consumer/add`, params)

// 登录
export const loginIn = params => post(`/consumer/login`, params)

// 根据用户id查询该用户的详细信息
export const getUserOfId = id => get(`/consumer/selectById/${id}`)

// 更新用户信息
export const UpdataUserMsg = params => put(`/consumer/update`, params)

/**
 * 下载音乐
 */
export const download = (url) => axios({
  methods: 'get',
  url,
  responseType: 'blob'
})


/**
 * 评价
 */

// 提交评分
export const setRank = params => post(`/rank/add`, params)

// 获取指定歌单的平均分
export const getRankOfSongListId = songListId => get(`/rank/${songListId}`)


/**
 * 评论
 */

// 提交评论
export const setComment = params => post(`/comment/add`, params)

// 点赞
export const setLike = params => post(`/comment/like`, params)

// 返回当前歌单或歌曲的评论列表
export const getAllComment = (type, id) => {
  if (type == 0) {
    return get(`/comment/commentOfSongId/${id}`)
  } else {
    return get(`/comment/commentOfSongListId/${id}`)
  }
}



/**
 * 收藏
 */
// 新增收藏
export const setCollect = params => post(`/collect/add`, params)

// 指定用户的收藏列表
export const getCollectOfUserId = userId => get(`/collect/collectOfUserId/${userId}`)