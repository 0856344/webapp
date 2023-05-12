<template>
  <div v-editable="blok" class="grid grid-rows-plan md:h-screen w-72 md:w-48 snap-start shrink-0 mr-12 md:mr-0" >
    <div class="bg-gray-900 rounded-t-lg text-yellow inline-flex justify-center items-center gap-4 w-">
      <h2 class="uppercase">
        {{ blok.name }}
      </h2>
      <div class="bg-yellow rounded-full w-8 h-8 text-gray-900 flex items-center justify-center">{{ `${blok.age_limit}+`
      }}</div>
    </div>
    <div v-for="item in paddedFeatures" :key="item._uid"
      class="px-2 py-1 text-sm text-center inline-flex justify-center items-center border-b-2 border-b-gray-900 border-x-2 border-x-gray-400 hyphens-auto">
      <div v-if="!isMobile">
        <font-awesome-icon v-if="item != ''" :icon="['fas', 'check']" class="text-3xl" />
        <span v-else class="text-6xl">×</span>
      </div>
      <div v-else>
        {{ item }}
      </div>
    </div>
    <div
      class="px-2 py-1 text-sm text-center inline-flex flex-col justify-center items-center border-b-2 border-b-gray-900 border-x-2 border-x-gray-400 hyphens-auto">
      <span class="text-xl font-bold">{{ blok.credits }} Credits</span>
      <span v-if="isMobile">{{ $t('creditsDescription') }}</span>
    </div>
    <div
      class="px-2 rounded-b-lg bg-yellow border-b-2 border-x-2 border-gray-900 text-gray-900 inline-flex items-center justify-center gap-2">
      <span class="text-2-xl">EUR</span>
      <h2 class="uppercase text-5xl leading-3">
        {{ `${blok.price},-` }}
      </h2>
      <span class="text-2-xl">pro Monat</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok', 'strings', 'isMobile'],
  computed: {
    registerLink () {
      return '#'
    },
    paddedFeatures () {
      //construct an array from the object this.strings by looking up values in this.blok.features and returning an empty string if the value is not found

      return Object.values(this.strings).map((string) => {
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
