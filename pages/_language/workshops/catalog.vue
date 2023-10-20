<template>
  <section class="workshop-overview">
    <div v-show="!isCalendar" >
      <!--      <div class="search">
              <input type="text" :placeholder="[[ $t('searchForWorkshopsAndEvents') ]]" v-model="search">
            </div>-->
      <div class="workshop-list-wrapper" :key="this.filter">
          <div v-if="fullWorkshops && fullWorkshops.length > 0 && !noResults" class="workshop-list">
            <transition-group name="list">
              <workshop-list-item
                  v-for="item in fullWorkshops"
                  :blok="item.blok"
                  :pretix="item.pretix"
                  :key="item.blok.id"
                  class="list-item"
                  :slim="false"
              ></workshop-list-item>
            </transition-group>
          <!--          <div >
                      <div class="workshop-list-none">
                        <code> {{ $t('noSearchResults') }}</code>
                      </div>
                    </div>-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      categories: [
        { key: 'event', name: 'Event', value: false, nameToDisplay: 'Event' },
        { key: 'workshop', name: 'Workshops', value: false, nameToDisplay: 'Workshops' },
        { key: 'training', name: 'Einschulungen', value: false, nameToDisplay: 'Einschulungen' },
        { key: 'frauenundtechnik', name: '#frauenundtechnik', value: false, nameToDisplay: 'Frauen und Technik' },
        { key: 'for_kids', name: 'for_kids', value: false, nameToDisplay: 'Kinder und Jugendliche' }
        // { key: 'makemas', name: '#makemas2022', value: false }
      ],
      loading: false,
      search: '',
      workshops: [],
      pretixWorkshops: [],
      tags: [],
      tagsCollapsed: false,
      fullWorkshops: [],
      selectedEvent: '',
      filteredWorkshops: [],
      filter: '',
      noResults: false,
      isCalendar: false, // false = grid , true = calender,
      windowWidth: Infinity,
      display: 'calendar'
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
    this.onResize()
  },
  created () {
    this.addPretixToStoryblok()
    this.$watch('categories', (newVal, oldVal) => {
      this.updateFilter()
    }, { deep: true })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  watch: {
    search () {
      this.noResults = false
      this.updateSearch()
    }
  },
  methods: {
    onResize () {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 1200) {
        this.display = 'week'
      } else {
        this.display = 'calendar'
      }
    },
    filterByDate () {
      this.pretixWorkshops.forEach((item) => {
      })
    },

    addPretixToStoryblok () {
      this.workshops.forEach((item) => {
        this.pretixWorkshops.forEach((pretixItem) => {
          if (item.content.pretix_shortform && item.content.pretix_shortform === pretixItem[0].slug) {
            this.fullWorkshops.push({
              blok: item,
              pretix: pretixItem
            })
          }
        })
      })
    },
    updateSearch () {
      this.filterWorkshopsBySearch()
    },
    updateFilter () {
      this.loading = true
      this.noResults = false
      this.selectedEvent = this.selectedCategories()
      if (this.selectedEvent.length > 1) {
        this.deselectOldest()
        this.selectedEvent = this.selectedCategories()
      }
      if (this.selectedEvent.length === 0) {
        this.filteredWorkshops = []
        this.search = ''
        this.filter = ''
      }
      if (this.selectedEvent.length === 1) {
        this.filter = this.selectedEvent[0].name
        this.filterWorkshopsBySearch()
      }

      this.loading = false
    },
    toggleTags () {
      this.tagsCollapsed = !this.tagsCollapsed
    },
    filterWorkshopsBySearch () {
      this.filteredWorkshops = []
      this.fullWorkshops.forEach((item) => {
        if (item.blok.content.title.includes(this.search)) {
          if (this.filter !== '') {
            if (item.blok.content.category === this.filter) {
              this.filteredWorkshops.push(item)
            } else {
              this.noResults = true
            }
          } else {
            this.filteredWorkshops.push(item)
          }
        }
      })
    },
    deselectOldest () {
      this.categories.forEach((item) => {
        if (item.name === this.filter) {
          item.value = false
        }
      })
    },
    selectedCategories () {
      return this.categories.filter((c) => {
        return (c.value) ? c.name : ''
      }).map((c) => {
        return { name: c.name, value: c.value, key: c.key }
      })
    },
    formatPretixCategoryRequest ($category) {
      return 'attr[Kategorie]=' + escape($category)
    },
    calenderDisplayOnChange ($displayType) {
      return $displayType
    }
  },
  computed: {
    filters () {
      return {
        filter_query: {
          component: {
            in: 'workshop'
          }
        }
      }
    }
  },
  async asyncData  (context) {
    const filters = {
      filter_query: {
        component: {
          in: 'workshop'
        }
      }
    }
    const workshops = await context.store.dispatch('loadWorkshops', filters).then((data) => {
      if (data.stories) {
        return { workshops: data.stories }
      }
      return { workshops: [] }
    })
    const pretixWorkshops = await context.store.dispatch('getPretixEvents').then((data) => {
      if (data) {
        return { pretixWorkshops: data }
      } else {
        return { pretixWorkshops: [] }
      }
    })
    return { ...workshops, ...pretixWorkshops }
  }
}
</script>

