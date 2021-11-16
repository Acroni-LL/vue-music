<template>
  <div class="album">
    <music-list
      :song='songs'
      :title='title'
      :pic='pic'
      :loading='loading'
    >
    </music-list>
  </div>
</template>

<script>
import createDetailComponent from '@/assets/js/create-detail-component'
import { getAlbum } from '@/service/recommend'
import { ALBUM_KEY } from '@/assets/js/constant'

export default createDetailComponent('album', ALBUM_KEY, getAlbum)
</script>

<style>
</style>
