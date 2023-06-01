<template>
  <div v-editable="blok" :id="this.$vnode.key" class="grid grid-rows-plan-mobile lg:grid-rows-plan w-72 lg:w-48 xl:w-56" >
    <div class="inline-flex items-center justify-center gap-4 bg-gray-900 rounded-t-lg text-yellow">
      <h2 class="uppercase">
        {{ blok.name }}
      </h2>
      <div class="flex items-center justify-center w-8 h-8 text-gray-900 rounded-full bg-yellow">{{ `${blok.age_limit}+`
      }}</div>
    </div>
    <div v-for="item in features" :key="item._uid"
      class="inline-flex items-center justify-center px-2 py-1 bg-white text-sm text-center border-b-2 border-b-gray-900 border-x-2 border-x-gray-400 hyphens-auto">
      <div v-if="!isMobile">
        <font-awesome-icon v-if="item != ''" :icon="['fas', 'check']" class="text-3xl" />
        <span v-else class="text-6xl text-gray-300">×</span>
      </div>
      <div v-else>
        {{ item }}
      </div>
    </div>
    <div
      class="inline-flex flex-col items-center justify-center px-2 py-1 bg-white text-sm text-center border-b-2 border-b-gray-900 border-x-2 border-x-gray-400">
      <span class="text-xl font-bold">{{ blok.credits }} Credits</span>
      <span v-if="isMobile">{{ $t('creditsDescription') }}</span>
    </div>
    <div
      class="inline-flex items-center justify-center gap-2 px-2 text-gray-900 border-b-2 border-gray-900 rounded-b-lg bg-yellow border-x-2">
      <span class="text-2-xl">EUR</span>
      <h2 class="text-5xl leading-3 uppercase">
        {{ `${blok.price},-` }}
      </h2>
      <span class="text-2-xl">pro Monat</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok', 'strings', 'isMobile', 'comingSoon'],
  computed: {
    registerLink () {
      return '#'
    },
    features () {
      //construct an array from the object this.strings by looking up values in this.blok.features and returning an empty string if the value is not found
      if (this.isMobile) return this.blok.features
      return Object.values(this.strings).map((string) => {
        if (this.comingSoon.includes(string)) return 'Coming Soon'
        return this.blok.features.includes(string) ? string : ''
      })
    }
  },
  methods: {
    register () {
      this.$store.dispatch('setSidebar', 'register')
    }
  }
}
</script>
