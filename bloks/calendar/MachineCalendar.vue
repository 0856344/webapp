<template>
  <div v-if="isLoading" class="loading-background">
    <div
      class="flex w-100 justify-content-center justify-center items-center text-center"
    >
      <div class="spinner-ring"></div>
    </div>
  </div>
  <div v-else class="machine-calendar">
    <vue-cal
      xsmall
      style="height: 50vh"
      class="vuecal--blue-theme"
      default-view="week"
      :events="events"
      events-count-on-year-view
      locale="de"
      :hide-weekdays="[]"
      :time-from="7 * 60"
      :time-to="20 * 60"
      :time-step="60"
      :disable-views="['years']"
    />
  </div>
</template>

<script>
import moment from "moment";
import VueCal from "vue-cal";
import "vue-cal/dist/i18n/de.js";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  props: ["resource", "space"],
  data() {
    return {
      isLoading: false,
      bookings: null,
    };
  },
  computed: {
    hasUser() {
      return !!this.$store.state.user;
    },
    events() {
      return this.bookings.map((booking) => {
        return {
          title: "reserviert",
          class: "reserved",
          start: moment(booking.fromDateTime).format("YYYY-MM-DD HH:mm"),
          end: moment(booking.untilDateTime).format("YYYY-MM-DD HH:mm"),
          background: true,
        };
      });
    },
  },
  async created() {
    await this.getBookings();
  },
  methods: {
    async getBookings() {
      this.bookings = [];
      this.isLoading = true;
      //this.resource = 3136 //TODO for debugging - remove!
      if (this.space === "smartgarage") {
        // TODO
        //console.log('SPACE FOUND - booking calender', this.space)
        //this.getBookingByMethod('getBookingsBySpace', this.space)
        this.getBookingByMethod("getBookingsByResource", 4049);
      } else if (this.resource) {
        //console.log('RESOURCE FOUND - booking calender', this.resource)
        this.getBookingByMethod("getBookingsByResource", this.resource);
      }
    },
    getBookingByMethod(method, id) {
      this.$store
        .dispatch(method, id)
        .then((data) => {
          if (data.statusCode && data.statusCode >= 300) {
            console.error("error", data);
          } else {
            const bookings = Object.assign([], data);
            this.bookings = bookings.filter(function (booking) {
              return booking.state && booking.state !== "cancelled";
            });
          }
        })
        .catch((error) => {
          console.error(error.response.status, error.response.data.error);
          this.$sentry.captureException(new Error(error));
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.loading-background {
  background-color: white;
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.machine-calendar {
  background-color: white;
  padding: 50px 0;

  @include media-breakpoint-down(sm) {
    padding: 0;
  }
  .vuecal {
    @include media-breakpoint-down(sm) {
      height: 75vh !important;
    }
  }
}

.w-100 {
  width: 100%;
}

.booking-element {
  background-color: rgba(255, 255, 0, 0.15);
  border: solid rgba(255, 210, 0, 0.3);
  border-width: 2px 0;
}

.reserved {
  background: #fff7f0
    repeating-linear-gradient(
      -45deg,
      rgba(255, 162, 87, 0.25),
      rgba(255, 162, 87, 0.25) 5px,
      rgba(255, 255, 255, 0) 5px,
      rgba(255, 255, 255, 0) 15px
    );
  color: #484848;
  border: 1px solid rgb(255 162 2 / 74%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
}

/** @see https://loading.io/css/ */
.spinner-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.spinner-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #357f8e;
  animation: spinner-ring 1.2s linear infinite;
}

@keyframes spinner-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
