<template>
  <div
    class="player"
    v-show="playlist.length"
  >
    <transition
      name='normal'
      @enter='enter'
      @after-enter='afterEnter'
      @leave='leave'
      @after-leave='afterLeave'
    >
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
          <div
            class="middle"
            @touchstart.prevent='onMiddleTouchStart'
            @touchmove.prevent='onMiddleTouchMove'
            @touchend.prevent='onMiddleTouchEnd'
          >
            <div
              class="midlle-l"
              :style="middleLStyle"
            >
              <div
                ref="cdWrapperRef"
                class="cd-wrapper"
              >
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
          <scroll
            class="middle-r"
            ref="lyricScrollRef"
            :style="middleRStyle"
          >
            <div class="lyric-wrapper">
              <div
                v-if="currentLyric"
                ref="lyricListRef"
              >
                <p
                  class="text"
                  :class="{'current':currentLineNum===index}"
                  v-for="(line,index) in currentLyric.lines"
                  :key="line.num"
                >
                  {{line.txt}}
                </p>
              </div>
              <div
                class="pure-music"
                v-show="pureMusicLyric"
              >
                <p>{{pureMusicLyric}} </p>
              </div>
            </div>
          </scroll>
          <div class="bottom">
            <span
              class="dot"
              :class="{'active':currentShow==='cd'}"
            ></span>
            <span
              class="dot"
              :class="{'active':currentShow==='lyric'}"
            ></span>
            <div class="
            progress-wrapper">
              <span class="time time-l">{{fromatTime(currentTime)}} </span>
              <div class="progress-bar-wrapper">
                <progress-bar
                  ref="barRef"
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
    </transition>
    <mini-player
      :progress='progress'
      :toggle-play='togglePlay'
    ></mini-player>
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
import { computed, watch, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useMode, changeMode } from './use-mode'
import useFavorite from './use-favorite'
import ProgressBar from './progress-bar'
import useLyric from './use-lyric'
import useAnimation from './use-animation'
import useMiddleInteractive from './use-middle-interactive'
import Scroll from '@/components/base/scroll/scroll'
import { formatTime } from '@/assets/js/util'
import { PLAY_MODE } from '@/assets/js/constant'
import useCd from './use-cd'
import MiniPlayer from './mini-player'

export default {
  name: 'player',
  components: {
    ProgressBar,
    Scroll,
    MiniPlayer
  },
  setup () {
    // data
    const audioRef = ref(null)
    const songReady = ref(false)
    const currentTime = ref(0)
    const barRef = ref(null)
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
    const { currentLyric, currentLineNum, playLyric, lyricScrollRef, lyricListRef, stopLyric, pureMusicLyric, playingLyric } = useLyric({ songReady, currentTime })
    const { currentShow, onMiddleTouchStart, onMiddleTouchEnd, onMiddleTouchMove, middleLStyle, middleRStyle } = useMiddleInteractive()
    const { cdWrapperRef, enter, sfterEnter, leave, afterLeave } = useAnimation()
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
      store.commit('setPlayingState', true)
    })
    watch(playing, (newPlaying) => {
      if (!songReady.value) {
        return
      }
      const audioEl = audioRef.value
      if (!newPlaying) {
        audioEl.play()
        playLyric()
      } else {
        audioEl.pause()
        stopLyric()
      }
    })
    watch(fullScreen, async (newFullScreen) => {
      if (newFullScreen) {
        await nextTick()
        barRef.value.setOffset(progress.value)
      }
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
      playLyric()
      stopLyric()
    }
    function onProgressChanged (progress) {
      progressChanging = false
      audioRef.value.currentTime = currentTime.value = currentSong.value.duration * progress
      if (!playing.value) {
        store.commit('setPlayingState', true)
      }
      playLyric()
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
      barRef,
      progress,
      playlist,
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
      currentLineNum,
      lyricScrollRef,
      playingLyric,
      lyricListRef,
      pureMusicLyric,
      // middle-interactive
      currentShow,
      onMiddleTouchStart,
      onMiddleTouchEnd,
      onMiddleTouchMove,
      middleLStyle,
      middleRStyle,
      // animation
      cdWrapperRef,
      enter,
      sfterEnter,
      leave,
      afterLeave
    }
  }
}
</script>

<style lang="scss" scoped>
.playing {
  animation: rotate 20s linear infinite;
}
</style>
