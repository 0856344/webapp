<template>
  <div v-editable="blok" class="">
    <div class="">
      <div class="lg:grid lg:grid-flow-col lg:auto-cols-max lg:gap-4 lg:w-full overflow-x-hidden flex justify-center p-4 lg:p-2">
        <div v-if="!isMobile" class="grid grid-rows-plan w-72 h-screen">
          <div class="bg-transparent rounded-t-lg text-yellow inline-flex justify-center items-center gap-4"></div>
          <div v-for="item in featureStrings" :key="item._uid"
            class="px-2 py-1 text-sm inline-flex items-center border-b-2 border-b-gray-900 hyphens-auto">
            {{ item }}
          </div>
          <div class="px-2 py-1 text-sm inline-flex items-center border-b-2 border-b-gray-900 hyphens-auto">
            <span>{{ $t('creditsDescription') }}</span>
          </div>
          <div class="rounded-b-lg bg-transparent text-gray-900 inline-flex items-center justify-center gap-2">
          </div>
        </div>
        <!-- <div v-if="isMobile" class="carousel w-full">
          <div v-for="(blok, index) in blok.columns" :key="blok.uid" class="carousel-item relative w-full -scroll-mt-96"
            :id="`slide${index}`">
            <div class="w-full flex justify-center">
              <component :is="blok.component" :blok="blok" :strings="featureStrings" :isMobile="isMobile" class="" />
            </div>
            <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a class="btn" v-bind:href="`#slide${getPrevSlide(index)}`"><font-awesome-icon
                  :icon="['fas', 'chevron-left']" /></a>
              <a class="btn" v-bind:href="`#slide${getNextSlide(index)}`"><font-awesome-icon
                  :icon="['fas', 'chevron-right']" /></a>
            </div>
          </div>
        </div> -->
        <slider-container :class="'lg:overflow-visible w-96 lg:w-full lg:contents relative'">
          <div class="absolute left-0 w-12 h-full bg-gradient-to-r from-gray-100"></div>
          <div class="absolute right-0 w-12 h-full bg-gradient-to-l from-gray-100"></div>
          <slider-slide v-for="(blok, index) in blok.columns" :key="blok.uid" >
            <component :is="blok.component" :blok="blok" :strings="featureStrings" :isMobile="isMobile" :class="[{'ml-12' : index === 0},{'mr-12' : index === numberColumns-1}]"/>
          </slider-slide>
        </slider-container>
        <!-- <div class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth lg:overflow-visible w-72 lg:w-auto lg:contents h-screen">
          <component :is="blok.component" v-for="blok in blok.columns" :key="blok.uid" :blok="blok"
            :strings="featureStrings" :isMobile="isMobile" />
        </div> -->
      </div>
      <div v-if="!isAuthenticated" class="login-register-info">
        <p>Registriere dich jetzt und werde Mitglied</p>
        <div class="register-button">
          <button @click="register">
            Jetzt Mitglied werden
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { unzip } from 'lodash'
import SliderContainer from '@/components/SliderContainer.vue'
import SliderSlide from '@/components/SliderSlide.vue'

export default {
  props: ['blok'],
  components: {
    SliderContainer,
    SliderSlide
  },
  /* created () {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.currentSlide = parseInt(entry.target.id.replace('slide', ''))
          console.log(this.currentSlide)
        }
      })
    }, {
      root: document.querySelector('.carousel'),
      rootMargin: '0px',
      threshold: 0.5
    })
  }, */
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
      observer: null
    }
  },
  async asyncData (context) {
    const response = await context.store.dispatch('getDataSource', 'member-features').then(data => {
      return data.stories
    })
    //const response = await axios.get(`https://api.storyblok.com/v1/cdn/datasource_entries?datasource=member-features&token=${process.env.NUXT_ENV_STORYBLOK_TOKEN}`)
    this.featureArray = response.data.datasource_entries.map((entry) => [entry.name, entry.value])
    console.log(this.featureArray)
  },
  /*   async fetch() {
    const response = await context.store.dispatch('getDataSource', 'member-features').then(data => {
      return data.stories
    })
    //const response = await axios.get(`https://api.storyblok.com/v1/cdn/datasource_entries?datasource=member-features&token=${process.env.NUXT_ENV_STORYBLOK_TOKEN}`)
    this.featureArray = response.data.datasource_entries.map((entry) => [entry.name, entry.value])
    console.log(this.featureArray)
  }, */
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
    },
    prevSlide () {
      this.currentSlide = this.currentSlide-- < 0 ? this.currentSlide = 0 : this.currentSlide
      document.getElementById(`slide${this.currentSlide}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      return this.currentSlide
    },
    nextSlide () {
      const lastIndex = this.blok.columns.length - 1
      this.currentSlide = this.currentSlide++ > lastIndex ? lastIndex : this.currentSlide
      document.getElementById(`slide${this.currentSlide}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      return this.currentSlide
    },
    getNextSlide (index) {
      const next = index + 1 > this.blok.columns.length - 1 ? 0 : index + 1
      return next
    },
    getPrevSlide (index) {
      const prev = index - 1 < 0 ? this.blok.columns.length - 1 : index - 1
      return prev
    }
  }
}
</script>
