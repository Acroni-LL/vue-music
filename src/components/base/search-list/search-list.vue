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
        @click="selectItem(item)"
      >
        <span class="text">{{item}} </span>
        <span
          v-if="showDelete"
          class="icon"
          @click.stop="deleteItem(item)"
        >
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
    },
    showDelete: {
      true: Boolean,
      default: true
    }
  },
  emits: [
    'select', 'delete'
  ],
  methosd: {
    seleteItem (item) {
      this.$emit('select', item)
    },
    deleteItem (item) {
      this.$emit('delete', item)
    }
  }
}
</script>

<style>
</style>
