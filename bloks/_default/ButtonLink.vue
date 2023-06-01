<template>
  <div class="flex justify-center w-full"
    v-if="(!blok.conditional || blok.conditional && blok.condition === 'authenticated' && !!this.$store.state.auth || blok.conditional && blok.condition == 'notAuthenticated' && !(!!this.$store.state.auth))">
    <div class="max-w-prose w-2/3 flex-col px-2 pb-2 lg:pb-0 bg-white rounded-xl" :class="[{ 'flex gap-2 lg:gap-8': hasProse }, {'lg:flex-row' : !hasTextAbove}]">
      <div v-if="hasProse" class="basis-1/2" :class="[{'lg:order-last':hasTextRight}]">
        <h2  v-if="hasHeader">{{ blok.prose_header }}</h2>
        <div v-html=" $transformRichText(blok.prose_text) "></div>
      </div>
      <div class="flex items-center justify-center basis-1/2">
        <button
          class="mx-2 text-white rounded-sm justify-self-center ring-2 cursor:pointer max-w-max hover:bg-gray-900 hover:ring-gray-300"
          v-bind:class=" buildClassString" v-on:click="route(blok.url)">
          {{ blok.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  //:class="[{ 'flex w-full justify-center': !hasProse && !hasHeader }, { 'grid grid-cols-2 mx': hasProse }]

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
    },
    hasHeader () {
      return !!this.blok.prose_header
    },
    hasTextRight () {
      return this.blok.layout === 'text_right'
    },
    hasTextAbove () {
      return this.blok.layout === 'text_top'
    }
  },
  methods: {
    route (target) {
      this.$router.push(target)
    }
  }
}
</script>
