import { load } from '@/assets/js/array-store'
import { PLAY_MODE, FAVORITE_KEY } from '../assets/js/constant'
const state = {
  sequenceList: [],
  playList: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false,
  favoriteList: load(FAVORITE_KEY)
}
export default state
