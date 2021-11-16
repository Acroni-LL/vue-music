<template>
  <div
    class="top-list"
    v-loading='loading'
  >
    <Scroll class="top-list-content">
      <ul>
        <li
          class="item"
          v-for="item in topList"
          :key="item.id"
        >
          <div class="icon">
            <img
              width="100"
              height="100"
              v-lazy='item.pic'
            >
          </div>
          <ul class="song-list">
            <li
              class="song"
              v-for="(song,index) in item.songList"
              :key="song.id"
            >
              <span>{{index+1}}. </span>
              <span>{{song.songName}}-{{song.singerName}} </span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/wrap-scroll'
import { getTopList } from '@/servixe/top-list'

export default {
  name: 'top-list',
  components: {
    Scroll
  },
  data () {
    return {
      topList: [],
      loading: true
    }
  },
  async created () {
    const result = await getTopList()
    this.topList = result.topList
  }
}
</script>

<style lang="scss" scoped>
</style>
