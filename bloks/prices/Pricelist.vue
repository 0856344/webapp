<template>
  <section
    class="lg:pt-5 lg:pb-5 lg:px-0 pt-0 px-1 pb-24 flex justify-center bg-transparent lg:bg-white">
    <div v-if="isLoading" class="inner-content w-11/12">
      <accordion>
        <div slot="header">{{ priceList.title }}</div>
          <div class="relative flex pb-4">
            <input type="text" :placeholder="[[$t('search')]]" v-model="search" name="" id=""
              class="w-full p-4 m-1 box-border pl-16 border-0 rounded-md shadow-md shadow-gray-400 hover:shadow-gray-600 focus:border-2 focus:border-orange focus:rounded-md focus:shadow-orange-800">
            <font-awesome-icon class="absolute left-3 top-2 p-3 text-orange" icon="search" />
          </div>
        <div class="px-4 my-8 lg:px-8 lg:my-16">
          <table class="w-full box-border">
            <thead class="">
              <tr class="w-full">
                <th class="text-left p-2 font-mono text-white sm:text-lg text-base font-bold sm:w-3/5 w-1/2 border-t border-l bg-gray-900 rounded-tl-md">{{ $t('name') }}</th>
                <th class="text-left p-2 font-mono text-white sm:text-lg text-base font-bold sm:w-2/5 w-1/2 border-t border-r bg-gray-900 rounded-tr-md">{{ priceList.billedInCredits ? $t('credits') : $t('priceIn') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredPriceListItems" :key="item.id" class="odd:bg-gray-200 border-white border">
                <td class="pl-2 text-left font-mono text-sm sm:text-base">{{ item.name }}</td>
                <td class="pr-2 table font-mono text-sm sm:text-base" v-html="formatPriceHTML(item)"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="ml-6">
          {{ $t('tax') }}
        </div>
      </accordion>
    </div>
    <div v-else>
      <big-loading-spinner />
    </div>
  </section>
</template>

<script>
export default {
  props: ['priceList'],
  middleware: 'authenticated',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    isLoading () {
      return this.priceList && this.priceList.items.length > 0
    },
    longestLength () {
      const items = this.priceList.items
      let longestLength = 0
      items.forEach((item) => {
        if (this.priceList.billedInCredits) {
          const price = Math.ceil(item.price * 10)
          if (price.toString().length > longestLength) {
            longestLength = price.toString().length
          } 
        } else {
          const whole = Math.floor(item.price).toString()
          if (whole.length > longestLength) {
            longestLength = whole.length
          }
        }
      })
      return longestLength
    },
    filteredPriceListItems () {
      const search = this.search.toLowerCase()
      return this.priceList.items.filter((item) => {
        return item.name.toLowerCase().includes(search)
      })
    }
  },
  methods: {
    formatPrice (item) {
      const price = item.price
      if (typeof price === 'string' || price instanceof String) {
        return price
      } else {
        return Number(price).toFixed(2).replace('.', ',') + ' / ' + item.unit_name
      }
    },
    formatPriceHTML (item) {
      if (item === undefined) return
      if (this.priceList.billedInCredits) {
        const price = Math.ceil(item.price * 10).toString()
        //return `${Math.ceil(item.price * 10).toFixed(0)} / ${item.unit}`
        return `<span class="table-row" aria-label=${price}>
                <span class="table-cell">${this.padString(price)}</span>
                <span>&nbsp;/ ${item.unit}</span>
              </span>`
      } else {
        const price = item.price
        const whole = Math.floor(price).toString()
        const decimal = ((price - whole) * 100).toFixed(0)
        //const minutes = machine.seconds / 60
        //const timeUnit = minutes === 1 ? 'min' : minutes === 60 ? 'h' : 'min'
        return `<span class="table-row" aria-label=${price}>
                <span class="table-cell">${this.padString(whole)}</span>.
                <span class="table-cell text-left">${decimal.length === 1 ? decimal + '0' : decimal}</span>
                <span>&nbsp;/ ${item.unit}</span>
              </span>`
      }
    },
    padString (str) {
      let paddedString = str
      for (let i = 0; i < this.longestLength - str.length; i++) {
        paddedString = '&nbsp;' + paddedString
      }
      return paddedString
    }
  }
}
</script>
