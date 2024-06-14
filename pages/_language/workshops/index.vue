<template>
  <section class="workshop-overview">
    <div class="machine-filters">
      <code class="loading" v-if="loading">{{ $t('Loading') }}</code>
      <div class="tags" :class="tagsCollapsed ? 'collapsed' : ''">
        <div class="expander" @click="toggleTags()"></div>
        <div class="headline">
          {{ $t('area') }}
        </div>
        <div class="tag-list" :key="this.filter">
          <div v-for="c in categories" :key="c.key" class="tag">
            <checkbox v-model="c.value" class="tag" theme="white">{{ c.nameToDisplay }} </checkbox>
          </div>
        </div>
        <br />
        <br />
        <div class="headline">
          {{ $t('view') }}
        </div>
        <div class="switch-button">
          <input class="switch-button-checkbox" type="checkbox" v-model="isCalendar" />
          <label class="switch-button-label" for="">
            <span class="switch-button-label-span"> {{ $t('details') }}</span>
          </label>
        </div>
      </div>
      <div v-if="story">
        <info-box
            :key="p.id"
            v-for="p in workshop.body"
            :blok="p"
        ></info-box>
      </div>
      <div v-show="!isCalendar" class="search">
        <input type="text" :placeholder="[[$t('searchForWorkshopsAndEvents')]]" v-model="search" />
      </div>
    </div>
    <div v-show="!isCalendar">
      <div class="workshop-list-wrapper" :key="this.filter">
        <div v-if="this.filter || this.search" class="workshop-list">
          <transition-group name="list">
            <workshop-list-item
              v-for="item in filteredWorkshops"
              :blok="item.blok"
              :pretix="item.pretix"
              :key="item.blok.id"
              class="list-item"
              :slim="false"></workshop-list-item>
          </transition-group>
        </div>
        <div v-else-if="fullWorkshops && fullWorkshops.length > 0" class="workshop-list">
          <transition-group name="list">
            <workshop-list-item
              v-for="item in fullWorkshops"
              :blok="item.blok"
              :pretix="item.pretix"
              :key="item.blok.id"
              class="list-item"
              :slim="false"></workshop-list-item>
          </transition-group>
        </div>
      </div>
    </div>
    <div v-if="isCalendar" :key="this.display">
      <div :key="this.filter">
        <script type="text/javascript" src="https://pretix.eu/widget/v1.de.js"></script>
        <link rel="stylesheet" type="text/css" href="https://pretix.eu/demo/democon/widget/v1.css" />
        <div id="pretix-container" class="pretix-content">
          <div v-show="selectedEvent.length !== 0">
            <pretix-widget
              id="pretix"
              name="pretix"
              event="https://pretix.eu/grandgarage"
              :list-type="this.calenderDisplayOnChange(this.display)"
              :filter="this.formatPretixCategoryRequest(this.filter)"></pretix-widget>
          </div>
          <div v-show="selectedEvent.length === 0">
            <pretix-widget
              name="pretix"
              :list-type="this.calenderDisplayOnChange(this.display)"
              event="https://pretix.eu/grandgarage"></pretix-widget>
          </div>
          <noscript>
            <div class="pretix-widget">
              <div class="pretix-widget-info-message">
                JavaScript is disabled in your browser. To access our ticket shop without JavaScript, please
                <a target="_blank" href="https://pretix.eu/grandgarage">click here</a>.
              </div>
            </div>
          </noscript>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import moment from 'moment';
  import storyblokLivePreview from "@/mixins/storyblokLivePreview";

  export default {
    mixins: [storyblokLivePreview],
    data() {
      return {
        categories: [
        {
            key: 'for_kids',
            name: 'for_kids',
            value: false,
            nameToDisplay: 'Kinder und Jugendliche',
          },
          { key: 'event', name: 'Event', value: false, nameToDisplay: 'Event' },
          {
            key: 'workshop',
            name: 'Workshops',
            value: false,
            nameToDisplay: 'Workshops',
          },
          {
            key: 'training',
            name: 'Einschulungen',
            value: false,
            nameToDisplay: 'Einschulungen',
          },
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
        isCalendar: false, // false = grid , true = calender,
        windowWidth: Infinity,
        display: 'calendar',
        story: null,
      }
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', this.onResize)
      })
      this.onResize()
    },
    created() {
      this.addPretixToStoryblok()
      this.$watch(
        'categories',
        (newVal, oldVal) => {
          this.updateFilter()
        },
        { deep: true },
      )
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize)
    },
    watch: {
      search() {
        this.noResults = false
        this.updateSearch()
      },
    },
    computed: {
      filters() {
        return {
          filter_query: {
            component: {
              in: 'workshop',
            },
          },
        }
      },
      workshop() {
        return this.story.content;
      },
    },
    methods: {
      onResize() {
        this.windowWidth = window.innerWidth
        if (this.windowWidth <= 1200) {
          this.display = 'week'
        } else {
          this.display = 'calendar'
        }
      },
      filterByDate() {
        this.pretixWorkshops.forEach(item => {})
      },
      //TODO: use is_future parameter from pretix api
      addPretixToStoryblok() {
        this.workshops.forEach(item => {
          this.pretixWorkshops.forEach(pretixItem => {
            if (item.content.pretix_shortform && item.content.pretix_shortform === pretixItem[0].slug) {
              const lastItem = pretixItem[pretixItem.length - 1]
              const startDate = moment(lastItem.date_from)
              if (startDate != null && startDate.isAfter(moment())) {
                this.fullWorkshops.push({
                  blok: item,
                  pretix: pretixItem,
                })
              }
            }
          })
        })
        this.fullWorkshops = this.fullWorkshops.sort((a, b) => {
          if (a.blok.content.category === 'for_kids' && b.blok.content.category !== 'for_kids') {
            return -1
          } else if (a.blok.content.category !== 'for_kids' && b.blok.content.category === 'for_kids') {
            return 1
          } else {
            return 0
          }
        })
      },
      updateSearch() {
        this.filterWorkshopsBySearch()
      },
      updateFilter() {
        this.loading = true
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
      toggleTags() {
        this.tagsCollapsed = !this.tagsCollapsed
      },
      filterWorkshopsBySearch() {
        this.filteredWorkshops = []
        this.fullWorkshops.forEach(item => {
          if (this.search !== '') {
            if (item.blok.content.title.toLowerCase().includes(this.search.toLowerCase())) {
              // text search AND category filter
              if (this.filter !== '') {
                if (item.blok.content.category === this.filter) {
                  this.filteredWorkshops.push(item)
                }
              } else {
                // only text search
                this.filteredWorkshops.push(item)
              }
            }
          } else {
            // only category filter
            if (item.blok.content.category === this.filter) {
              this.filteredWorkshops.push(item)
            }
          }
        })
      },
      deselectOldest() {
        this.categories.forEach(item => {
          if (item.name === this.filter) {
            item.value = false
          }
        })
      },
      selectedCategories() {
        return this.categories
          .filter(c => {
            return c.value ? c.name : ''
          })
          .map(c => {
            return { name: c.name, value: c.value, key: c.key }
          })
      },
      formatPretixCategoryRequest($category) {
        return 'attr[Kategorie]=' + escape($category)
      },
      calenderDisplayOnChange($displayType) {
        return $displayType
      },
    },
    async asyncData(context) {
      const filters = {
        filter_query: {
          component: {
            in: 'workshop',
          },
        },
      }
      const workshops = await context.store.dispatch('loadWorkshops', filters).then(data => {
        if (data.stories) {
          return { workshops: data.stories }
        }
        return { workshops: [] }
      })
      const pretixWorkshops = await context.store.dispatch('getPretixEvents').then(data => {
        if (data) {
          return { pretixWorkshops: data }
        } else {
          return { pretixWorkshops: [] }
        }
      })
      const page = await context.store
          .dispatch("loadPage", "/workshops")
          .catch((e) => {
            context.error({
              statusCode: e.response.status,
              message: e.response.statusText,
            });
          });
      return { ...page, ...workshops, ...pretixWorkshops }
    },
  }
