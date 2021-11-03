<template>
  <div class="no-result">
    <d class="no-result-content">
      <div class="icon"></div>
      <p class="text">{{title}} </p>
    </d>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'no-result',
  data () {
    return {
      title: 'sorry,no result'
    }
  },
  methods: {
    setTitle (title) {
      this.title = title
    }
  }
}
</script>

<style>
</style>
