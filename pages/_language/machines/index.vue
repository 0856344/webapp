<template>
  <section class="machine-overview">
    <div class="machine-filters">
      <code class="loading" v-if="loading">{{ $t("Loading") }}</code>
      <div class="tags" :class="tagsCollapsed ? 'collapsed' : ''">
        <div class="expander" @click="toggleTags()"></div>
        <div class="headline">
          {{ $t("area") }}
        </div>
        <div class="tag-list">
          <div v-for="t in tags" :key="t.key" class="tag">
            <checkbox v-model="t.value" class="tag" theme="white">{{
              t.name
            }}</checkbox>
          </div>
        </div>
      </div>
      <div class="search">
        <input
          type="text"
          :placeholder="[[$t('searchMachines')]]"
          v-model="search"
          name=""
          id=""
        />
      </div>
    </div>
    <div class="machine-list-wrapper">
      <div v-if="machines && machines.length > 0" class="machine-list">
        <transition-group name="list">
          <machine-list-item
            v-for="item in machines"
            :blok="item"
            :key="item.id"
            class="list-item"
          ></machine-list-item>
        </transition-group>
      </div>
      <div v-else class="machine-list-none">
        <code> {{ $t("noSearchResults") }}</code>
      </div>
    </div>
  </section>
</template>

<script>
import Checkbox from "@/components/Checkbox.vue";

export default {
  components: {
    Checkbox,
  },
  data() {
    return {
      loading: false,
      search: "",
      tagsCollapsed: true,
    };
  },
  created() {
    this.$watch(
      "tags",
      (newVal, oldVal) => {
        this.update();
      },
      { deep: true }
    );
  },
  watch: {
    search() {
      this.update();
    },
  },
  methods: {
    update() {
      this.loading = true;
      this.$store.dispatch("findItems", this.filters).then((data) => {
        this.loading = false;
        this.machines = data.stories;
      });
    },
    toggleTags() {
      this.tagsCollapsed = !this.tagsCollapsed;
    },
  },
  computed: {
    filters() {
      return {
        filter_query: {
          component: {
            in: "machine",
          },
        },
        search_term: this.search,
        with_tag: this.filterTags.join(","),
      };
    },
    filterTags() {
      return this.tags
        .filter((t) => {
          return t.value;
        })
        .map((t) => {
          return t.name;
        });
    },
  },
  async asyncData(context) {
    const tags = await context.store.dispatch("loadTagsMachine");
    const filters = {
      filter_query: {
        component: {
          in: "machine",
        },
      },
    };
    const machines = await context.store
      .dispatch("findItems", filters)
      .then((data) => {
        if (data.stories) {
          return { machines: data.stories };
        }
        return { machines: [] };
      });
    return { tags, ...machines };
  },
};
</script>

<style lang="scss" scoped>
.machine-overview {
  .loading {
    position: absolute;
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
        grid-template-columns: repeat(3, 1fr);
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
      padding-top: 3vh;
      @include margin-page-wide();
      padding-bottom: 5vh;
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
  .machine-list-wrapper {
    display: flex;
    @include margin-page-wide();
    .machine-list {
      > span {
        display: grid;
        @include media-breakpoint-up(sm) {
          grid-template-columns: 1fr 1fr;
        }
        @include media-breakpoint-up(md) {
          grid-template-columns: 1fr 1fr 1fr;
        }

        @include media-breakpoint-up(xl) {
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }
        grid-column-gap: 2vw;
        grid-row-gap: 2vw;
      }
      flex: 3;
      .list-item {
        min-width: 150px;
        padding: 0 30px;
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
    .machine-list-none {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
