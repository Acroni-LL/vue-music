import { createRouter, createWebHashHistory } from 'vue-router'
import Recommend from '@/views/recommend'
import TopList from '@/views/top-list'
import Search from '@/views/search'
import Singer from '@/views/singer'
import SingerDetail from '@/views/SingerDetail'
import Album from '@/views/album'
import UserCenter from '@/view/user-center'

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
      component: SingerDetail
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
      component: UserCenter
    }
  ]
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
