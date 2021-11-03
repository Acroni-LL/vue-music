<template>
  <ul class="song-list">
    <li
      class="item"
      v-for="song in songs"
      :key="song.id"
      @click="selectItem(song)"
    >
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
    }
  }
}
</script>

<style>
</style>
