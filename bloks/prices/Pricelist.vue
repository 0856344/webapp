<template>
  <table>
    <tr>
      <th>{{ $t('name') }}</th>
      <th>{{ $t('priceIn') }}</th>
    </tr>
    <tr v-for="material in queryResult" :key="material.id">
      <td>{{ material.external_name }}</td>
      <td>{{ formatPrice(material) }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ['blok'],
  middleware: 'authenticated',
  data () {
    return {
      machines: [],
      search: ''
    }
  },
  computed: {
    isLoading () {
      return this.materials && this.materials.length > 0
    },
    resultQuery () {
      if (this.search) {
        return this.materials.filter((m) => {
          return m.internal_name.toLowerCase().includes(this.search.toLowerCase())
        })
      } else {
        return this.materials
      }
    }
  },
  methods: {
    formatPrice ($material) {
      const price = $material.price
      if (typeof price === 'string' || price instanceof String) {
        return price
      } else {
        return Number(price).toFixed(2).replace('.', ',').toString() + ' / ' + $material.unit_name
      }
    }
  },
  async mounted () {
    this.machines = await this.$store.dispatch('getMachines')
    let materials = Object.assign([], this.materials)
    materials = materials.sort(function (a, b) {
      if (a.external_name > b.external_name) {
        return 1
      } else if (a.external_name < b.external_name) {
        return -1
      } else {
        return 0
      }
    })
    this.materials = materials
  }
}
</script>
