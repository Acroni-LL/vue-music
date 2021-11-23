import { createRouter, createWebHashHistory } from 'vue-router'
const Recommend = () => ('@/views/recommend' /* webpackChunkName:"recommend" */)
const TopList = () => ('@/views/top-list' /* webpackChunkName:"top-list" */)
const Search = () => ('@/views/search' /* webpackChunkName:"search" */)
const Singer = () => ('@/views/singer' /* webpackChunkName:"singer" */)
const SingerDetail = () => ('@/views/singer-detail' /* webpackChunkName:"singer-detail" */)
const Album = () => ('@/views/album' /* webpackChunkName:"album" */)
const UserCenter = () => ('@/views/user-center' /* webpackChunkName:"user-center" */)
const TopDetail = () => ('@/views/top-detail' /* webpackChunkName:"top-detail" */)

const routes = [{
  path: '/',
  redirect: 'recommend'
},
{
  path: '/recommend',
  component: Recommend,
  children: [
    {
      path: ':id',
      component: Album
    }
  ]
}, {
  path: '/singer',
  component: Singer,
  children: [
    {
      path: 'id',
      component: TopDetail
    }
  ]
}, {
  path: '/top-list',
  component: TopList
}, {
  path: '/search',
  component: Search,
  children: [
    {
      path: 'id',
      component: SingerDetail
    },
    {
      path: '/user',
      components: {
        user: UserCenter
      }
    }
  ]
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