<style lang="scss">
.pretix-content .pretix-widget-wrapper .pretix-widget-event-availability-red {
  color: white !important;
}
.switch-button {
  background: rgba(255, 255, 255, 0.56);
  margin-left: 50px;
  margin-top: 20px;
  border-radius: 30px;
  overflow: hidden;
  width: 162px;
  text-align: center;
  font-size: 16px;
  letter-spacing: 1px;
  color: black;
  position: relative;
  padding-right: 120px;
  position: relative;

  &:before {
    content: "Kalender";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 82px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    pointer-events: none;
  }

  &-checkbox {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 2;

    &:checked + .switch-button-label:before {
      transform: translateX(80px);
      transition: transform 300ms linear;
    }

    & + .switch-button-label {
      position: relative;
      padding: 10px 0;
      display: block;
      user-select: none;
      pointer-events: none;
      width: 60px;

      &:before {
        content: "";
        background: #fff;
        height: 100%;
        width: 135%;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 30px;
        transform: translateX(0);
        transition: transform 300ms;
      }

      .switch-button-label-span {
        position: relative;
        padding-left: 15px;
      }
    }
  }
}

.workshop-overview {
  .loading {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -40px);
  }
}

.workshop-list-wrapper {
  margin-top: 30px;
  display: flex;

  .workshop-list {
    padding-right: 10px;
    padding-left: 10px;
    list-style: none;

    > span {
      display: grid;
      @include media-breakpoint-up(sm) {
        grid-template-columns: 1fr 1fr;
      }
      @include media-breakpoint-up(md) {
        grid-template-columns: 1fr 1fr;
      }

      @include media-breakpoint-up(xl) {
        grid-template-columns: 1fr 1fr 1fr;
        padding: 0px;
      }
      grid-column-gap: 2vw;
      grid-row-gap: 2vw;
    }

    flex: 3;

    .list-item {
      min-width: 150px;
      border-radius: 10px;
      @include media-breakpoint-up(lg) {
        min-width: 200px;
      }
    }

    .list-enter-active, .list-leave-active {
      transition: all 0.5s;
    }

    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
    {
      opacity: 0;
      transform: translateX(30px);
    }
  }

  .workshop-list-none {
    flex: 1;
    text-align: center;
  }
}

.machine-filters {
  .tags {
    padding: 8vh 0;
    @include media-breakpoint-down(sm) {
      padding: 4vh 0;
    }

    .headline {
      color: #FFF;
      font-weight: bold;
      font-size: 1.8rem;
      @include margin-page-wide();
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: .05em;
      @include media-breakpoint-down(sm) {
        font-size: 1.2rem;
        margin-bottom: 10px;
      }
    }

    .tag-list {
      @include margin-page-wide();
      display: grid;
      max-width: 70em;
      grid-template-columns: repeat(3, 1fr);
      @include media-breakpoint-down(sm) {
        grid-template-columns: 1fr 1fr;
        font-size: .85em;
      }
      @include media-breakpoint-down(xs) {
        grid-template-columns: 1fr;
      }
      grid-gap: 15px 20px;

      > .tag {
        font-family: $font-mono;
        color: #FFF;
        user-select: none;
        cursor: pointer;

        input[type=checkbox] {
          outline: none;
          -webkit-appearance: none;
          padding: 5px;
          border: 1px solid #FFF;
          border-radius: 3px;
          position: relative;
          top: 0;

          &:checked {
            background-color: #FFF;
          }
        }
      }
    }

    background-color: $color-blue;
    @include media-breakpoint-down(sm) {
      overflow: hidden;
      position: relative;
      max-height: 1000px;
      transition: all .3s linear;
      padding-bottom: 30px;
      .expander {
        cursor: pointer;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 20px;
        transition: all .3s linear;

        &:after {
          transition: all .3s linear;
          content: "";
          position: absolute;
          bottom: 18px;
          left: 50%;
          width: 10px;
          height: 10px;
          bottom: 8px;
          border-bottom: 2px solid #fff;
          border-right: 2px solid #fff;
          margin-left: -13px;
          transform: rotate(225deg);
          transform-origin: center center;
        }
      }
      &.collapsed {
        max-height: 17vh;

        .expander {
          height: 70px;
          background: linear-gradient(rgba(0, 0, 0, 0), $color-blue 80%);

          &:after {
            transform: rotate(45deg);
            bottom: 18px;
          }
        }
      }
    }
  }

  .search {
    display: flex;
    @include margin-page-wide();
    margin-top: 1vh;
    margin-bottom: 2vh;

    input[type=text] {
      flex: 1;
      display: block;
      width: 100%;
      padding: 10px;
      outline: none;
      font-family: $font-secondary;
      font-size: 1.1rem;
      border: none;
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
  }
}
</style>
