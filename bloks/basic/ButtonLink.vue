<template>
  <div class="flex justify-center overflow-x-hidden lg:grid lg:grid-cols-member-grid lg:gap-1 py-2 lg:py-4 bg-white"
    v-if="(!blok.conditional || blok.conditional && blok.condition === 'authenticated' && !!this.$store.state.auth || blok.conditional && blok.condition == 'notAuthenticated' && !(!!this.$store.state.auth))">
    <div class="w-full flex-col lg:col-start-2 lg:col-span-4"
      :class="[{ 'flex gap-2 lg:gap-8 rounded-xl px-4 lg:px-0 max-w-prose lg:max-w-none': hasProse }, { 'lg:flex-row': !hasTextAbove }]">
      <div v-if="hasProse" class="basis-1/2" :class="[{ 'lg:order-last': hasTextRight }]">
        <h2 v-if="hasHeader">{{ blok.prose_header }}</h2>
        <markdown :value="blok.prose_text" />
      </div>
      <div class="flex items-center justify-center basis-1/2">
        <button
          class="m-2 text-white rounded-sm justify-self-center ring-2 cursor:pointer max-w-max hover:bg-gray-900 hover:ring-gray-300"
          v-bind:class="buildClassString" v-on:click="route(buttonTarget)" v-html="buttonText">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  //:class="[{ 'flex w-full justify-center': !hasProse && !hasHeader }, { 'grid grid-cols-2 mx': hasProse }]

  props: ['blok'],
  mounted () {
    this.$root.$on('plan-selected', data => {
      this.changeButtonAppearance({ 
        text: `<span class="font-bold border-2 border-gray-700 rounded-md px-1">${data.plan.toUpperCase()}</span><br>Gleich Paket aktivieren`, 
        color: 'orange' 
      })
      this.changebuttonTarget({ path: '/wizard/onboarding/userInformation', query: { plan: data.plan } })
    })
  },
  data: function () {
    return {
      buttonText: this.blok.text,
      buttonColor: this.blok.color,
      buttonTarget: this.blok.url
    }
  },
  computed: {
    buildClassString () {
      const classes = []
      //this doesn't work because tailwind doesn't support dynamic classes:
      //classes.push(`bg-${this.buttonColor}`, `ring-${this.buttonColor}-300`)
      switch (this.buttonColor) {
        case 'blue':
          classes.push('bg-blue-500', 'ring-blue-300')
          break
        case 'orange':
          classes.push('bg-orange-500', 'ring-orange-300')
          break
        case 'green':
          classes.push('bg-green-500', 'ring-green-300')
          break
        default:
          classes.push('bg-blue-500', 'ring-blue-300')
      }
        
      switch (this.blok.size) {
        case 'small':
          classes.push('text-base', 'py-1', 'px-8', 'mt-1')
          break
        case 'medium':
          classes.push('text-lg', 'py-2', 'px-12', 'mt-2')
          break
        case 'large':
          classes.push('text-3xl', 'py-4', 'px-16', 'mt-4')
          break
        default:
          classes.push('text-lg', 'py-2', 'px-12', 'mt-2')
      }
      return classes.join(' ')
    },
    hasProse () {
      return !!this.blok.prose_text
    },
    hasHeader () {
      return !!this.blok.prose_header
    },
    hasTextRight () {
      return this.blok.layout === 'text_right'
    },
    hasTextAbove () {
      return this.blok.layout === 'text_top'
    }
  },
  methods: {
    route (target) {
      this.$router.push(target)
    },
    changeButtonAppearance ({ text: newText, color: newColor }) {
      this.buttonText = newText
      this.buttonColor = newColor
    },
    changebuttonTarget (newTarget) {
      this.buttonTarget = newTarget
    }
  }
}
</script>
