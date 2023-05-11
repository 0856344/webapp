<template>
  <div v-editable="blok" class="">
    <div class="membership-details">
      <div class="grid grid-flow-col auto-cols-max gap-4 w-full">
        <div v-if="!isMobile" class="grid grid-rows-plan w-72 h-screen">
          <div class="bg-transparent rounded-t-lg text-yellow inline-flex justify-center items-center gap-4"></div>
          <div v-for="item in featureStrings" :key="item._uid"
            class="px-2 py-1 text-sm inline-flex items-center border-b-2 border-b-gray-900 hyphens-auto">
            {{ item }}
          </div>
          <div
            class="px-2 py-1 text-sm inline-flex items-center border-b-2 border-b-gray-900 hyphens-auto">
            <span>{{ $t('creditsDescription') }}</span>
          </div>
          <div class="rounded-b-lg bg-transparent text-gray-900 inline-flex items-center justify-center gap-2">
          </div>
        </div>
        <component :is="blok.component" v-for="blok in blok.columns" :key="blok.uid" :blok="blok"
          :strings="featureStrings" :isMobile="isMobile" />
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
const axios = require('axios')

export default {
  props: ['blok'],
  mounted () {
    this.breakpoint = this.$getActiveBreakpoint()
    window.addEventListener('resize', this.setIsMobile)
  },
  unmounted () {
    window.removeEventListener('resize', this.setIsMobile)
  },
  data () {
    return {
      priceView: 'monthly',
      featureArray: [],
      breakpoint: '',
      isMobile: false
    }
  },
  async fetch () {
    const response = await axios.get('https://api.storyblok.com/v1/cdn/datasource_entries?datasource=member-features&token=1IsgW07t4t5sm0UzdHAD6gtt')
    this.featureArray = response.data.datasource_entries.map((entry) => [entry.name, entry.value])
    console.log(this.featureArray)
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
