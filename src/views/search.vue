<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model='query'></search-input>
    </div>
    <div
      class="search-content"
      v-show="!query"
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
    </div>
    <div class="search-result">
      <suggest :query='query'></suggest>
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/search/search-input'
import Suggest from '@/components/search/suggest'
import { ref } from 'vue'
import { getHotKeys } from '@/service/search'

export default {
  name: 'search',
  components: {
    SearchInput,
    Suggest
  },
  setup () {
    const query = ref('')
    const hotKeys = ref([])
    getHotKeys().then((result) => {
      hotKeys.value = result.hotKeys
    })
    function addQuery (s) {
      query.value = s
    }

    return {
      query,
      hotKeys,
      addQuery
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
