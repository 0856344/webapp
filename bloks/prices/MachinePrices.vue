<template>
  <div class="flex">
    <table>
      <thead>
        <tr>
          <th>Machine</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="machine in filteredMachines" :key="machine.id">
          <td>{{ machine.name }}</td>
          <td class="table font-mono text-right" v-html="formatPriceHTML(machine)"></td>
        </tr>
      </tbody>
    </table>
  </div>
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

<style lang="scss" scoped>
@import '/assets/scss/styles';

.content-card:hover {
  box-shadow: none;
}

.machine-filters {
  .search-bar {
    display: flex;
    position: relative;
    @include margin-page-wide();
    padding-bottom: 5vh;

    input[type=text] {
      width: 100%;
      padding: 15px;
      margin: 4px;
      box-sizing: border-box;
      padding-left: 60px;
      font-family: $font-secondary;
      border: none;
      border-radius: 10px;
      -webkit-box-shadow: 7px 7px 6px -2px rgba(0, 0, 0, 0.08);
      box-shadow: 7px 7px 6px -2px rgba(0, 0, 0, 0.08);
      font-size: 1.1rem;

      &:hover {
        -webkit-box-shadow: 7px 7px 6px -2px rgba(0, 0, 0, 0.12);
        box-shadow: 7px 7px 6px -2px rgba(0, 0, 0, 0.12);
      }
    }

    input[type=button] {
      font-size: 1.1rem;
      margin-left: 10px;
      text-transform: uppercase;
      background-color: transparent;
      border: none;
      font-weight: bold;
      color: $color-orange;
      outline: none;
    }

    .icon {
      left: 13px;
      top: 9px;
      padding: 10px 10px;
      color: $color-orange;
      position: absolute;
    }
  }
}

.body {
  position: relative;
  z-index: 1;
  margin-bottom: 3%;
  width: 100%;
  padding: 2%;

  .department {
    font-family: $font-mono;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: $color-blue;
  }
}

.material-header {
  margin-top: 20px;

  .header {
    line-height: 1.6;
    font-family: $font-mono;
    font-size: 0.9rem;
    font-weight: bold;
    display: flex;

    .title {
      flex: 1;
      flex-direction: row;
      display: flex;
    }
  }
}

.material-prices {
  padding: 20px 0;

  @include media-breakpoint-down(md) {
    padding: 0 4% 100px 4%;
    background-color: transparent;
  }

  .inner-content {
    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }

  .material-price {
    &:nth-child(odd) {
      background-color: rgba(242, 243, 238, 0.9);
    }

    padding: 10px;

    @include media-breakpoint-down(xs) {
      border: .11em solid #f2f3ee;
      padding: 7px;
    }

    .info-row {
      @include media-breakpoint-down(md) {
        flex-direction: column;
      }

      line-height: 1.6;
      font-family: $font-mono;
      font-size: 0.9rem;
      margin: -8px;
      display: flex;

      .info-block {
        flex: 1;
        flex-direction: row;
        display: flex;
      }

      .col {
        padding: 8px;
        margin-right: 10px;
        width: 50%;

      }
    }
  }
}

.tax {
  margin-left: 30px;
}
</style>
