<template>
  <div class="search-input">
    <i class="icon-search"></i>
    <input
      type="text"
      class="input-inner"
      v-model="query"
      placeholder="placeholder"
    >
    <i
      class="icon-dismiss"
      v-show="query"
      @click="clear"
    ></i>
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce'
export default {
  name: 'search-input',
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data () {
    return {
      qurey: this.modelValue
    }
  },
  created () {
    this.$watch('query', debounce(300, (newQuery) => {
      this.$emit('update:modelValue', newQuery.trim())
    }))
    this.$watch('modelValue', (newVal) => {
      this.query = newVal
    })
  },
  methods: {
    clear () {
      this.query = ''
    }
  }
}
</script>

<style>
</style>
