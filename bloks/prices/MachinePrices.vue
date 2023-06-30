<template v-editable="blok">
  <Pricelist :priceList="priceList"/>
</template>

<script>
import Pricelist from './Pricelist.vue'

export default {
  props: ['blok'],
  components: {
    Pricelist
  },
  middleware: 'authenticated',
  data () {
    return {
      machines: []
    }
  },
  computed: {
    filteredMachines () {
      return this.machines
        .map((m) => {
          let name = m.name
          if (name.includes('#')) {
            name = name.split('#')[0]
          }
          return { ...m, name }
        })
        //remove duplicate objects from array
        .filter((m, index, self) =>
          index === self.findIndex((t) => (
            t.name === m.name
          ))
        )
    },
    priceList () {
      return { 
        title: this.$t('machines'), 
        billedInCredits: true,
        items: this.filteredMachines.map((m) => {
          const minutes = m.seconds / 60
          const timeUnit = minutes === 1 ? 'min' : minutes === 60 ? 'h' : 'min'
          return { name: m.name, price: m.price, unit: timeUnit } 
        }) 
      }
    }
  },
  async mounted () {
    this.machines = await this.$store.dispatch('getMachinePrices')
  }
}
</script>
