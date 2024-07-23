<template>
  <div
    v-editable="blok"
    class="flex justify-center overflow-x-hidden lg:grid lg:grid-cols-member-grid lg:gap-1 py-2 mb-4 lg:mb-8 px-6"
  >
    <div
      class="grid lg:grid-cols-[4em_repeat(3,_1fr)] lg:col-start-2 lg:col-span-4 grid-cols-3 grid-rows-4 text-sm bg-white border-2 border-gray-900 rounded-lg lg:text-base "
    >
      <div
        class="inline-flex items-center justify-center text-2xl text-white uppercase bg-gray-900 lg:row-span-full lg:col-span-1 col-span-full lg:orientation-sideways lg:vertical-writing-rl"
      >
        Add-Ons
      </div>
      <div class="p-1">zusätzliche Credits</div>
      <div class="bg-yellow p-1">
        {{
          `EUR ${blok.extra_credits_price},- / ${blok.extra_credits_count} Credits` /*flex justify-center overflow-x-hidden lg:grid lg:grid-cols-member-grid lg:gap-1 lg:h-[58rem] py-4 mb-2 lg:py-8 px-4 */
        }}
      </div>
      <div class="p-1">
        {{
          `(${(
            (blok.extra_credits_price / blok.extra_credits_count) *
            100
          ).toFixed(0)} Cent /
        Credit)`
        }}
      </div>
      <div class="p-1">Lagerplatz Box</div>
      <div class="bg-yellow p-1">{{ `EUR ${blok.box_price},- / Monat` }}</div>
      <div class="p-1">{{ `(${blok.box_dimensions})` }}</div>
      <div class="p-1">Lagerplatz Palette</div>
      <div class="bg-yellow p-1">
        {{ `EUR ${blok.pallet_price},- / Monat` }}
      </div>
      <div class="p-1">{{ `(${blok.pallet_dimensions})` }}</div>
      <div class="p-1">technischer Host Support</div>
      <div class="bg-yellow p-1">
        {{ `EUR ${blok.support_price},- / ${blok.support_unit} Minuten` }}
      </div>
      <div class="p-1">
        {{
          `(ca. EUR ${(blok.support_price / blok.support_unit).toFixed(
            1
          )} / Minute)`
        }}
      </div>
    </div>
    <markdown :value="blok.subtext" class="text-sm max-w-prose" />
  </div>
</template>

<script>
export default {
  props: ["blok"],
  mounted() {},
  computed: {},
  methods: {},
};
</script>
