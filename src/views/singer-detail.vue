<template>
  <div class="singer-detail">
    <music-list
      :songs='songs'
      :title="title"
      :pic='pic'
      :loading='loading'
    ></music-list>
  </div>
</template>

<script>
import createDetailComponent from '@/assets/js/create-detail-components'
import { getSingerDetail } from '@/service/singer'
import { SINGER_KEY } from '@/assets/js/constant'
export default createDetailComponent('singer-detail', SINGER_KEY, getSingerDetail)
</script>

<style>
</style>
