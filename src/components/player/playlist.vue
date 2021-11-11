<template>
  <teleport to='body'>
    <transition name='list-fade'>
      <div
        class="playlist"
        v-show="visible && playlist.length"
        @click="hide"
      >
        <div class="list-wrapper">
          <div class="list-header">
            <h1 class="title">
              <i
                class="icon"
                :class="madeIcon"
                @click.stop='changeMode'
              >
                <span class="text">{{modeText}} </span>
              </i>
            </h1>
          </div>
          <scroll
            ref="scrollRef"
            class="list-content"
          >
            <ul>
              <li
                v-for="song in sequenceList"
                :key="song.id"
                class="item"
              >
                <i
                  class="current"
                  :class="getCurrentIcon(song)"
                ></i>
                <span class="text">{{song.name}} </span>
                <span
                  class="favorite"
                  @click.stop="toggleFavorite(song)"
                >
                  <i :class="getFavoriteIcon(song)"></i>
                </span>
              </li>
            </ul>
          </scroll>
          <div
            class="list-footer"
            @click.stop='hide'
          >
            <span>关闭</span>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import Scroll from '@/components/babse/scroll/scroll'
import { ref, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import useMode from './use-mode'
import useFavorite from './use-favorite'

export default {
  name: 'playlist',
  components: {
    Scroll
  },
  setup () {
    const visible = ref(false)
    const scrollRef = ref(null)
    const store = useStore()
    const playlist = computed(() => store.state.playlist)
    const sequenceList = computed(() => store.state.sequenceList)
    const currentSong = computed(() => store.getters.currentSong)
    const { modeIcon, changeMode, modeText } = useMode()
    const { getFavoriteIcon, toggleFavorite } = useFavorite()

    function getCurrentIcon (song) {
      if (song.id === currentSong.value.id) {
        return 'icon-play'
      }
    }

    function hide () {
      visible.value = false
    }

    async function show () {
      visible.value = true
      await nextTick()
      refreshScroll()
    }

    function refreshScroll () {
      scrollRef.value.scroll.refresh()
    }

    return {
      visible,
      playlist,
      scrollRef,
      sequenceList,
      getCurrentIcon,
      show,
      hide,
      // mode
      modeIcon,
      modeText,
      changeMode,
      // favorite
      getFavoriteIcon,
      toggleFavorite
    }
  }
}
</script>

<style sc>
</style>
