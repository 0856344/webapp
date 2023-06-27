<template>
  <div class="bg-white px-8">
    <div class="rounded-md flex flex-col shadow-md  w-full">
      <div class="bg-blue-500 text-white w-full rounded-t-md p-4">
        <h1 class="text-xl font-bold uppercase">Maschinen</h1>
      </div>
      <table class="m-8 w-full box-border">
        <thead @click="toggleCollapse">
          <tr class="w-full">
            <th class="text-left w-3/5">{{ $t('name') }}</th>
            <th class="text-left w-2/5">{{ $t('priceIn') }}</th>
          </tr>
        </thead>
        <transition name="accordion">
          <tbody v-if="!isCollapsed">
            <tr v-for="machine in filteredMachines" :key="machine.id" class="odd:bg-gray-200">
              <td class="text-left">{{ machine.name }}</td>
              <td class="table font-mono text-right text-base" v-html="formatPriceHTML(machine)"></td>
            </tr>
          </tbody>
        </transition>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  middleware: 'authenticated',
  data () {
    return {
      machines: [],
      search: '',
      isCollapsed: false

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
    },
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
    }
  },
  methods: {
    formatPrice (machine) {
      if (machine === undefined) return
      const price = machine.price
      const minutes = machine.seconds / 60
      const timeUnit = minutes === 1 ? 'min' : minutes === 60 ? 'h' : 'min'
      return `${price} € / ${(minutes < 60 && minutes > 1) ? minutes : ''} ${timeUnit}`
    },
    formatPriceHTML (machine) {
      if (machine === undefined) return
      const price = machine.price
      const whole = Math.floor(price).toString()
      const decimal = ((price - whole) * 100).toFixed(0)
      //const minutes = machine.seconds / 60
      //const timeUnit = minutes === 1 ? 'min' : minutes === 60 ? 'h' : 'min'
      return `<span class="table-row" aria-label=${price}>
                <span class="table-cell">${whole.length === 1 ? '&nbsp;' + whole : whole}</span>.
                <span class="table-cell text-left">${decimal.length === 1 ? decimal + '0' : decimal}</span>
              </span>`
    },
    toggleCollapse () {
      this.isCollapsed = !this.isCollapsed
    }

  },
  async mounted () {
    this.machines = await this.$store.dispatch('getMachinePrices')

    console.log(JSON.parse(JSON.stringify(this.machines)))
    //remove duplicates from array
    /*     let materials = Object.assign([], this.materials)
        materials = materials.sort(function (a, b) {
          if (a.external_name > b.external_name) {
            return 1
          } else if (a.external_name < b.external_name) {
            return -1
          } else {
            return 0
          }
        })
        this.materials = materials */
  }
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}

.accordion-enter,
.accordion-leave-to {
  transform: scaleY(0);
  transform-origin: top;
}</style>
