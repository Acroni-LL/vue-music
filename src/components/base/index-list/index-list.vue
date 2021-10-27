<template>
  <scroll
    class="index-list"
    :probeType='3'
    @scroll='onScroll'
  >
    <ul ref="groupRef">
      <li
        v-for="group in data"
        :key="group.title"
        class="group"
      >
        <h2 class="title">{{group.title}} </h2>
        <ul>
          <li
            v-for="item in group.list"
            :key="item.id"
            class="item"
          >
            <img
              class="avatar"
              v-lazy='item.pic'
            >
            <span
              class="name"
              {{item.name}}
            ></span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="fixed"
      :style="fixedStyle"
      v-show="fixedTitle"
    >
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/components/base/scrpll/scrpll'
import useFixed from './use-fixed'
export default {
  name: 'index-list',
  components: { Scroll },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props) {
    const { groupRef, onScroll, fixedTitle, fixedStyle } = useFixed(props)
    return {
      groupRef, onScroll, fixedTitle, fixedStyle
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