</script>

<style lang="scss">
  .pretix-content {
    margin-top: 0;
    //margin-bottom: 50px;
    background-color: white;
  }

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
      content: 'Kalender';
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
          content: '';
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
    margin-top: 5px;
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

      .list-enter-active,
      .list-leave-active {
        transition: all 0.5s;
      }

      .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
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
        color: #fff;
        font-weight: bold;
        font-size: 1.8rem;
        @include margin-page-wide();
        margin-bottom: 20px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        @include media-breakpoint-down(sm) {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
      }

      .tag-list {
        @include margin-page-wide();
        display: grid;
        max-width: 70em;
        grid-template-columns: repeat(2, 1fr);
        @include media-breakpoint-down(sm) {
          font-size: 0.85em;
        }
        @include media-breakpoint-down(xs) {
          grid-template-columns: 1fr;
        }
        grid-gap: 15px 20px;

        > .tag {
          font-family: $font-mono;
          color: #fff;
          user-select: none;
          cursor: pointer;

          input[type='checkbox'] {
            outline: none;
            -webkit-appearance: none;
            padding: 5px;
            border: 1px solid #fff;
            border-radius: 3px;
            position: relative;
            top: 0;

            &:checked {
              background-color: #fff;
            }
          }
        }
      }

      background-color: $color-blue;
      @include media-breakpoint-down(sm) {
        overflow: hidden;
        position: relative;
        max-height: 1000px;
        transition: all 0.3s linear;
        padding-bottom: 30px;
        .expander {
          cursor: pointer;
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 20px;
          transition: all 0.3s linear;

          &:after {
            transition: all 0.3s linear;
            content: '';
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
      padding-top: 2vh;
      padding-bottom: 2vh;

      input[type='text'] {
        flex: 1;
        display: block;
        width: 100%;
        padding: 10px;
        outline: none;
        font-family: $font-secondary;
        font-size: 1.1rem;
        border: none;
      }

      input[type='button'] {
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
