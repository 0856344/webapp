<template>
  <div>
    <h2>{{ $t("myActivities") }}</h2>
    <loading-spinner v-if="!activities" color="#333" />
    <div v-if="activities" class="activities">
      <div
        v-for="activity of activities"
        :key="activity.id"
        :class="['activity', { pointer: activity.invoice_id }]"
        @click="showInvoice(activity)"
      >
        <div class="date">
          {{ new Date(activity.service_date).toLocaleDateString("de-AT") }}
        </div>
        <div class="right">
          <div class="top">
            <div class="name">
              {{ activity.product.external_name }}
            </div>
            <!--            <div class="count">{{ activity.product_count }}x</div>-->
            <div class="cost">
              {{ parseFloat(activity.cost_brutto).toFixed(2) }}EUR
            </div>
            <div v-if="activity.invoice_id" class="info">
              <template>
                <span class="link"
                  >{{ $t("invoice") }} #{{
                    activity.invoice_human_readable_id
                  }}</span
                >
                <div class="icon">
                  <font-awesome-icon icon="link" />
                </div>
              </template>
            </div>
          </div>
          <div v-if="activity.notes" class="notes">
            {{ activity.notes }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Activities",
  middleware: "authenticated",
  data() {
    return {
      activities: null,
      highlightedId: null,
    };
  },
  async mounted() {
    this.activities = await this.$store.dispatch("getActivities");
    this.activities = this.activities.reverse();
  },
  methods: {
    getDate(date) {
      return new Date(date);
    },
    showInvoice(activity) {
      if (activity.invoice_id) {
        this.$router.push(`invoices?id=${activity.invoice_id}`);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.activities {
  & .activity {
    display: flex;
    flex-flow: row nowrap;
    padding: 0.4em;
    & .top {
      display: flex;
      flex-flow: row nowrap;
      & * {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    @include media-breakpoint-down(lg) {
      flex-direction: column;
      position: relative;
      background-color: #fafafa;
      margin: 1em 0;
      border: 1px solid grey;
      border-radius: 0.3em;
      & .icon {
        position: absolute;
        top: 1em;
        right: 0;
        font-size: 1.3em;
        margin-right: -1em;
      }
      & .right {
        margin-top: 0.4em;
      }
      & .name {
        width: 100%;
        min-width: 7em;
      }
      & .info {
        margin-top: 0.4em;
      }
      & .top {
        display: flex;
        flex-flow: column;
      }
      & .count {
        min-width: 2em !important;
      }
      & .activityNumber {
        padding-bottom: 0.4em;
      }
    }
    & * {
      margin-right: 2em;
    }
    & .date {
      color: grey;
      width: 5em;
      transition: highlight 3s;
    }
    & .name {
      width: 20em;
    }
    & .activityNumber {
      width: 8em;
      color: grey;
    }
    & .green {
      color: green;
    }
    & .yellow {
      color: $color-orange;
    }
    & .cost {
      min-width: 5em;
    }
    & .info {
      // text-align: right;
      width: 100%;
      color: grey;
    }
    & .icon {
      display: flex;
      align-items: center;
      color: grey;
    }
    & .notes {
      color: grey;
      margin-top: 0.4em;
    }
  }
}
.activity:nth-child(odd) {
  background: #fafafa;
}
.activity:hover .icon {
  color: $color-blue-alt;
}
.pointer {
  cursor: pointer;
}
.highlighted {
  background: $color-yellow !important;
}
</style>
