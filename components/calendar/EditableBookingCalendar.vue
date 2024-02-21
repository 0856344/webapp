<template>
  <div>
    <Alert :show="showAlertBox" :message="alertMsg" :icon="alertIcon" :color="alertColor"></Alert>
    <div class="flex justify-end pb-2">
      <button
        v-if="this.selectedBookings.length > 0 || invalidDate"
        @click="resetBookings() && this.$emit('reload')"
        class="gg-button-danger flex">
        <svg
          style="fill: white"
          :class="{ 'spin-animation': fetchingBookings }"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512">
          <path
            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
        </svg>
        <span class="pl-1">{{ $t('reset') }}</span>
      </button>
      <button v-else @click="resetBookings(true) && this.$emit('reload')" class="gg-button flex">
        <svg
          style="fill: white"
          :class="{ 'spin-animation': fetchingBookings }"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512">
          <path
            d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/>
        </svg>
        <span class="pl-1">{{ $t('reload') }}</span>
      </button>
    </div>
    <div v-if="isLoading" class="loading-background">
      <div class="flex w-100 justify-content-center justify-center items-center text-center">
        <big-loading-spinner/>
      </div>
    </div>
    <div v-else class="editable-booking-calendar">
      <vue-cal
        v-if="isMobile"
        ref="editableVueCal"
        small
        today-button
        :editable-events="{
          title: false,
          drag: false,
          resize: true,
          delete: true,
          create: true,
        }"
        :snap-to-time="bookingSlotInMinutes"
        :drag-to-create-event="false"
        :cell-click-hold="false"
        @cell-dblclick="createNewEvent"
        @event-create="onEventCreate"
        @event-delete="eventDeleted"
        @event-change="eventChanged"
        style="height: fit-content"
        class="vuecal--blue-theme vuecal--full-height-delete"
        active-view="day"
        :disable-views="['years', 'year', 'month', 'week']"
        :events="events"
        events-count-on-year-view
        locale="de"
        :hide-weekdays="[]"
        :time-from="earliestHour * 60"
        :time-to="latestHour * 60"
        :time-step="60"/>
      <vue-cal
        v-else
        ref="editableVueCal"
        xsmall
        today-button
        :editable-events="{
          title: false,
          drag: true,
          resize: true,
          delete: true,
          create: true,
        }"
        @event-drag-create="onEventDragCreate"
        :snap-to-time="bookingSlotInMinutes"
        @event-change="eventChanged"
        @event-delete="eventDeleted"
        style="height: fit-content"
        class="vuecal--blue-theme vuecal--full-height-delete"
        default-view="week"
        :events="events"
        events-count-on-year-view
        locale="de"
        :hide-weekdays="[]"
        :time-from="earliestHour * 60"
        :time-to="latestHour * 60"
        :time-step="60"
        :disable-views="['years']"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import {helper} from '@/plugins/helper'
import Alert from '@/components/Alert.vue'

