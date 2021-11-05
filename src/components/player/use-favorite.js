import { computed } from 'vue'
import { save } from '@/assets/js/array-store'
import { useStore } from 'vuex'
import { FAVORITE_KEY } from '../../assets/js/constant'

export default function useFavorite () {
  const store = useStore()
  const favoriteList = computed(() => store.state.favoriteList)

  function isFavorite (song) {
    return favoriteList.value.findIndex((item) => {
      return item.id === song.id
    }) > -1
  }

  function toggleFavorite (song) {
    let list
    if (isFavorite(song)) {
      // remove
    } else {
      // save
      save(song, FAVORITE_KEY, compare)
    }
    song.commit('setFavoriteList', list)
    function compare (item) {
      return item.id === song.id
    }
  }
  function getFavoriteIcon (song) {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }
}
