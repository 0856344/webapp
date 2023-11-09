<template>
  <section class="workshop-overview">
    <div class="workshop-list-wrapper">
      <div v-if="workshops && workshops.length > 0" class="workshop-list">
        <transition-group name="list">
          <workshop-list-item
            v-for="item in workshops"
            :key="item.id"
            :blok="item"
            class="list-item"
            :slim="true"
          />
        </transition-group>
      </div>
      <div v-else class="workshop-list-none">
        <code>{{ $t("noSearchResults") }}</code>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";

export default {
  layout: "screen",
  async asyncData(context) {
    // let tags = await context.store.dispatch("loadTags");
    const filters = {
      filter_query: {
        component: {
          in: "workshop-date",
        },
        starttime: {
          "gt-date": moment().subtract(24, "hours").format("YYYY-MM-DD HH:mm"),
        },
      },
    };
    const workshops = await context.store
      .dispatch("findWorkshops", { filters: filters, search: "" })
      .then((data) => {
        if (data) {
          return { workshops: data };
        }
        return { workshops: [] };
      });
    return { ...workshops };
  },
  data() {
    return {
      loading: false,
      search: "",
      workshops: [],
      tags: [],
    };
  },
  computed: {
    selectedCategories() {
      return this.categories
        .filter((c) => {
          return c.value;
        })
        .map((v) => {
          return v.key;
        });
    },
    filters() {
      const filterQuery = {
        component: {
          in: "workshop-date",
        },
        starttime: {
          "gt-date": moment().subtract(24, "hours").format("YYYY-MM-DD HH:mm"),
        },
      };
      return {
        filterQuery,
        search_term: this.search,
      };
    },
  },
  watch: {
    search() {
      this.update();
    },
  },
  created() {},
  methods: {
    update() {
      this.loading = true;
      this.$store
        .dispatch("findWorkshops", {
          filters: this.filters,
          search: this.search,
        })
        .then((data) => {
          this.loading = false;
          this.workshops = data;
        });
    },
  },
};
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
            color: #fff;
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
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        @include media-breakpoint-down(lg) {
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
        @include media-breakpoint-down(md) {
          grid-template-columns: 1fr 1fr 1fr;
        }
        @include media-breakpoint-down(sm) {
          grid-template-columns: 1fr 1fr;
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
          input[type="checkbox"] {
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
            background: linear-gradient(rgba(0, 0, 0, 0), $color-orange 80%);
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
      margin: 0 4%;
      padding-top: 1rem;
      padding-bottom: 4rem;
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
    margin: 0 4%;
    display: flex;
    .workshop-list {
      list-style: none;
      flex: 3;
      .list-item {
        margin-right: 10px;
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
      flex: 3;
      text-align: center;
    }
  }
}
</style>
