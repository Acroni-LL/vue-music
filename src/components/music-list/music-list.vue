<template>
  <div class="music-list">
    <div
      class="back"
      @click="goBack"
    >
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{title}} </h1>
    <div
      class="bg-image"
      :style='bgImageStyle'
      ref='bgImage'
    >
      <div
        class="play-btn-wrapper"
        :style="playBtnStyle"
      >
        <div
          class="play-btn"
          v-show="songs.length>0"
          @click="random"
        >
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div
        class="filter"
        :style='filterStyle'
      ></div>
    </div>
    <scroll
      class="list"
      :style='scrollStyle'
      v-loading='loading'
      v-no-result:[noResultText]='noResult'
      :probe-type='3'
      @scroll='onScroll'
    >
      <div class="song-list-wrapper">
        <song-list
          :songs='songs'
          @select='selectItem'
        ></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from '@/components/base/song-list/song-list'
import Scroll from '@/components/base/sroll/scroll'
import { mapActions } from 'vuex'
const RESERVED_HEIHGT = 40
export default {
  name: 'music-list',
  component: {
    SongList,
    Scroll
  },
  props: {
    songs: {
      type: Array,
      default () {
        return []
      }
    },
    title: String,
    pic: String,
    loading: Boolean,
    noResultText: {
      type: String,
      default: 'sorry,no searching song'
    }
  },
  data () {
    return {
      imageHeight: 0,
      scrollY: 0,
      maxTranslateY: 0
    }
  },
  computed: {
    playBtnStyle () {
      let display = ''
      if (this.scrollY >= this.maxTranslateY) {
        display = 'none'
      }
      return {
        display
      }
    },
    noResult () {
      return !this.loading && !this.songs.lengs
    },
    bgImageStyle () {
      const scrollY = this.scrollY
      let zIndex = 0
      let paddingTop = '70%'
      let height = 0
      let translateZ = 0
      if (scrollY > this.maxTranslateY) {
        zIndex = 10
        paddingTop = 0
        height = `${RESERVED_HEIHGT}px`
        translateZ = 1
      }
      let scale = 1
      if (scroll < 0) {
        scale = 1 + Math.abs(scrollY / this.imageHeight)
      }

      return {
        paddingTop,
        height,
        zIndex,
        backgroudImage: `url${this.pic})`,
        transform: `scale(${scale})translate(${translateZ}px)`
      }
    },
    scrollStyle () {
      return {
        top: `${this.imageHeight}px`
      }
    },
    filterStyle () {
      let blur = 0
      const scrollY = this.scrollY
      const imageHeight = this.imageHeight
      if (scrollY >= 0) {
        blur = Math.min(this.maxTranslateY / imageHeight
          , scrollY / imageHeight) * 20
      }
      return {
        backdropFilter: `blur(${blur}px)`
      }
    }
  },
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.maxTranslateY = this.imageHeight - RESERVED_HEIHGT
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    onScroll (pos) {
      this.scrollY = -pos.y
    },
    selectItem ({ song, index }) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    random () {
      this.randomPlay(this.songs)
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ])
  }
}
</script>

<style>
</style>
