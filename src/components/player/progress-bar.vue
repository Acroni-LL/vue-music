<template>
  <div
    class="progress-bar"
    @click="onClick"
  >
    <div class="bar-inner">
      <div
        class="progress"
        ref="progress"
        :style='progressStyle'
      ></div>
      <div class="progress-btn-wrapper">
        <div
          class="progress-btn"
          :style="btnStyle"
          @touchstart.prevent='onTouchStart'
          @touchmove.prevent='onTouchMove'
          @touchend.prevent='onTouchEnd'
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 16
export default {
  name: 'progress-bar',
  emits: ['progress-changing', 'progress-changed'],
  props: {
    prodress: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      offset: 0
    }
  },
  computed: {
    progressStyle () {
      return `width:${this.offset}px`
    },
    btnStyle () {
      return `transform:translate3d(${this.offset}px,0,0)`
    }
  },
  watch: {
    progress (newProgress) {
      const barWidth = this.$el.clientWidth - progressBtnWidth
      this.offset = barWidth * newProgress
    }
  },
  created () {
    this.touch = []
  },
  methods: {
    onTouchStart (e) {
      this.touch.x1 = e.touches[0].pageX
      this.touch.beginWidth = this.$refs.progress.clientWidth
    },
    onTouchMove (e) {
      const delta = e.touches[0].pageX - this.touch.x1
      const tempWidth = this.touch.beginWidth + delta
      const barWidth = this.$el.clientWidth - progressBtnWidth
      const progress = Math.min(1, Math.max(tempWidth / barWidth, 0))
      this.offset = barWidth * progress
      this.$emit('progress-changing', progress)
    },
    onTouchEnd () {
      const barWidth = this.$el.clientWidth - progressBtnWidth
      const progress = this.$refs.progress.clientWidth / barWidth
      this.$emit('progress-changed', progress)
    },
    onCLick (e) {
      const rect = this.$el.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      const barWidth = this.$el.clientWidth - progressBtnWidth
      const progress = offsetWidth / barWidth
      this.$emit('progress-changed', progress)
    }
  }
}
</script>

<style>
</style>