export default {
  name: 'editable-booking-calendar',
  components: {VueCal, Alert},
  props: ['resource', 'space', 'member', 'earliestHour', 'latestHour', 'bookingSlotsPerHour', 'bookingMaxMinutesPerMemberDay', 'bookingMaxMinutesPerMemberWeek'],
  data () {
    return {
      isMobile: false,
      fetchingBookings: false,
      creatingBookings: false,
      bookings: null,
      showNotice: true,
      selectedBookings: [],
      invalidDate: null,
      alertIcon: 'info-circle',
      alertColor: '',
      showAlertBox: false,
      alertMsg: '',
    }
  },
  computed: {
    bookingSlotInMinutes () {
      // Convert from hours to minutes
      return this.bookingSlotsPerHour * 60
    },
    hasUser () {
      return !!this.$store.state.member
    },
    events () {
      return this.bookings.map(booking => {
        if (booking?.member?.id === this.member.id) {
          return {
            title: booking?.member?.firstName ? booking.member.firstName : "Yours",
            class: 'reserved-by-member',
            start: moment(booking.fromDateTime).format('YYYY-MM-DD HH:mm'),
            end: moment(booking.untilDateTime).format('YYYY-MM-DD HH:mm'),
            background: true,
            state: 'reserved',
            member: this.member.id
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
    isLoading () {
      return this.fetchingBookings || this.creatingBookings
    },
  },
  async created () {
    this.isMobile = helper.isMobile()
    await this.fetchBookings()
  },
  methods: {
    createNewEvent (startDateTime) {

      // Round start time to the nearest hour
      if (startDateTime) {
        this.$refs.editableVueCal.createEvent(helper.roundToNearestHour(startDateTime), 60, {
          class: 'blue-event',
        })
      }
    },
    eventDeleted (calEvent) {
      //console.log('Event deleted', calEvent);
      this.removeBooking(calEvent)
    },
    eventChanged (calEvent) {
      if (calEvent.originalEvent) {
        // Replace new event with the old one
        //console.log('Event changed', calEvent)
        this.eventDeleted(calEvent.originalEvent)
        this.saveBooking(calEvent.event)
      }
    },
    onEventCreate (calEvent) {
      //console.log('onEventCreate', calEvent)
      this.saveBooking(calEvent)
    },
    onEventDragCreate (calEvent) {
      //console.log('onEventDragCreate', calEvent)
      this.saveBooking(calEvent)
    },
    mapBooking (calEvent) {
      // Format a calendar event to a booking object
      return {
        id: calEvent._eid,
        fromDateTime: calEvent.start,
        untilDateTime: calEvent.end,
        title: calEvent.title,
        endTimeMinutes: calEvent.endTimeMinutes,
        startTimeMinutes: calEvent.startTimeMinutes,
        resource: String(this.resource),
        member: String(this.member.id),
        state: calEvent.state ? calEvent.state : 'selected',
      }
    },
    async fetchBookings () {
      this.bookings = []
      this.fetchingBookings = true
      //this.resource = 3136 //TODO for debugging - remove!
      if (this.space === 'smartgarage') {
        // TODO - Deprecated
        //console.log('SPACE FOUND - booking calender', this.space)
        //this.getBookingByMethod('getBookingsBySpace', this.space)
        this.getBookingByMethod('getBookingsByResource', 4049)
      } else if (this.resource) {
        //console.log('RESOURCE FOUND - booking calendar', this.resource)
        this.getBookingByMethod('getBookingsByResource', this.resource)
      }
    },
    saveBooking (calEvent) {
      if (calEvent && calEvent._eid) {
        const newBooking = this.mapBooking(calEvent)

        if (!this.isBookingValid(newBooking)) {
          return false
        }

        // Check if object already exists, based on the ID, and replace it Check if object already exists, based on the ID, and replace it
        const index = this.selectedBookings.findIndex(item => item.id === newBooking.id)
        if (index !== -1) {
          // Replace the object at the found index with the new object
          this.selectedBookings.splice(index, 1, newBooking)
        } else {
          // No object has been found
          this.selectedBookings.push(newBooking)
        }

        this.storeBookings(this.selectedBookings)
      } else {
        // Wrong event format
        console.log('Wrong event format. Given: ' + typeof calEvent)
      }
    },
    isBookingValid (newBooking) {
      let alertMsg = null

      // Check date format
      if (!helper.isValidDate(newBooking.fromDateTime) || !helper.isValidDate(newBooking.untilDateTime)) {
        console.log(
          'Wrong date format given. (fromDate, untilDate)',
          newBooking.fromDateTime,
          newBooking.untilDateTime,
        )
        return false
      }

      // Check hours limitation
      if (this.hoursExceededPerDay(newBooking, (this.bookingMaxMinutesPerMemberDay / 60))) {
        // Do not save this booking
        alertMsg = 'Erlaubte Stunden pro Tag: ' + (this.bookingMaxMinutesPerMemberDay / 60) + 'h'
        this.invalidDate = newBooking
      }

      // Check overlapping
      for (const booking of this.bookings) {
        if (this.dateOverlaps(booking, newBooking) === true) {
          // Do not save this booking
          alertMsg = alertMsg != null ? alertMsg + ' | Datum überschneidet sich.' : 'Datum überschneidet sich.'
          this.invalidDate = newBooking

          break
        }

        // Check if in past
        if (helper.dateIsInPast(new Date(newBooking.fromDateTime))) {
          console.log('NOT ALLOWED: is in PAST')
          // Do not save this booking
          alertMsg =
            alertMsg != null ? alertMsg + ' | Datum liegt in der Vergangenheit.' : 'Datum liegt in der Vergangenheit.'
          this.invalidDate = newBooking

          break
        }
      }
      if (this.invalidDate) {
        this.showAlert(alertMsg, '#f55252fc', 'exclamation') // Show for 10 seconds

        //console.log('INVALID DATE', this.invalidDate)
        // There are errors - do not save and reset anything
        this.resetBookings()

        return false
      }
      return true
    },
    hoursExceededPerDay (booking, allowedHours) {
      let allBookings = this.bookings.concat(this.selectedBookings);
      const bookingsOnSameDay = allBookings.filter((otherBooking) => {
        // Check if the other booking is on the same day as the target booking
        const bookingDate = new Date(booking.fromDateTime).toDateString();
        const otherBookingDate = new Date(otherBooking.fromDateTime).toDateString();
        return (bookingDate === otherBookingDate) && (booking.member === otherBooking.member);
      });

      // Calculate the total booked hours on the same day
      const totalBookedHours = bookingsOnSameDay.reduce((totalHours, otherBooking) => {
        const differenceInHours = helper.timeDifferenceInHours(
          otherBooking.fromDateTime,
          otherBooking.untilDateTime
        );
        return totalHours + differenceInHours;
      }, 0);

      // Calculate the difference in hours for the current booking
      const differenceInHours = helper.timeDifferenceInHours(
        booking.fromDateTime,
        booking.untilDateTime
      );

      // Check if the total booked hours exceed the allowed hours
      return totalBookedHours + differenceInHours > allowedHours;
    },
    storeBookings (bookings) {
      // Save selected bookings in the global store
      if (!bookings) {
        bookings = this.selectedBookings
      }
      this.$store.commit('setSelectedBookings', bookings)
    },
    removeBooking (calEvent) {
      const removedBooking = this.mapBooking(calEvent)
      this.selectedBookings = this.selectedBookings.filter(function (booking) {
        return booking.id !== removedBooking.id
      })
      this.storeBookings(this.selectedBookings)
    },
    resetBookings (reload = false) {
      this.bookings = this.bookings.filter(function (booking) {
        return booking.state !== 'selected'
      })
      this.selectedBookings = []
      this.$store.commit('resetBookings')
      this.invalidDate = null
      if (reload) {
        this.fetchBookings()
      }
    },
    writeBookingsToFabman () {
      this.creatingBookings = true
      // Send POST request to fabman for each booking
      this.$store.getters.getSelectedBookings.forEach(booking => {
        booking.member = String(this.member.id)
        booking.resource = String(booking.resource)
        this.$store
          .dispatch('createBooking', booking)
          .then(data => {
            if (data.statusCode && data.statusCode >= 300) {
              console.log('error', data)
            }
            console.log('Reservierungen wurden erstellt!')
            this.showAlert('Reservierung erfolgreich erstellt!', '#29954f', 'check')
          })
          .catch(error => {
            let errorMsg =
              'Ups! Die Reservierung konnte leider nicht erstellt werden. Bitte wende dich an frontdesk@grandgarage.eu.'
            if (error.response.data.data) {
              if (
                typeof error.response.data.data === 'string' &&
                error.response.data.data.includes('no permission')
              ) {
                errorMsg =
                  'Du besitzt keine Berechtigung für diese Maschine. Bei Fragen wende dich bitte an frontdesk@grandgarage.eu.'
              }
            } else {
              console.log(error.response.data)
            }
            // Show error message to user
            this.showAlert(errorMsg, '#f55252fc', 'exclamation')
            this.$sentry.captureException(new Error(error))
          })
          .finally(() => {
            this.creatingBookings = false
            this.resetBookings()
            this.fetchBookings()
            this.$emit('reload')
          })
      })
    },
    getBookingByMethod (method, id) {
      this.$store
        .dispatch(method, id)
        .then(data => {
          if (data.statusCode && data.statusCode >= 300) {
            console.log('error', data)
          } else {
            const bookings = Object.assign([], data)
            this.bookings = bookings.filter(function (booking) {
              return booking.state && booking.state !== 'cancelled'
            })
          }
        })
        .catch(error => {
          console.log(error.response.status, error.response.data.error)
          this.$sentry.captureException(new Error(error))
        })
        .finally(() => {
          this.fetchingBookings = false
        })
    },
    dateOverlaps (newBooking, existingBooking) {
      if (!newBooking || !existingBooking) {
        return false
      }
      const overlapping = helper.dateRangeOverlaps(
        new Date(existingBooking.fromDateTime),
        new Date(existingBooking.untilDateTime),
        new Date(newBooking.fromDateTime),
        new Date(newBooking.untilDateTime),
      )

      if (overlapping === true) {
        console.log('Date conflict with ', existingBooking)
      }

      return overlapping
    },
    showAlert (msg, color = '#29954f', icon = 'check', duration = 10000) {
      this.alertMsg = msg
      this.alertColor = color
      this.alertIcon = icon
      this.showAlertBox = true

      if (duration > 0) {
        // Hide alert after duration (milliseconds)
        setTimeout(() => {
          this.showAlertBox = false
        }, duration)
      }
    },
  },
}
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

@media screen and (max-width: 450px) {
  .vuecal__title {
    font-size: 0.5em;
  }
}

.vuecal__today-btn {
  font-size: 0.6em;
  border: 1px solid black;
  border-radius: 5px;
}

.editable-booking-calendar {
  background-color: white;

  @include media-breakpoint-down(sm) {
    padding: 0;
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
    background: repeating-linear-gradient(45deg, transparent, transparent 10px, #f2f2f2 10px, #f2f2f2 20px);
  }
}

.vuecal__cells.month-view .vuecal__cell, .vuecal__cells.year-view .vuecal__cell {
  height: 50px;
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

.input-button-primary {
  background-color: rgb(41, 149, 79);
  border: 1px solid rgb(21, 141, 63);
  color: white;
  border-radius: 4px;
}

</style>
