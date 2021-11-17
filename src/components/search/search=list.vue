<template>
  <div class="search-lsit">
    <transition-group
      name="list"
      tag="ul"
    >
      <li
        class="search-item"
        v-for="item in searches"
        :key="item"
      >
        <span class="text">{{item}} </span>
        <span class="icon">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'search-list',
  props: {
    searches: {
      ype: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
</style>
