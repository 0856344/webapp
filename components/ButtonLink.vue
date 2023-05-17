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
      classes.push(`bg-${this.blok.color}`, `ring-${this.blok.color}-300`)
      if (this.blok.size === 'small') {
        classes.push('text-base', 'py-1', 'px-8', 'mt-1')
      } else if (this.blok.size === 'medium') {
        classes.push('text-lg', 'py-2', 'px-12', 'mt-2')
      } else if (this.blok.size === 'large') {
        classes.push('text-3xl', 'py-4', 'px-16', 'mt-4')
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
