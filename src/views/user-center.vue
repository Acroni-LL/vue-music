<template>
  <div
    class="user-center"
    v-no-result:[noResultText]='noResult'
  >
    <div
      class="back"
      @click='back'
    >
      <i class="icon-back"></i>
    </div>
    <div class="switches-wrapper">
      <switches
        :item="['我喜欢的','最近播放']"
        v-model="currentIndex"
      ></switches>
    </div>
    <div
      class="play-btn"
      v-if="currentList.length"
      @click="random"
    >
      <i class="icon-play"></i>
      <span class="text">随机播放全部</span>
    </div>
    <div class="list-wrapper">
      <scroll
        class="list-scroll"
        v-if="currentIndex===0"
      >
        <div class="list-inner">
          <song-list
            :songs='favoriteList'
            @select="selectSong"
          ></song-list>
        </div>
      </scroll>
      <scroll
        class="list-scroll"
        v-if="currentIndex===1"
      >
        <div class="list-inner">
          <song-list
            :songs='playHistory'
            @select="selectSong"
          ></song-list>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Switches from '@/components/base/switches/switches'
import Scroll from '@/components/base/scroll/scroll'
import SongList from '@/components/base/song-list/song-list'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'user-center',
  components: {
    Switches,
    Scroll,
    SongList
  },
  data () {
    return {
      CurrentIndex: 0
    }
  },
  computed: {
    noResult () {
      return this.currentIndex === 0 ? !this.favoriteList.length : !this.playHistory.length
    },
    noResultText () {
      return this.currentIndex === 0 ? '暂无收藏歌曲' : '你还没有听过歌曲'
    },
    currentList () {
      return this.currentIndex === 0 ? this.favoriteList : this.playHistory
    },
    ...mapState(
      ['favoriteList', 'playHistory']
    )
  },
  methods: {
    back () {
      this.$router.back()
    },
    selectSong ({ song }) {
      this.addSong(song)
    },
    random () {
      this.randomPlay(this.currentList)
    },
    ...mapActions([
      'addSong',
      'randomPlay'
    ])
  }
}
</script>

<style>
</style>
