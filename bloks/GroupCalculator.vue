<template>
  <div v-editable="blok" class="relative flex flex-col justify-center w-full px-4 mt-12">
    <div id="" class="grid grid-cols-5 px-2 mb-2 lg:py-6">
      <div class="flex flex-col items-center col-span-5 mb-4">
        <h1 class="font-mono text-xl md:text-2xl font-bold uppercase">Gruppenmitgliedschaften</h1>
      </div>
      <div class="flex flex-col items-center justify-center col-span-5 md:col-span-1 md:row-span-3">
        <div class="flex md:flex-col md:items-center">
          <button
            class="w-12 h-12 text-xl font-bold text-white bg-gray-900 md:w-16 rounded-s-lg md:rounded-ss-none md:rounded-b-lg md:text-2xl md:order-3"
            @click="decrement">
            -
          </button>

          <input
            type="number"
            :min="minimum"
            class="w-16 h-12 font-mono text-xl font-bold text-center border-2 border-gray-900 appearance-none md:h-24 md:text-3xl md:order-2"
            v-model.number="counter" />
          <button
            class="w-12 h-12 text-xl font-bold text-white bg-gray-900 md:w-16 rounded-e-lg md:rounded-ee-none md:rounded-t-lg md:text-2xl md:order-1"
            @click="increment">
            +
          </button>
        </div>
        <div class="my-2">Personen</div>
      </div>
      <template v-for="pkg in packages">
        <div
          id="conteiner"
          class="grid grid-cols-5 md:mb-0 mb-2 col-span-5 md:col-span-4 md:grid-cols-4 group md:border-0 border-2 border-gray-900 rounded-lg md:hover:bg-transparent hover:bg-white cursor-pointer"
          v-bind:key="pkg.name" @click="route">
          <div
            class="flex flex-col col-span-3 px-2 md:px-4 py-1 md:py-2 mb-4 duration-300 border-0 md:border-2 border-gray-900 rounded-lg transition-color md:group-hover:bg-white"
            v-bind:key="pkg.name + pkg.price">
            <span class="text-2xl font-bold">{{ pkg.name }}</span> <span class="">Einzelpreis {{ pkg.price }}€</span>
            <span class=""
              >Preis pro Person in der Gruppe
              {{
                (pkg.price / 2).toLocaleString('de-DE', {
                  minimumFractionDigits: (pkg.price / 2) % 1 === 0 ? 0 : 2,
                  maximumFractionDigits: (pkg.price / 2) % 1 === 0 ? 0 : 2,
                })
              }}€</span
            >
          </div>
          <div
            class="flex flex-col col-span-2 md:col-span-1 items-center px-2 md:px-4 py-1 md:py-2 mb-4 font-bold duration-300 delay-100 place-self-center transition-scale group-hover:scale-110"
            v-bind:key="pkg.name">
            <span class="inline-flex items-center gap-1 text-lg md:text-xl text-gray-400 w-min whitespace-nowrap"
              ><span class="text-sm">statt </span> {{ (pkg.price * counter).toLocaleString('de-DE') }} €</span
            >
            <span
              class="relative inline-block -mt-1 shadow-md w-min before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow whitespace-nowrap shadow-orange-800">
              <span class="relative text-xl md:text-2xl text-gray-900"
                >{{
                  ((pkg.price * counter) / 2).toLocaleString('de-DE', {
                    minimumFractionDigits: ((pkg.price * counter) / 2) % 1 === 0 ? 0 : 2,
                    maximumFractionDigits: ((pkg.price * counter) / 2) % 1 === 0 ? 0 : 2,
                  })
                }}
                €</span
              >
            </span>
          </div>
        </div>
      </template>
    </div>
    <div class="flex flex-col items-center col-span-5 mb-4">
      <markdown class="text-sm md:mx-32" :value="blok.description"></markdown>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['blok'],
    components: {},
    mounted() {
      this.counter = this.minimum
    },
    data() {
      return {
        counter: 0,
        prices: {
          starter: 15,
          maker: 30,
          pro: 150,
        },
        packages: [
          {
            name: 'Starter',
            price: 15,
          },
          {
            name: 'Maker',
            price: 30,
          },
          {
            name: 'Pro',
            price: 150,
          },
        ],
      }
    },
    watch: {
      counter: function (val) {
        val < this.minimum ? (this.counter = this.minimum) : null
      },
    },
    //get the array of feature description string values from the datasource
    //(blok only contains the feature keys)
    computed: {
      minimum() {
        return parseInt(this.blok.minimum_members)
      },
    },
    methods: {
      increment() {
        this.counter++
      },
      decrement() {
        if (this.counter > this.minimum) {
          this.counter--
        }
      },
      route() {
        this.$router.push({
            path: '/wizard/gruppe/type',
          })
      }
    },
  }
</script>

<style scoped>
  input[type='number'] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }
</style>
