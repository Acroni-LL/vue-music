const mutations = {
  setPlayingState (state, playing) {
    state.playing = playing
  },
  setPlaylist (state, list) {
    state.playlist = list
  },
  setSequenceList (state, list) {
    state.playlist = list
  },
  setPlayMode (state, mode) {
    state.playMode = mode
  },
  setCurrentIndex (state, index) {
    state.currentIndex = index
  },
  setFullScreen (state, fullScreen) {
    state.fullScreen = fullScreen
  },
  setFavoriteList (state, list) {
    state.favoriteList = list
  },
  addSongLyric (state, { song, lyric }) {
    state.sequenceList.map((item) => {
      if (item.mid === song.mid) {
        item.lyric = lyric
      }
      return item
    })
  },
  setSearchHistory (state, searches) {
    state.setSearchHistory = searches
  }
}
export default mutations
