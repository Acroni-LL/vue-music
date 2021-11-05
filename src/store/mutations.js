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
  }
}
export default mutations
