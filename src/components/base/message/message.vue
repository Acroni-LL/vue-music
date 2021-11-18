<template>
  <teleport to='body'>
    <transition name='slide-down'>
      <div
        class="message"
        v-show="visible"
        @click="hide"
      >
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'message',
  props: {
    delay: {
      type: Number,
      default: 2000
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    show () {
      this.visible = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.hide()
      }, this.delay)
    },
    hide () {
      this.visible.value = false
    }
  }
}
</script>

<style>
</style>
