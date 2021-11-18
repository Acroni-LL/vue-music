<template>
  <teleport to='body'>
    <transition name="slide">
      <div
        class="add-song"
        v-show="visible"
      >
        <div class="header">
          <h1 class="title">添加歌曲到列表</h1>
          <div class="close">
            <i class="icon-close"></i>
          </div>
        </div>
        <div class="search-input-wrapper">
          <search-input
            v-model="query"
            placeholder='搜索歌曲'
          ></search-input>
          <switches
            :items="['最近播放','搜索历史']"
            v-model="currentIndex"
          ></switches>
          <div class="list-wrapper">
            <scroll
              v-if="currentIndex===0"
              class="list-scroll"
              ref='scrollRef'
            >
              <div class="list-inner">
                <song-list
                  :songs='playHistory'
                  @select='selecSongBySongList'
                ></song-list>
              </div>
            </scroll>
            <scroll
              v-if="currentIndex===1"
              class="list-scroll"
            >
              <search-list
                :searches='searchHistory'
                :show-delete='false'
                @select="addQuery"
              ></search-list>
            </scroll>
          </div>
        </div>
        <div
          class="search-result"
          v-show="query"
        >
          <suggest
            :query='query'
            :show-singer='false'
            @select-song="selectSongBySuggest"
          ></suggest>
        </div>
        <message ref="messageRef">
          <div class="message-title">
            <i class="icon-ok"></i>
            <span class="text">1首歌曲已经添加到播放地址</span>
          </div>
        </message>
      </div>
    </transition>
  </teleport>
</template>

<script>
import Suggest from '../search/suggest.vue'
import SearchInput from '@/components/search/search-input'
import { ref, computed, nextTick, watch } from 'vue'
import Scroll from '../base/scroll/scroll.vue'
import SongList from '@/components/base/song-list/song-list'
import Switches from '@/components/base/switches/switches'
import Message from '@/components/base/message/message'
import { useStore } from 'vuex'
import useSearchHistory from '@/components/search/use-search-history'

export default {
  name: 'addSong',
  components: {
    Suggest,
    SearchInput,
    Scroll,
    SongList,
    Switches,
    Message
  },
  setup () {
    const visible = ref(false)
    const query = ref('')
    const currentIndex = ref(0)
    const scrollRef = ref(null)
    const messageRef = ref(null)

    const store = useStore()
    const searchHistory = computed(() => store.state.searchHistory)
    const playHistory = computed(() => store.state.playHistory)
    const { saveSearch } = useSearchHistory()

    async function show () {
      visible.value = true
      await nextTick()
      refreshScroll()
    }

    watch(query, async () => {
      await nextTick()
      refreshScroll()
    })

    function hide () {
      visible.value = false
    }
    function refreshScroll () {
      scrollRef.value.scroll.refresh()
    }
    function addQuery (s) {
      query.value = s
    }
    function selectSongBySongList ({ song }) {
      addSong(song)
    }
    function selectSongBySuggest (song) {
      addSong(song)
      saveSearch(query.value)
    }
    function addSong (song) {
      store.dispatch('addSong', song)
      showMessage()
    }
    function showMessage () {
      messageRef.value.show()
    }
    return {
      visible,
      query,
      show,
      hide,
      currentIndex,
      messageRef,
      searchHistory,
      playHistory,
      addQuery,
      selectSongBySongList,
      selectSongBySuggest
    }
  }
}
</script>

<style>
</style>
