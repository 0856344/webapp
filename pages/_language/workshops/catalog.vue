<template>
  <section class="workshop-overview">
    <div class="workshop-filters">
      <div class="filters">
      </div>
      <!--      <CovidInfobox />-->
      <div class="search">
        <input type="text" :placeholder="[[ $t('searchForWorkshopsAndEvents') ]]" v-model="search">
      </div>
      <loading class="loading" v-if="loading"></loading>
    </div>
    <div class="workshop-list-wrapper" >
      <div v-if="filteredWorkshops && filteredWorkshops.length > 0" class="workshop-list">
        <transition-group name="list">
          <workshop-list-item
              v-for="item in filteredWorkshops"
              :blok="item"
              :key="item.id"
              class="list-item"
              :slim="false"
          ></workshop-list-item>
        </transition-group>
      </div>
      <div v-else>
        <div v-if="workshops && workshops.length > 0 && !noResults" class="workshop-list">
          <transition-group name="list">
            <workshop-list-item
                v-for="item in workshops"
                :blok="item"
                :key="item.id"
                class="list-item"
                :slim="false"
            ></workshop-list-item>
          </transition-group>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data () {
    return {
      loading: false,
      search: '',
      workshops: [],
      filteredWorkshops: [],
      noResults: false
    }
  },
  watch: {
    search () {
      this.update()
    }
  },
  methods: {
    update () {
      this.noResults = false
      this.filteredWorkshops = []
      this.workshops.forEach((item) => {
        if (item.content.title.includes(this.search)) {
          this.filteredWorkshops.push(item)
        }
      })
    }
  },
  computed: {
    filters () {
      return {
        filter_query: {
          component: {
            in: 'workshop'
          }
        },
        search_term: this.search
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
    return { ...workshops }
  }
}
</script>

<style lang="scss">

.workshop-overview {
  .loading {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -40px);
  }

  .workshop-filters {
    .filters {
      background-color: $color-orange;
      display: flex;
      .tags {
        flex: 3;
      }
      .calendar {
        flex: 1;
        max-width: 320px;
        .reset {
          margin-top: -3px;
          background-color: #000;
          padding: 10px;
          .all {
            padding: 10px;
            color: #FFF;
            &:hover {
              cursor: pointer;
              color: #000;
              background-color: $color-yellow;
            }
          }
        }
      }
    }
    .tags {
      padding-bottom: 4vh;
      @include media-breakpoint-down(sm) {
        padding: 4vh 0;
      }
      .headline {
        padding-top: 4vh;
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
        >.tag {
          font-family: $font-mono;
          color: #FFF;
          user-select: none;
          cursor: pointer;
        }
      }
    }
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
          background: linear-gradient(rgba(0,0,0,0), $color-orange 80%);
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
    @include media-breakpoint-down(lg) {
      @include margin-page-wide;
    }
    padding-top: 1rem;
    margin-bottom: 2em;
    @include media-breakpoint-down(xs) {
      padding-bottom: 0rem;
    }
    input[type="text"] {
      flex: 1;
      display: block;
      width: 100%;
      padding: 10px;
      outline: none;
      font-family: $font-secondary;
      font-size: 1.1rem;
      border: none;
    }
    input[type="button"] {
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
.workshop-list-wrapper {
  @include media-breakpoint-down(lg) {
    @include margin-page-wide;
  }
  display: flex;

  .workshop-list {
    flex: 3;

    .list-item {
      margin-right: 10px;
    }

    .list-enter-active,
    .list-leave-active {
      transition: all 0.5s;
    }

    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
    {
      opacity: 0;
      transform: translateX(30px);
    }
  }

  .workshop-list-none {
    flex: 3;
    text-align: center;
  }
}

</style>
