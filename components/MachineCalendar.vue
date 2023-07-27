<template>
  <div>
    <div v-if="isLoading" class="loading-background">
      <div
        class="flex w-100 justify-content-center justify-center items-center text-center"
      >
        <div class="spinner-ring"></div>
      </div>
    </div>
    <div v-else class="machine-calendar">
      <vue-cal
        ref="vuecal"
        xsmall
        :editable-events="{
          title: false,
          drag: true,
          resize: true,
          delete: true,
          create: true,
        }"
        :on-event-delete="onEventCreate"
        @event-drag-create="onEventDragCreate"
        :snap-to-time="60"
        @view-change="viewUpdated"
        @event-change="eventChanged"
        @event-create="eventCreated"
        @event-drop="eventDropped"
        @event-delete="eventDeleted"
        style="height: 52vh"
        class="vuecal--blue-theme vuecal--full-height-delete"
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
  </div>
</template>

<script>
import moment from 'moment';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { helper } from '@/plugins/helper';

export default {
  components: { VueCal },
  props: ['resource', 'space', 'member'],
  data() {
    return {
      isLoading: false,
      bookings: null,
      showNotice: true,
      selectedBookings: [],
    };
  },
  computed: {
    hasUser() {
      return !!this.$store.state.user;
    },
    events() {
      return this.bookings.map((booking) => {
        return {
          title: 'reserviert',
          class: 'reserved',
          start: moment(booking.fromDateTime).format('YYYY-MM-DD HH:mm'),
          end: moment(booking.untilDateTime).format('YYYY-MM-DD HH:mm'),
          background: true,
        };
      });
    },
  },
  async created() {
    await this.fetchBookings();
  },
  methods: {
    onEventCreate(event, deleteEventFunction) {
      console.log('onEventDELETE');
    },
    mapBooking(calEvent) {
      // Format a calendar event to a booking object
      return {
        id: calEvent._eid,
        fromDateTime: calEvent.start,
        untilDateTime: calEvent.end,
        title: calEvent.title,
        endTimeMinutes: calEvent.endTimeMinutes,
        startTimeMinutes: calEvent.startTimeMinutes,
        resource: this.resource,
      };
    },
    onEventDragCreate(calEvent) {
      console.log('onEventDragCreate');
      this.saveBooking(calEvent);
    },
    saveBooking(calEvent) {
      if (calEvent && calEvent._eid) {
        const newBooking = this.mapBooking(calEvent);

        this.bookings.forEach((booking) => {
          if (this.dateOverlaps(booking, newBooking) === true) {
            this.dateConflict();
          }
        });

        // Check if object already exists, based on the ID, and replace it
        const index = this.selectedBookings.findIndex(
          (item) => item.id === newBooking.id,
        );
        if (index !== -1) {
          // Replace the object at the found index with the new object
          this.selectedBookings.splice(index, 1, newBooking);
        } else {
          // No object has been found
          this.selectedBookings.push(newBooking);
        }

        this.storeBookings(this.selectedBookings);
        console.log('booking stored', this.$store.getters.getSelectedBookings);
      } else {
        // Wrong event format
        console.log('Wrong event format. Given: ' + typeof calEvent);
      }
    },
    dateConflict() {
      // TODO
      console.log('DATE CONFLICT!');
      this.$emit('dateConflict', 'Datum überschneidet sich.');
    },
    storeBookings(bookings) {
      // Save selected bookings in the global store
      this.$store.commit('setSelectedBookings', bookings);
    },
    writeBookingsToFabman() {
      this.isLoading = true;
      // Send POST request to fabman for each booking
      this.$store.getters.getSelectedBookings.forEach((booking) => {
        booking.member = String(this.member.id);
        booking.resource = String(booking.resource);
        console.log('booking', booking);
        this.$store
          .dispatch('createBooking', booking)
          .then((data) => {
            if (data.statusCode && data.statusCode >= 300) {
              console.log('error', data);
            }
            console.log('Reservierungen wurden erstellt!');
          })
          .catch((error) => {
            console.log(error.response.status, error.response.data.error);
            this.$sentry.captureException(new Error(error));
          })
          .finally(() => {
            this.isLoading = false;
            this.$store.commit('resetBookings');
            this.fetchBookings();
          });
      });
    },
    viewUpdated() {
      console.log('viewUpdated');
    },
    eventChanged(calEvent) {
      // TODO
      console.log('eventChanged', calEvent);
      //this.saveBooking(calEvent.event);
    },
    eventDropped(calEvent) {
      // TODO
      console.log('eventDropped', calEvent);
    },
    eventCreated(calEvent) {
      console.log('eventCreated', calEvent);
    },
    eventDeleted(calEvent) {
      const removedBooking = this.mapBooking(calEvent);
      this.selectedBookings = this.selectedBookings.filter(function (booking) {
        return booking.id !== removedBooking.id;
      });

      this.storeBookings();
    },
    dateOverlaps(newBooking, existingBooking) {
      if (!newBooking || !existingBooking) {
        return false;
      }
      const overlapping = helper.dateRangeOverlaps(
        new Date(existingBooking.fromDateTime),
        new Date(existingBooking.untilDateTime),
        new Date(newBooking.fromDateTime),
        new Date(newBooking.untilDateTime),
      );

      if (overlapping === true) {
        console.log('Date conflict with ', existingBooking);
      }

      return overlapping;
    },
    async fetchBookings() {
      this.bookings = [];
      this.isLoading = true;
      //this.resource = 3136 //TODO for debugging - remove!
      if (this.space === 'smartgarage') {
        // TODO
        //console.log('SPACE FOUND - booking calender', this.space)
        //this.getBookingByMethod('getBookingsBySpace', this.space)
        this.getBookingByMethod('getBookingsByResource', 4049);
      } else if (this.resource) {
        //console.log('RESOURCE FOUND - booking calender', this.resource)
        this.getBookingByMethod('getBookingsByResource', this.resource);
      }
    },
    getBookingByMethod(method, id) {
      this.$store
        .dispatch(method, id)
        .then((data) => {
          if (data.statusCode && data.statusCode >= 300) {
            console.log('error', data);
          } else {
            const bookings = Object.assign([], data);
            this.bookings = bookings.filter(function (booking) {
              return booking.state && booking.state !== 'cancelled';
            });
          }
        })
        .catch((error) => {
          console.log(error.response.status, error.response.data.error);
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

.vuecal__event {
  background-color: $color-primary;
  color: white;
  box-sizing: border-box;
  padding: 5px;
  opacity: 0.8;
  font-weight: bold;

  &.lunch {
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      #f2f2f2 10px,
      #f2f2f2 20px
    );
  }
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
  content: ' ';
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
