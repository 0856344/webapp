<template>
  <section class="util__container" v-if="workshop">
    <workshop-header :blok="workshop.content"></workshop-header>
    <workshop-info :blok="workshop.content" :workshopInformation="this.workshopInformation"></workshop-info>
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  data () {
    return {
      uid: null,
      workshopInformation: ''
    }
  },
  mixins: [storyblokLivePreview],
  asyncData (context) {
    return context.store.dispatch('loadWorkshopItem', context.params.slug)
  },
  methods: {
    async getPretixData () {
      if (this.workshop.content.pretix_shortform) {
        const events = await this.$store.dispatch('getPretixEvents', this.workshop.content.pretix_shortform)
        const lastEvent = events.pop().frontpage_text
        this.workshopInformation = lastEvent['de-informal']
      }
    }
  },
  beforeMount () {
    this.getPretixData()
  }
  /*  computed: {
      memberWorkshops () {
        return this.$store.getters.getMemberWorkshopById(Number(this.uid))
      }
    }*/
}
</script>

<style lang="scss" scoped>
</style>
