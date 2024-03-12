<template>
  <div v-if="isLoading" class="loading-background">
    <big-loading-spinner></big-loading-spinner>
  </div>
  <div v-else class="booking-calendar">
    <vue-cal
      xsmall
      style="height: 50vh"
      today-button
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
import moment from 'moment';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  name: 'booking-calendar',
  components: {VueCal},
  props: {
    space: [String, Number],
    resource: {
      type: [String, Number],
      required: true
    },
  },
  data () {
    return {
      isLoading: false,
      bookings: [],
      showAlert: false,
    };
  },
  computed: {
    hasUser () {
      return !!this.$store.state.member;
    },
    events () {
      return this.bookings.map(booking => {
        if (booking?.member?.id === this.$store.state.member.id) {
          return {
            title: booking?.member?.firstName ? booking.member.firstName : "Yours",
            class: 'reserved-by-member',
            start: moment(booking.fromDateTime).format('YYYY-MM-DD HH:mm'),
            end: moment(booking.untilDateTime).format('YYYY-MM-DD HH:mm'),
            background: true,
            state: 'reserved',
            member: this.$store.state.member.id
          }
        }
        return {
          title: 'reserviert',
          class: 'reserved',
          start: moment(booking.fromDateTime).format('YYYY-MM-DD HH:mm'),
          end: moment(booking.untilDateTime).format('YYYY-MM-DD HH:mm'),
          background: true,
          state: 'reserved',
          member: booking?.member?.id
        }
      })
    },
  },
  async created () {
    await this.fetchBookings();
  },
  methods: {
    async fetchBookings () {
      this.bookings = [];
      if (this.resource) {
        try {
          await this.getBookingByMethod('getBookingsByResource', this.resource)
        } catch (exception) {
          console.log('exception', exception);
        }
      }
    },
    getBookingByMethod (method, id) {
      this.isLoading = true;
      return this.$store
        .dispatch(method, id)
        .then((data) => {
          if (data.statusCode && data.statusCode >= 300) {
            console.error('error', data);
          } else {
            const bookings = Object.assign([], data);
            this.bookings =  bookings.filter(function (booking) {
              return booking.state && booking.state !== 'cancelled';
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

.booking-calendar {
  background-color: white;
  padding: 50px 0;

  @include media-breakpoint-down(sm) {
    padding: 0;
  }

  .vuecal__no-event {
    @include media-breakpoint-down(xs) {
      font-size: 0.7rem;
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
  background: #fff7f0 repeating-linear-gradient(
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

.reserved-by-member {
  background-color: rgba(41, 149, 79, 0.8);
  color: white;
  border: 1px solid rgb(21, 141, 63, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
}
</style>
