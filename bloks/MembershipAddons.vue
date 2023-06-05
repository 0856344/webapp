<template>
  <div v-editable="blok"
    class="flex flex-col items-center mt-4 lg:grid lg:grid-cols-member-grid lg:w-full lg:gap-1 px-4">
    <div>&nbsp;</div>
    <div class="grid grid-cols-3 col-span-4 lg:grid-cols-[4em_repeat(3,_1fr)] rounded-lg border-2 bg-white border-gray-900 mx-2 lg:mx-0">
      <div
        class="inline-flex items-center justify-center text-2xl uppercase bg-gray-900 rounded-t-lg lg:row-span-full lg:col-span-1 lg:rounded-r-none lg:rounded-l-lg col-span-full lg:orientation-sideways lg:vertical-writing-rl text-yellow">
        Add-Ons</div>
      <div class="text-sm border-r-2 border-gray-400 lg:text-base">
        <div class="h-12 p-2 lg:h-8">zusätzliche Credits</div>
        <div class="h-12 p-2 lg:h-8">Lagerplatz Box</div>
        <div class="h-12 p-2 lg:h-8">Lagerplatz Palette</div>
        <div class="h-12 p-2 lg:h-8">technischer Host Support</div>
      </div>
      <div class="text-sm border-r-2 border-gray-400 bg-yellow lg:text-base">
        <div class="h-12 p-2 lg:h-8">{{ `EUR ${blok.extra_credits_price},- / ${blok.extra_credits_count} Credits` }}</div>
        <div class="h-12 p-2 lg:h-8">{{ `EUR ${blok.box_price},- / Monat` }}</div>
        <div class="h-12 p-2 lg:h-8">{{ `EUR ${blok.pallet_price},- / Monat` }}</div>
        <div class="h-12 p-2 lg:h-8">{{ `EUR ${blok.support_price},- / ${blok.support_unit} Minuten` }}</div>
      </div>
      <div class="text-sm  lg:text-base">
        <div class="h-12 p-2 lg:h-8">{{ `(${((blok.extra_credits_price / blok.extra_credits_count) * 100).toFixed(0)} Cent /
          Credit)` }}</div>
        <div class="h-12 p-2 lg:h-8">{{ `(${blok.box_dimensions})` }}</div>
        <div class="h-12 p-2 lg:h-8">{{ `(${blok.pallet_dimensions})` }}</div>
        <div class="h-12 p-2 lg:h-8">{{ `(ca. EUR ${(blok.support_price / blok.support_unit).toFixed(1)} / Minute)` }}
        </div>
      </div>
    </div>
    <markdown :value="blok.subtext" class="text-sm max-w-prose" />
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
  },
  methods: {
  }
}
</script>
