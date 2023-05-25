<template>
  <div v-editable="blok">
  <div class="grid grid-cols-3 lg:grid-cols-[4em_repeat(3,_1fr)] rounded-lg border border-gray-900 max-w-prose" >
    <div class="lg:row-span-full lg:col-span-1 col-span-full inline-flex justify-center items-center lg:orientation-sideways lg:vertical-writing-rl bg-gray-900 text-yellow text-2xl uppercase">Add-Ons</div>
    <div class="border-r border-gray-900 text-sm lg:text-base grid-rows-[repeat(4,_3em)]">
      <div class="p-2">zusätzliche Credits</div>
      <div class="p-2">Lagerplatz Box</div>
      <div class="p-2">Lagerplatz Palette</div>
      <div class="p-2">technischer Host Support</div>
    </div>
    <div class="bg-yellow border-r border-gray-900 text-sm lg:text-base grid-rows-[repeat(4,_3em)]">
      <div class="p-2">{{ `EUR ${blok.extra_credits_price},- / ${blok.extra_credits_count} Credits` }}</div>
      <div class="p-2">{{ `EUR ${blok.box_price},- / Monat` }}</div>
      <div class="p-2">{{ `EUR ${blok.pallet_price},- / Monat` }}</div>
      <div class="p-2">{{ `EUR ${blok.support_price},- / ${blok.support_unit} Minuten` }}</div>
    </div>
    <div class=" text-sm lg:text-base grid-rows-[repeat(4,_3em)]">
      <div class="p-2">{{ `(${((blok.extra_credits_price / blok.extra_credits_count)*100).toFixed(0)} Cent / Credit)` }}</div>
      <div class="p-2">{{ `(${blok.box_dimensions})` }}</div>
      <div class="p-2">{{ `(${blok.pallet_dimensions})` }}</div>
      <div class="p-2">{{ `(ca. EUR ${(blok.support_price / blok.support_unit).toFixed(1)} / Minute)` }}</div>
    </div>
    <!-- <div class="inline-flex items-center justify-center gap-4 bg-gray-900 rounded-t-lg text-yellow">
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
        <span v-else class="text-6xl">×</span>
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
    </div> -->
  </div>
  <div class="max-w-prose">{{ blok.disclaimer }}</div>
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
