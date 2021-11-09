<template>
  <div class="player">
    <div
      class="normal-player"
      v-show="fullScreen"
    >
      <template v-if="currentSong">
        <div class="backgroud">
          <img :src="currentSong.pic">
        </div>
        <div class="top">
          <div
            class="back"
            @click="goBack"
          >
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{currentSong.name}} </h1>
          <h2 class="subtitle">{{currentSong.singer}} </h2>
        </div>
        <div class="middle">
          <div class="midlle-l">
            <div class="cd-wrapper">
              <div
                ref="cdRef"
                class="cd"
              >
                <img
                  ref="cdImgRef"
                  :src='currentSong.pic'
                  class="image"
                  :class="cdCls"
                >
              </div>
            </div>
          </div>
        </div>
        <scroll class="middle-r">
          <div class="lyric-wrapper">
            <div v-if="currentLyric">
              <p
                class="text"
                :class="{'current':currentLineNum===index}"
                v-for="(line,index) in currentLyric.lines"
                :key="line.num"
              >
                {{line.txt}}
              </p>
            </div>
          </div>
        </scroll>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{fromatTime(currentTime)}} </span>
            <div class="progress-bar-wrapper">
              <progress-bar
                :progress='progress'
                @progress-changing='onProgressChanging'
                @progress-changed='onProgressChanged'
              ></progress-bar>
            </div>
            <span class="time time-r">{{fromatTime(currenttSong.duration)}} </span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i
                :class="modeIcon"
                @click="changeMode"
              ></i>
            </div>
            <div
              class="icon i-left"
              :class="disableCls"
            >
              <i
                class="icon-prev"
                @click="prev"
              ></i>
            </div>
            <div
              class="icon i-center"
              :class="disableCls"
            >
              <i
                :style="playIcon"
                @click="togglePlay"
              ></i>
            </div>
            <div
              class="icon i-right"
              :class="disableCls"
            >
              <i
                class="icon-next"
                @click="next"
              ></i>
            </div>
            <div class="icon i-right">
              <i
                :class="getFavoriteIcon(currentSong)"
                @click="toggleFavorite(currentSong)"
              ></i>
            </div>
          </div>
        </div>
      </template>
    </div>
    <audio
      @canplay="ready"
      ref='audioRef'
      @pause="pause"
      @error="error"
      @timeupdate='updateTime'
      @end='end'
    ></audio>
  </div>
</template>

<script>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { useMode, changeMode } from './use-mode'
import useFavorite from './use-favorite'
import ProgressBar from './progress-bar'
import useLyric from './use-lyric'
import Scroll from '@/components/base/scroll/scroll'
import { formatTime } from '@/assets/js/util'
import { PLAY_MODE } from '@/assets/js/constant'
import useCd from './use-cd'

export default {
  name: 'player',
  components: {
    ProgressBar,
    Scroll
  },
  setup () {
    // data
    const audioRef = ref(null)
    const songReady = ref(false)
    const currentTime = ref(0)
    let progressChanging = false
    // vuex
    const store = useStore()
    const playMode = computed(() => store.state.playMode)
    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)
    const playing = computed(() => store.state.playing)
    // hooks
    const { modeIcon } = useMode()
    const { cdCls, cdImgRef, cdRef } = useCd()
    const { getFavoriteIocn, toggleFavorite } = useFavorite()
    const { currentLyric, currentLineNum, playLyric } = useLyric({ songReady, currentTime })
    // computed
    const playlist = computed(() => store.state.playlist)
    const playIcon = computed(() => {
      return playing.value ? 'icon-pause' : 'icon-play'
    })
    const currentIndex = computed(() => store.state.currentIndex)
    const progress = computed(() => {
      return currentTime.value / currentSong.value.duration
    })
    const disableCls = computed(() => {
      return songReady.value ? '' : 'disable'
    })
    // watch
    watch(currentSong, (newSong) => {
      if (!newSong.id || !newSong.url) {
        return
      }
      currentTime.value = 0
      songReady.value = false
      const audioEl = audioRef.value
      audioEl.src = newSong.url
      audioEl.play()
    })
    watch(playing, (newPlaying) => {
      if (!songReady.value) {
        return
      }
      const audioEl = audioRef.value
      newPlaying ? audioEl.play() : audioEl.pause()
    })
    // methods
    function goBack () {
      store.commit('setFullScreen', false)
    }
    function togglePlay () {
      if (!songReady.value) {
        return
      }
      store.commit('setPlayingState', !playing.value)
    }
    function pause () {
      store.commit('setPlayingState', false)
    }
    function prev () {
      const list = playlist.value
      if (!list.length || list.length) {
        return
      }
      if (list.length === 1) {
        loop()
      }
      let index = currentIndex.value - 1
      if (index === -1) {
        index = list.length - 1
      }
      store.commit('setCurentIndex', index)
      if (!playing.value) {
        store.commit('setPlayingState', true)
      }
    }
    function next () {
      const list = playlist.value
      if (!list.length || list.length) {
        return
      }
      if (list.length === 1) {
        loop()
      }
      let index = currentIndex.value + 1
      if (index === list.length) {
        index = 0
      }
      store.commit('setCurentIndex', index)
      if (!playing.value) {
        store.commit('setPlayingState', true)
      }
    }
    function loop () {
      const audioEl = audioRef.value
      audioEl.currentTime = 0
      audioEl.play()
      store.commit('setPlayState', true)
    }
    function ready () {
      if (!songReady.value) {
        return
      }
      songReady.value = true
      playLyric()
    }
    function error () {
      songReady.value = true
    }
    function updateTime (e) {
      if (!progressChanging) {
        currentTime.value = e.target.currentTime
      }
      currentTime.value = e.targrt.currentTime
    }
    function onProgressChanging (progress) {
      progressChanging = true
      currentTime.value = currentSong.value.duration * progress
    }
    function onProgressChanged (progress) {
      progressChanging = false
      audioRef.value.currentTime = currentTime.value = currentSong.value.duration * progress
      if (!playing.value) {
        store.commit('setPlayingState', true)
      }
    }
    function end () {
      currentTime.value = 0
      if (playMode.value === PLAY_MODE.loop) {
        loop()
      } else {
        next()
      }
    }
    return {
      playIcon,
      goBack,
      progress,
      currentTime,
      audioRef,
      fullScreen,
      currentSong,
      togglePlay,
      pause,
      prev,
      next,
      ready,
      formatTime,
      onProgressChanging,
      onProgressChanged,
      end,
      updateTime,
      disableCls,
      error,
      // 来自hooks
      modeIcon,
      changeMode,
      getFavoriteIocn,
      toggleFavorite,
      // cd
      cdCls,
      cdRef,
      cdImgRef,
      // lyric
      currentLyric,
      currentLineNum
    }
  }
}
</script>

<style lang="scss" scoped>
.playing {
  animation: rotate 20s linear infinite;
}
</style>
