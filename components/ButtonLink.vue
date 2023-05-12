<template>
  <div class="flex w-full justify-center">
    <button
        class="text-white mx-2 rounded-sm ring-2 cursor:pointer max-w-max hover:bg-gray-900 hover:ring-gray-300"
        v-bind:class="buildClassString"
        v-on:click="route(blok.url)">
        {{ blok.text }}
    </button>
  </div>
    </template>

<script>
export default {
  props: ['blok'],
  computed: {
    buildClassString () {
      const classes = []
      if (this.blok.color === 'orange') {
        classes.push('bg-orange', 'ring-orange-300')
      } else if (this.blok.color === 'blue') {
        classes.push('bg-blue', 'ring-blue-300')
      }
      if (this.blok.size === 'small') {
        classes.push('text-base', 'py-1', 'px-8', 'max-w-max')
      } else if (this.blok.size === 'medium') {
        classes.push('text-lg', 'py-2', 'px-12', 'max-w-max')
      } else if (this.blok.size === 'large') {
        classes.push('text-3xl', 'py-4', 'px-16', 'max-w-max')
      }
      return classes.join(' ')
    }
  },
  methods: {
    route (target) {
      this.$router.push(target)
    }
  }
}
</script>
