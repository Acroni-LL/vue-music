<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model='query'></search-input>
    </div>
    <div>
      <scroll
        class="search-content"
        v-show="!query"
        ref="scrollRef"
      >
        <div class="hot-keys">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li
              class="item"
              v-for="item in hotKeys"
              :key="item.id"
              @click="addQuery(item.key)"
            >{{item.key}} </li>
          </ul>
        </div>
        <div
          class="search-history"
          v-show="searchHistory.length"
        >
          <h1 class="title">
            <span class="text">搜索历史</span>
          </h1>
          <search-list
            :searches='searchHistory'
            @select="addQuery"
            @delete='deleteSearch'
          ></search-list>
        </div>
      </scroll>
    </div>
    <div class="search-result">
      <suggest
        :query='query'
        @select-song="selectSong"
        @select-singer="selectSinger"
      ></suggest>
    </div>
    <router-view v-slot='{Component}'>
      <transition
        appear
        name='slide'
      >
        <component
          :is='Component'
          :data='selectSinger'
        />
      </transition>
    </router-view>
  </div>
</template>

<script>
import SearchInput from '@/components/search/search-input'
import Suggest from '@/components/search/suggest'
import SearchList from '@/components/base/search-list/search-list'
import Scroll from '@/components/wrap-scroll'
import { ref, computed, watch, nextTick } from 'vue'
import { getHotKeys } from '@/service/search'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
import useSearchHistory from '@/components/search/use-search-history'

export default {
  name: 'search',
  components: {
    SearchInput,
    Suggest,
    SearchList,
    Scroll
  },
  setup () {
    const query = ref('')
    const hotKeys = ref([])
    const selectedSinger = ref(null)
    const scrollRef = ref(null)

    const store = useStore()
    const searchHistory = computed(() => store.state.searchHistory)

    const router = useRouter()

    const { saveSearch, deleteSearch } = useSearchHistory()

    getHotKeys().then((result) => {
      hotKeys.value = result.hotKeys
    })

    watch(query, async (newQuery) => {
      if (!newQuery) {
        await nextTick()
        refreshScroll()
      }
    })

    function refreshScroll () {
      scrollRef.value.scroll.refresh()
    }

    function addQuery (s) {
      query.value = s
    }

    function selectSong (song) {
      saveSearch(query.value)
      store.dispatch('addSong', song)
    }

    function selectSinger (singer) {
      saveSearch(query.value)
      selectedSinger.value = singer
      cacheSinger()

      router.push({
        path: `/ search/ ${singer.mid}`
      })
    }
    function cacheSinger (singer) {
      storage.session.set(SINGER_KEY, singer)
    }

    return {
      scrollRef,
      query,
      hotKeys,
      addQuery,
      selectedSinger,
      selectSong,
      selectSinger,
      searchHistory,
      // searchHistory
      deleteSearch
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
