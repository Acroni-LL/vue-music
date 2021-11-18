<template>
  <ul class="switches">
    <li
      class="switch-item"
      v-for="(item,index) in items"
      :key="item"
      :class="{'active':modleValue===index}"
      @click="switchItem(index)"
    >
      <span>{{item}} </span>
    </li>
    <div
      class="action-bar"
      :style="activeStyle"
    ></div>
  </ul>
</template>

<script>
export default {
  name: 'switches',
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },
    modelValue: {
      type: Number,
      default: 0
    }
  },
  computed: {
    activeStyle () {
      const x = 120 * this.modelValue
      return {
        transform: `translate3d(${x}px,0,0)`
      }
    }
  },
  methods: {
    switchItem (index) {
      this.$emit('update:modelValue', index)
    }
  }
}
</script>

<style>
</style>
