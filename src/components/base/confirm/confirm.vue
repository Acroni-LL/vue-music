<template>
  <teleport to='body'>
    <transition name="confirm-fade">
      <div
        class="confirm"
        v-show="visible"
      >
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <p class="text">{{text}} </p>
            <div class="operate">
              <div
                class="operate-btn  left"
                @click="confirm"
              >{{confirmBtnText}} </div>
              <div
                class="operate-btn"
                @click="cancel"
              >{{cancelBtnText}} </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'confirm',
  props: {
    text: {
      type: String,
      default: ''
    },
    cofirmBnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  data () {
    return {
      visible: false
    }
  },
  emits: ['confirm', 'cancel'],
  methods: {
    confirm () {
      this.hide()
      this.$emits('confirm')
    },
    cancel () {
      this.hide()
      this.$emit('cancel')
    },
    hide () {
      this.visible = false
    },
    show () {
      this.visible = true
    }
  }
}
</script>

<style>
</style>
