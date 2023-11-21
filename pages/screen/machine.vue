<template>
  <section class="machine-status-overview">
    <div class="machine-list-wrapper">
      <div v-if="machines && machines.length > 0" class="machine-list">
        <transition-group name="list">
          <machine-status-list-item
            v-for="item in machines"
            :key="item.id"
            :blok="item"
            class="list-item"
          />
        </transition-group>
      </div>
      <div v-else class="machine-list-none">
        <code>{{ $t("noSearchResults") }}</code>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "screen",
  async asyncData(context) {
    const tags = await context.store.dispatch("loadTags");
    const filters = {
      filter_query: {
        component: {
          in: "machine",
        },
      },
    };
    const machines = await context.store
      .dispatch("findStatusMachines", filters)
      .then((data) => {
        if (data.stories) {
          return { machines: data.stories };
        }
        return { machines: [] };
      });
    return { tags, ...machines };
  },
  data() {
    return {
      loading: false,
      search: "",
      tagsCollapsed: true,
    };
  },
  computed: {},
  watch: {
    search() {
      this.update();
    },
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
};
</script>

<style lang="scss">
.machine-status-overview {
  .loading {
    position: absolute;
  }
  .machine-list-wrapper {
    display: flex;
    @include margin-page-wide();
    .machine-list {
      > span {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      }
      flex: 3;
      .list-item {
        min-width: 150px;
        padding: 0 30px;
        .machine-list-item {
          margin-bottom: -2em;
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
