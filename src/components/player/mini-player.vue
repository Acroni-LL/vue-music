<template>
  <transition name="mini">
    <div
      class="mini-player"
      v-show="!fullScreen"
      @click="showNormalPlayer"
    >
      <div class="cd-wrapper">
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
    </div>
  </transition>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import useCd from './use-cd'
import ProgressCircle from './progress-circle.vue'

export default {
  name: 'mini-player',
  components: {
    ProgressCircle
  },
  props: {
    progress: {
      type: Number,
      default: 0
    },
    togglePlay: Function
  },
  setup () {
    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)
    const playing = computed(() => store.state.playing)
    const { cdCls, cdRef, cdImageRef } = useCd()

    const miniPlayIcon = computed(() => {
      return playing.value ? 'icon-pause-mini' : 'icon-play-mini'
    })

    function showNormalPlayer () {
      store.commit('setFullScreen', true)
    }
    return {
      fullScreen,
      currentSong,
      miniPlayIcon,
      showNormalPlayer,
      // cd
      cdCls,
      cdRef,
      cdImageRef
    }
  }
}
</script>

<style>
</style>
