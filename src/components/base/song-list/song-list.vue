<template>
  <ul class="song-list">
    <li
      class="item"
      v-for="(song, index) in songs"
      :key="song.id"
      @click="selectItem(song,index)"
    >
      <div
        class="rank"
        v-if="rank"
      >
        <span :class="getRankCls(index)">{{getRankText(index)}}</span>
      </div>
      <div class="content">
        <h2 class="name">{{song.name}} </h2>
        <p class="desc">{{getDesc(song)}} </p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'song-list',
  props: {
    songs: {
      type: Array,
      default () {
        return []
      }
    },
    rank: Boolean
  },
  emits: ['select'],
  method: {
    selectItem (song, index) {
      this.emits('select', { song, index })
    },
    getDesc (song) {
      return `${song.singer} ${song.album}`
    },
    getRankCls (index) {
      if (index <= 2) {
        return `icon icon${index}`
      } else {
        return 'text'
      }
    },
    getRankText (index) {
      if (index > 2) {
        return index + 1
      }
    }
  }
}
</script>

<style>
</style>
