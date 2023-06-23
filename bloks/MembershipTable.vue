<template>
  <div v-editable="blok" class="mt-2">
    <div id="plans"
      class="flex justify-center overflow-x-hidden lg:grid lg:grid-cols-member-grid lg:gap-1 lg:h-[60.05rem] py-2 mb-2 lg:py-6 px-4">
      <div v-if="!isMobile" class="grid grid-rows-plan w-full">
        <!---First DIV acts as placeholder for missing header row-->
        <div class="">&nbsp;</div>
        <div v-for="item in featureStrings" :key="item._uid"
          class="inline-flex items-center px-2 py-1 text-sm border-b-2 border-b-gray-900 hyphens-auto">
          {{ item }}
        </div>
        <div class="inline-flex items-center px-2 py-1 text-sm border-b-2 border-b-gray-900 hyphens-auto">
          <span>{{ $t("creditsDescription") }}</span>
        </div>
        <div class="">&nbsp;</div>
      </div>
      <slider-container :class="'lg:overflow-auto w-96 lg:w-full lg:contents relative'">
        <div v-if="isMobile" class="absolute left-0 w-12 h-full gradient-r"></div>
        <div v-if="isMobile" class="absolute right-0 w-12 h-full gradient-l"></div>
        <slider-slide v-for="(blok, index) in blok.columns" :key="blok.uid">
          <component :is="blok.component" :blok="blok" :strings="featureStrings" :comingSoon="comingSoon"
            :isMobile="isMobile" :class="[
              { 'lg:ml-0 ml-12': index === 0 },
              { 'lg:mr-0 mr-12': index === numberColumns - 1 }
            ]" />
        </slider-slide>
      </slider-container>
    </div>
  </div>
</template>

<script>
import { unzip } from 'lodash'
import SliderContainer from '@/bloks/SliderContainer.vue'
import SliderSlide from '@/bloks/SliderSlide.vue'

export default {
  props: ['blok'],
  components: {
    SliderContainer,
    SliderSlide
  },
  mounted () {
    this.setIsMobile()
    window.addEventListener('resize', this.setIsMobile)
  },
  unmounted () {
    window.removeEventListener('resize', this.setIsMobile)
  },
  data () {
    return {
      featureArray: [],
      breakpoint: '',
      isMobile: false,
      //keys of features that will be marked as "coming soon"
      comingSoon: ['desk', 'reservation']
    }
  },
  //get the array of feature description string values from the datasource
  //(blok only contains the feature keys)
  async fetch () {
    try {
      const response = await this.$store.dispatch(
        'getDataSource',
        'member-features'
      )
      this.featureArray = response.datasource_entries.map((entry) => [
        entry.name,
        entry.value
      ])
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    /**
     * This is a computed property that extracts an object with the 
     * feature names as keys and the feature values as values from 
     * the featureArray.
     */
    featureStrings () {
      const obj = {}
      const unzipped = unzip(this.featureArray)
      unzipped[0]?.forEach((entry, index) => {
        obj[entry] = unzipped[1][index]
      })
      return obj
    },
    numberColumns () {
      return this.blok.columns.length
    }
  },
  methods: {
    setIsMobile () {
      const breakpoint = this.$getActiveBreakpoint()
      //assume smallest breakpoint when no breakpoint is returned
      this.isMobile =
        breakpoint === 'xs' ||
        breakpoint === 'sm' ||
        breakpoint === 'md' ||
        breakpoint === null
    }
  }
}
</script>

<style scoped>
/*workaround for tailwind nuxt bug
replaces classes "bg-gradient-to-r from-gray-100"*/
.gradient-l {
  background-image: linear-gradient(to left, #f2f3ee, hsla(72, 17%, 94%, 0));
}

.gradient-r {
  background-image: linear-gradient(to right, #f2f3ee, hsla(72, 17%, 94%, 0));
}
</style>
