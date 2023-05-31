<template>
    <div v-editable="blok" class="mt-4">
      <div class="flex justify-center h-screen p-4 overflow-x-hidden lg:grid lg:grid-flow-col lg:auto-cols-max lg:gap-2 lg:w-full lg:p-2 lg:h-screen-6/7">
        <div v-if="!isMobile" class="grid grid-rows-plan w-60">
          <div class="inline-flex items-center justify-center md:gap-2 lg:gap-4 bg-transparent rounded-t-lg text-yellow"></div>
          <div v-for="item in featureStrings" :key="item._uid"
            class="inline-flex items-center px-2 py-1 text-sm border-b-2 border-b-gray-900 hyphens-auto">
            {{ item }}
          </div>
          <div class="inline-flex items-center px-2 py-1 text-sm border-b-2 border-b-gray-900 hyphens-auto">
            <span>{{ $t('creditsDescription') }}</span>
          </div>
          <div class="inline-flex items-center justify-center gap-2 text-gray-900 bg-transparent rounded-b-lg">
          </div>
        </div>
        <slider-container :class="'lg:overflow-visible w-96 lg:w-full lg:contents relative'">
          <div v-if="isMobile" class="absolute left-0 w-12 h-full gradient-r"></div>
          <div v-if="isMobile" class="absolute right-0 w-12 h-full gradient-l"></div>
          <slider-slide v-for="(blok, index) in blok.columns" :key="blok.uid" >
            <component :is="blok.component" :blok="blok" :strings="featureStrings" :comingSoon="comingSoon" :isMobile="isMobile" :class="[{'ml-12' : index === 0},{'mr-12' : index === numberColumns-1}]"/>
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
      currentSlide: 0,
      observer: null,
      comingSoon: ['desk', 'reservation']
    }
  },
  async fetch () {
    const response = await this.$store.dispatch('getDataSource', 'member-features')
    this.featureArray = response.datasource_entries.map((entry) => [entry.name, entry.value])
  },
  computed: {
    hasUser () {
      return !!this.$store.state.user
    },
    isAuthenticated () {
      return !!this.$store.state.auth
    },
    isMember () {
      return this.$store.state.user.profile.state === 'active'
    },
    /**
     * This is a computed property that extracts an object with the feature names as keys and the feature values as values from the featureArray.
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
    register () {
      this.$router.push('/wizard/onboarding/userInformation')
    },
    login () {
      this.$store.dispatch('setSidebar', 'login')
    },
    setIsMobile () {
      const breakpoint = this.$getActiveBreakpoint()
      console.log(breakpoint)
      this.isMobile = breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md'
    }
  }
}
</script>

<style scoped>
/*workaround for tailwind nuxt bug
replaces classes "bg-gradient-to-r from-gray-100"*/ 
.gradient-l{
  background-image: linear-gradient(to left, #f2f3ee,hsla(72,17%,94%,0));
}

.gradient-r{
  background-image: linear-gradient(to right, #f2f3ee,hsla(72,17%,94%,0));
}

</style>
