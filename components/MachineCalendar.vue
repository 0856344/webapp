<template>
    <div class="machine-calendar">
        <div v-if="isLoading">
            <div class="flex w-100 justify-content-center justify-center items-center text-center">
                <div class="spinner-ring"></div>
            </div>
        </div>
        <vue-cal
                v-else
                xsmall
                class="vuecal--blue-theme"
                default-view="week"
                :events="events"
                events-count-on-year-view
                events-on-month-view="short"
                locale="de"
                :hide-weekdays="[1, 7]"
                :time-from="9 * 60"
                :time-to="20 * 60"
                :time-step="30"
                :disable-views="['years']"
        />
    </div>
</template>

<script>
import moment from 'moment'
import VueCal from 'vue-cal'
import 'vue-cal/dist/i18n/de.js'
import 'vue-cal/dist/vuecal.css'

export default {
  components: { VueCal },
  props: ['id'],
  data () {
    return {
      isLoading: false,
      bookings: null,
      eventsExample: [
        {
          start: '2023-04-19 10:35',
          end: '2023-04-19 11:30',
          title: 'Doctor appointment'
        },
        {
          start: '2023-04-19 18:30',
          end: '2023-04-19 19:15',
          title: 'Dentist appointment'
        },
        {
          start: '2023-04-20 18:30',
          end: '2023-04-20 20:30',
          title: 'Crossfit'
        },
        {
          start: '2023-04-21 11:00',
          end: '2023-04-21 13:00',
          title: 'Brunch with Jane'
        },
        {
          start: '2023-04-21 19:30',
          end: '2023-04-21 23:00',
          title: 'Swimming lesson'
        },
        {
          start: '2019-09-30 19:30',
          end: '2019-09-30 23:00',
          title: 'Swimming lesson'
        },
        {
          start: '2023-04-19 12:00',
          end: '2023-04-19 14:00',
          title: 'LUNCH',
          class: 'lunch',
          background: true
        },
        {
          start: '2023-04-20 12:00',
          end: '2023-04-20 14:00',
          title: 'LUNCH',
          class: 'lunch',
          background: true
        }
      ]
    }
  },
  computed: {
    hasUser () {
      return !!this.$store.state.user
    },
    events () {
      return this.bookings.map((booking) => {
        return {
          title: 'reserviert',
          class: booking.class,
          start: moment(booking.fromDateTime).format('YYYY-MM-DD HH:mm'),
          end: moment(booking.untilDateTime).format('YYYY-MM-DD HH:mm'),
          background: true
        }
      })
    }
  },
  async created () {
    await this.getBookings()
  },
  methods: {
    async getBookings () {
      this.isLoading = true
      this.$store.dispatch('getBookingsByResource', 3136)
        .then((data) => {
          if (data.statusCode && data.statusCode >= 300) {
            console.log('Error', data)
          } else {
            this.bookings = Object.assign([], data)
            console.log('bookings', this.bookings)
          }
        }).catch((error) => {
          console.log(error.response.status, error.response.data.error)
          this.$sentry.captureException(new Error(error))
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="scss">

.machine-calendar {
  .calendar {
    background-color: #FFF;
  }
}

.w-100 {
    width: 100%;
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
    border-color: #357f8e transparent #357f8e transparent;
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
