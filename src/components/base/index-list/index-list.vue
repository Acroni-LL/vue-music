<template>
  <scroll
    class="index-list"
    :probeType='3'
    @scroll='onScroll'
    ref="scrollRef"
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
            @click="onItemClick(item)"
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
      <div
        class="shortcut"
        @touchstart.stop.prevent='onShortcutTouchStart'
        @touchmove.stop.prevent='onShortcutTouchMove'
        @touchend.stop.prevent
      >
        <ul>
          <li
            v-for="(item,index) in shortcutList"
            :key="item"
            class="item"
            :class="{'current':currentIndex===index}"
            :data-index='index'
          >
          </li>
        </ul>
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/components/base/scrpll/scrpll'
import useShortcut from './use-shortcut'
import useFixed from './use-fixed'
export default {
  name: 'index-list',
  components: { Scroll },
  emits: ['select'],
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props, { emit }) {
    const { groupRef, onScroll, fixedTitle, fixedStyle, currentIndex } = useFixed(props)
    const { shortcutList, onShortcutTouchStart, scrollRef, onShortcutTouchMove } = useShortcut(props, groupRef)
    function onItemClick (item) {
      emit(('select', item))
    }
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(0)
    return {
      onItemClick,
      groupRef,
      onScroll,
      fixedTitle,
      fixedStyle,
      shortcutList,
      currentIndex,
      onShortcutTouchStart,
      scrollRef,
      onShortcutTouchMove
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
