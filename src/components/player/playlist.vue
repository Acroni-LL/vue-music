<template>
  <teleport to='body'>
    <transition name='list-fade'>
      <div
        class="playlist"
        v-show="visible && playlist.length"
        @click="hide"
      >
        <div
          class="list-wrapper"
          @click.stop
        >
          <div class="list-header">
            <h1 class="title">
              <i
                class="icon"
                :class="madeIcon"
                @click='changeMode'
              ></i>
              <span class="text">{{modeText}} </span>
              <span
                class="clear"
                @click="ShowConfirm"
              >
                <i class="icon-clear"></i>
              </span>
            </h1>
          </div>
          <scroll
            ref="scrollRef"
            class="list-content"
          >
            <transition-group
              ref="listRef"
              name='list'
              tag='ul'
            >
              <li
                v-for="song in sequenceList"
                :key="song.id"
                class="item"
                @click="selectItem(song)"
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
                <span
                  class="delete"
                  @click.stop="removeSong(song)"
                  :class="{'disable':removing}"
                >
                  <i class="icon-delete"></i>
                </span>
              </li>
            </transition-group>
          </scroll>
          <div class="list-add">
            <div
              class="add"
              @click="showAddSong"
            >
              <i class="icon-add"></i>
              <span class="text"></span>
            </div>
          </div>
          <div
            class="list-footer"
            @click.stop='hide'
          >
            <span>关闭</span>
          </div>
        </div>
        <confirm
          ref='confirmRef'
          text='是否清空列表'
          @click="confirmClear"
          confirm-btn-text='清空'
        >

        </confirm>
        <add-song ref="addSongRef"></add-song>
      </div>
    </transition>
  </teleport>
</template>

<script>
import Scroll from '@/components/babse/scroll/scroll'
import AddSong from '@/components/add-song/add-song'
import { ref, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import useMode from './use-mode'
import useFavorite from './use-favorite'
import confirm from '@/components/base/confirm/confirm'

export default {
  name: 'playlist',
  components: {
    Scroll,
    confirm,
    AddSong
  },
  setup () {
    const visible = ref(false)
    const scrollRef = ref(null)
    const removing = ref(false)
    const listRef = ref(null)
    const confirmRef = ref(null)
    const addSongRef = ref(null)

    const store = useStore()
    const playlist = computed(() => store.state.playlist)
    const sequenceList = computed(() => store.state.sequenceList)
    const currentSong = computed(() => store.getters.currentSong)
    const { modeIcon, changeMode, modeText, watch } = useMode()
    const { getFavoriteIcon, toggleFavorite } = useFavorite()

    watch(currentSong, async (newSong) => {
      if (!visible.value || newSong.id) {
        return
      }
      await nextTick()
      scrollToCurrent()
    })

    function getCurrentIcon (song) {
      if (song.id === currentSong.value.id) {
        return 'icon-play'
      }
    }

    function selectItem (song) {
      const index = playlist.value.findIndex((item) => {
        return song.id === item.id
      })
      store.commit('setCurrentIndex', index)
      store.commit('setPlayingState', true)
    }

    function hide () {
      visible.value = false
    }

    async function show () {
      visible.value = true
      await nextTick()
      refreshScroll()
      scrollToCurrent()
    }

    function refreshScroll () {
      scrollRef.value.scroll.refresh()
    }

    function scrollToCurrent () {
      const index = sequenceList.value.findIndex((song) => {
        return currentSong.value.id === song.id
      })
      if (index === -1) {
        return
      }
      const target = listRef.value.childreb[index]
      scrollRef.value.scroll.scrollToCurrent(target, 300)
    }

    function removeSong (song) {
      if (removing.value) {
        return
      }
      removing.value = true
      store.dispatch('removeSong', song)
      if (!playlist.value.length) {
        hide()
      }
      setTimeout(() => {
        removing.value = false
      }, 300)
    }

    function showConfirm () {
      confirmRef.value.show()
    }

    function confirmClear () {
      store.diapatch('clearSongList')
      hide()
    }

    function showAddSong () {
      addSongRef.value.show()
    }
    return {
      visible,
      removing,
      playlist,
      listRef,
      scrollRef,
      sequenceList,
      getCurrentIcon,
      show,
      hide,
      selectItem,
      showAddSong,
      removeSong,
      showConfirm,
      confirmClear,
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

<style >
</style>
