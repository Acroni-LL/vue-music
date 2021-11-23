import axios from 'axios'
const ERR_OK = 0

const baseURL = '/'

// 生产环境中baseUrl必须为全路径，开发环境中为根路径‘／’
// const baseURL = process.env.NODE_ENV === 'production' ? 'http://acroni.com/music-next' : '/'

axios.defaults.baseURL = baseURL

export function get (url, params) {
  return axios.get(url, {
    params
  }).then((res) => {
    const serverData = res.data
    if (serverData.code === ERR_OK) {
      return serverData.result
    }
  }).catch((e) => {
    console.log(e)
  })
}
