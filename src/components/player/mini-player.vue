<template>
  <transition name="mini">
    <div
      class="mini-player"
      v-show="!fullScreen"
      @click="showNormalPlayer"
    >
      <div
        ref='sliderWrapperRef'
        class="cd-wrapper"
      >
        <div
          class="cd"
          ref='cdRef'
        >
          <img
            ref="cdImageRef"
            :src="currentSong.pic"
            :class="cdCls"
            width="40"
            height="40"
          >
        </div>
      </div>
      <div>
        <h2 class="name">{{currentSong.name}} </h2>
        <p class="desc">{{currentSong.singer}} </p>
      </div>
      <div class="control">
        <progress-circle :radius="32">
          <i
            @click.stop="togglePlay"
            class="icon-mini"
            :class="miniPlayIcon"
          ></i>
        </progress-circle>
      </div>
      <div
        class="control"
        @click.stop="showPlaylist"
      ></div>
      <Playlist ref="playlistRef"></Playlist>
    </div>
  </transition>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import useMiniSlider from './use-mini-slider'
import useCd from './use-cd'
import ProgressCircle from './progress-circle.vue'
import Playlist from './playlist'

export default {
  name: 'mini-player',
  components: {
    ProgressCircle,
    Playlist
  },
  props: {
    progress: {
      type: Number,
      default: 0
    },
    togglePlay: Function
  },
  setup () {
    const playlistRef = ref(null)
    const store = useStore()
    const { cdCls, cdRef, cdImageRef } = useCd()
    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)
    const playing = computed(() => store.state.playing)
    const playlist = computed(() => store.state.playlist)
    const { sliderWrapperRef } = useMiniSlider()

    const miniPlayIcon = computed(() => {
      return playing.value ? 'icon-pause-mini' : 'icon-play-mini'
    })

    function showNormalPlayer () {
      store.commit('setFullScreen', true)
    }

    function showPlaylist () {
      playlistRef.value.show()
    }

    return {
      fullScreen,
      currentSong,
      playlistRef,
      miniPlayIcon,
      playlist,
      showNormalPlayer,
      showPlaylist,
      // cd
      cdCls,
      cdRef,
      cdImageRef,
      // sliderWrapperRef
      sliderWrapperRef
    }
  }
}
</script>

<style>
</style>
