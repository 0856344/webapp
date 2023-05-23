<template>
  <section
      v-editable="blok"
      class="material-prices"
  >
    <div class="machine-filters">
      <div class="search-bar">
        <input type="text" :placeholder="[[ $t('search') ]]" v-model="search" name="" id="">
        <font-awesome-icon class="icon" icon="search" />
      </div>
    </div>
    <div class="material-prices-list">
      <div class="body content-card" >
        <div>
           <span class="department">{{ $t('materials') }}</span>
        </div>
        <div class="material-header">
          <div class="header">
            <div class="title">
              {{ $t('name') }}
            </div>
            <div class="title">
              {{ $t('priceIn') }}
            </div>
          </div>
        </div>
        <div class="material-prices">
          <div
              v-for="material in resultQuery" :key="material.id"
              class="material-price"
          >
            <div class="info-row">
              <div class="info-block">
                <div class="col info">
                  {{material.external_name}}
                </div>
                <div class="col info">
                  {{ formatPrice(material) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tax">
      {{ $t('tax') }}
    </div>
  </section>
</template>

<script>
export default {
  props: ['blok'],
  middleware: 'authenticated',
  data () {
    return {
      materials: [],
      search: ''
    }
  },
  computed: {
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
    this.materials = await this.$store.dispatch('getMaterials')
    let materials = Object.assign([], this.materials)
    materials = materials.sort(function (a, b) {
      if (a.external_name > b.external_name) { return 1 } else if (a.external_name < b.external_name) { return -1 } else { return 0 }
    })
    this.materials = materials
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles';

.machine-filters {
  .search-bar {
    display: flex;
    position: relative;
    @include margin-page-wide();
    padding-bottom: 5vh;
    input[type=text] {
      width: 100%;
      padding: 15px;
      margin:4px;
      box-sizing: border-box;
      padding-left:60px;
      font-family: $font-secondary;
      border: none;
      border-radius: 10px;
      -webkit-box-shadow: 7px 7px 6px -2px rgba(0,0,0,0.08);
      box-shadow: 7px 7px 6px -2px rgba(0,0,0,0.08);
      font-size: 1.1rem;
      &:hover {
        -webkit-box-shadow: 7px 7px 6px -2px rgba(0,0,0,0.12);
        box-shadow: 7px 7px 6px -2px rgba(0,0,0,0.12);
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
  padding: 5%;
  .department {
    font-family: $font-mono;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: $color-blue;
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
    margin-top: 20px;
    .material-price {
      &:nth-child(odd) {
        background-color: rgba(242, 243, 238,0.9);
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
}
.tax {
  margin-left: 30px;
}
</style>
