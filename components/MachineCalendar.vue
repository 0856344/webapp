<template>
  <div>
    <div class="flex justify-end pb-2">
      <button @click="resetBookings(true)" class="gg-button flex">
        <svg
          style="fill: white"
          :class="{ 'spin-animation': fetchingBookings }"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path
            d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"
          />
        </svg>
        <span class="pl-1">Reload</span>
      </button>
    </div>
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
        style="height: 75vh"
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
      fetchingBookings: false,
      creatingBookings: false,
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
    isLoading() {
      return this.fetchingBookings || this.creatingBookings;
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
      this.creatingBookings = true;
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
            this.creatingBookings = false;
            this.resetBookings();
            this.fetchBookings();
          });
      });
    },
    resetBookings(reload = false) {
      this.selectedBookings = [];
      this.bookings = [];
      this.$store.commit('resetBookings');
      if (reload) {
        this.fetchBookings();
      }
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
      this.fetchingBookings = true;
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
          this.fetchingBookings = false;
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

.gg-button {
  background-color: rgba(66, 163, 185, 0.8);
  color: white;
  border-radius: 4px;
  font-size: 16px;
  padding: 8px 16px;
}
.gg-button:hover {
  background-color: rgba(104, 201, 223, 0.8);
}
.reload-icon {
  cursor: pointer;
}

.spin-animation {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
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
