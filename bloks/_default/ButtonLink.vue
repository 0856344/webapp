<template>
  <div
    v-if="(!blok.conditional || blok.conditional && blok.condition === 'authenticated' && !!this.$store.state.auth || blok.conditional && blok.condition == 'notAuthenticated' && !(!!this.$store.state.auth))">
    <div class="w-2/3"
      :class="[{ 'flex w-full justify-center': !hasProse && !hasHeader }, { 'grid grid-cols-2 mx': hasProse }]">
      <div v-if="hasProse" class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        <h2>{{ blok.prose_header }}</h2>
        <div v-html="$transformRichText(blok.prose_text)"></div>
      </div>
      <div class="flex items-center justify-center">
        <button
          class="text-white mx-2 justify-self-center rounded-sm ring-2 cursor:pointer max-w-max hover:bg-gray-900 hover:ring-gray-300"
          v-bind:class="buildClassString" v-on:click="route(blok.url)">
          {{ blok.text }}
        </button>
      </div>
    </div>
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
    },
    hasProse () {
      return !!this.blok.prose_text
    }
  },
  methods: {
    route (target) {
      this.$router.push(target)
    }
  }
}
</script>
