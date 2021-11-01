<template>
  <dir ref='rootRef'>
    <slot></slot>
  </dir>
</template>

<script>
import useScroll from './use-scroll'
import { ref } from 'vue'
export default {
  name: 'scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  emits: ['scroll'],
  setup (props, { emit }) {
    const rootRef = ref(null)
    const scroll = useScroll(rootRef, props, emit)
    useScroll(rootRef, props, emit)

    return {
      rootRef,
      scroll
    }
  }
}
</script>

<style>
</style>
