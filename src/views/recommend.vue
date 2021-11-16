<template>
  <div
    class="recommend"
    v-loading:[loadingText]='loading'
  >
    <scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <slider
              v-if="sliders.length"
              :sliders='sliders'
            ></slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1
            class="list-title"
            v-show="!loading"
          >热门歌曲推荐</h1>
          <ul>
            <li
              v-for="item in albums"
              class="item"
              :key="item.id"
              @click="selectItem(item)"
            >
              <div class="icon">
                <img
                  v-lazy="item.pic"
                  height="60"
                  width="60"
                >
                <div class="text">
                  <h2 class="name">
                    {{item.username}}
                  </h2>
                  <p class="title">
                    {{item.title}}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <router-view v-slot='{Component}'>
      <transition
        appear
        name="slide"
      >
        <conponents
          :is='Component'
          :data='selectedAlbum'
        />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getRecommend } from '@/service/recommend'
import Slider from '@/components/base/slider/slider'
import Scroll from '@/components/wrap-scroll'
import storage from 'good-storage'
import { ALBUM_KEY } from '@/assets/js/constant'

export default {
  name: 'recommend',
  components: { Slider, Scroll },
  data () {
    return {
      sliders: [],
      albums: [],
      loadingText: '正在载入...',
      selectAlbum: null
    }
  },
  computed: {
    loading () {
      return !this.slider.length && !this.albums.length
    }
  },
  async created () {
    const result = await getRecommend()
    console.log(result)
  },
  methods: {
    selectItem (album) {
      this.selectedAlbum = album
      this.cacheAlbum(album)
      this.$router.push({
        path: `/recommend/${album.id}`
      })
    },
    cacheAlbum (album) {
      storage.session.set(ALBUM_KEY, album)
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
