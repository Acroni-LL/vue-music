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
        <div class="bottom">
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
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
              <i class="icon-not-favorite"></i>
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
    ></audio>
  </div>
</template>

<script>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'player',
  setup () {
    const audioRef = ref(null)
    const songReady = ref(false)
    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)
    const playing = computed(() => store.state.playing)
    const playlist = computed(() => store.state.playlist)
    const playIcon = computed(() => {
      return playing.value ? 'icon-pause' : 'icon-play'
    })
    const currentIndex = computed(() => store.state.currentIndex)
    const disableCls = computed(() => {
      return songReady.value ? '' : 'disable'
    })
    watch(currentSong, (newSong) => {
      if (!newSong.id || !newSong.url) {
        return
      }
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
    }
    function ready () {
      if (!songReady.value) {
        return
      }
      songReady.value = true
    }
    function error () {
      songReady.value = true
    }
    return {
      playIcon,
      goBack,
      audioRef,
      fullScreen,
      currentSong,
      togglePlay,
      pause,
      prev,
      next,
      ready,
      disableCls,
      error
    }
  }
}
</script>

<style>
</style>
