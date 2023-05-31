<template>
  <div v-editable="blok" class="flex flex-col items-center">
  <div class="grid grid-cols-3 lg:grid-cols-[4em_repeat(3,_1fr)] rounded-lg border border-gray-900 max-w-prose" >
    <div class="lg:row-span-full lg:col-span-1 col-span-full inline-flex justify-center items-center lg:orientation-sideways lg:vertical-writing-rl bg-gray-900 text-yellow text-2xl uppercase">Add-Ons</div>
    <div class="border-r border-gray-900 text-sm lg:text-base">
      <div class="p-2 lg:h-8 h-12">zusätzliche Credits</div>
      <div class="p-2 lg:h-8 h-12">Lagerplatz Box</div>
      <div class="p-2 lg:h-8 h-12">Lagerplatz Palette</div>
      <div class="p-2 lg:h-8 h-12">technischer Host Support</div>
    </div>
    <div class="bg-yellow border-r border-gray-900 text-sm lg:text-base">
      <div class="p-2 lg:h-8 h-12">{{ `EUR ${blok.extra_credits_price},- / ${blok.extra_credits_count} Credits` }}</div>
      <div class="p-2 lg:h-8 h-12">{{ `EUR ${blok.box_price},- / Monat` }}</div>
      <div class="p-2 lg:h-8 h-12">{{ `EUR ${blok.pallet_price},- / Monat` }}</div>
      <div class="p-2 lg:h-8 h-12">{{ `EUR ${blok.support_price},- / ${blok.support_unit} Minuten` }}</div>
    </div>
    <div class=" text-sm lg:text-base">
      <div class="p-2 lg:h-8 h-12">{{ `(${((blok.extra_credits_price / blok.extra_credits_count)*100).toFixed(0)} Cent / Credit)` }}</div>
      <div class="p-2 lg:h-8 h-12">{{ `(${blok.box_dimensions})` }}</div>
      <div class="p-2 lg:h-8 h-12">{{ `(${blok.pallet_dimensions})` }}</div>
      <div class="p-2 lg:h-8 h-12">{{ `(ca. EUR ${(blok.support_price / blok.support_unit).toFixed(1)} / Minute)` }}</div>
    </div>
  </div>
  <div v-html="$transformRichText(blok.disclaimer)" class="max-w-prose text-sm"></div>
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
