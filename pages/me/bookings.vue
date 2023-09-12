<template>
  <div>
    <section>
      <modal
        :show="modalOpen"
        :header-text="'Buchung bestätigen'"
        :content-text="'Sollen die ausgewählten Termine verbindlich eingetragen werden?'"
        :data="newBookings"
        :submit-text="'Speichern'"
        :loading="isLoading"
        @close="closeModal"
        @confirm="confirmModal"
      >
      </modal>
      <modal
        :show="infoModalOpen"
        :header-text="infoModalHeadline"
        :content-text="infoModalText"
        :submit-text="'Bestätigen'"
        :loading="isLoading"
        @close="closeInfoModal"
        @confirm="confirmInfoModal"
      >
      </modal>
      <v-tour name="myTour" :steps="steps" :options="tourOptions"></v-tour>
      <div class="flex items-center mb-1">
        <h2 class="m-0 mr-2 text-2xl flex items-center">
          {{ $t('machineBookings') }}
          <svg
            class="cursor-pointer icon-button-secondary inline-block w-5 h-5 ml-1 fill-secondary demo-button"
            :class="{ 'jump-animation': isFirstVisit }"
            xmlns="http://www.w3.org/2000/svg"
            @click="startTour"
            viewBox="0 0 512 512"
          >
            <path
              d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
            />
          </svg>
          <loading-spinner-inline v-if="isLoading" class="pl-2" />
          <svg
            v-show="isFirstVisit"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24.24 49.12"
            class="inline-block fill-secondary info-arrow pl-4 pr-3"
          >
            <path
              class="cls-3"
              d="m16.71,37.11c2.24,2.76,4.59,5.42,7.19,7.86.65.61.34,1.82-.53,2.02-1.79.41-3.57.89-5.36,1.27-1.61.35-3.39.95-5.04.85-.82-.05-1.19-1.14-.43-1.59,1.42-.84,3.26-1.13,4.84-1.55.3-.08.6-.15.9-.22-1.06-.16-2.13-.38-3.09-.66-2.45-.69-4.85-1.73-6.97-3.14C3.78,38.99.95,34.24.22,28.98c-.78-5.54.6-11.13,3.28-15.99,1.39-2.52,3.12-4.85,5.01-7.02.98-1.12,2.02-2.18,3.09-3.21.97-.93,1.96-2.07,3.19-2.66.8-.39,1.77.43,1.27,1.27-.61,1.03-1.57,1.8-2.4,2.66-.9.94-1.78,1.9-2.63,2.89-1.74,2.02-3.35,4.14-4.67,6.47-2.5,4.37-3.88,9.37-3.34,14.43.52,4.9,3.11,9.01,7.12,11.81,1.91,1.34,4.03,2.29,6.24,3.01.83.27,1.68.46,2.53.67-1.4-1.4-2.91-2.69-4.14-4.25-1.08-1.37.82-3.33,1.94-1.94"
            />
          </svg>
          <p v-show="isFirstVisit" class="text-xs color-secondary pl-1">
            Willkommen! Hier bekommst du eine Einführung.
          </p>
        </h2>
      </div>
      <br />
      <fieldset class="p-4">
        <legend>Neue Reservierung</legend>
        <p>Hier kannst du eine Maschine buchen.</p>
        <div>
          <div class="flex-1 mr-6 mb-4">
            <label
              >Maschine<small v-if="machines && machines.length > 0">
                ({{ machines.length }})&nbsp;</small
              >
            </label>
            <v-select
              id="v-step-1"
              :loading="loadingMachines"
              :options="machines"
              v-model="selectedMachine"
              label="machineLabel"
              placeholder="Maschine wählen"
            >
            </v-select>
            <span v-if="selectedMachine" id="v-step-2" class="v-step-3">
              <editable-booking-calendar
                ref="machineCalender"
                class="pt-6"
                :resource="this.selectedMachine.id"
                :member="this.member"
                @reload="fetchBookings(member.id)"
              ></editable-booking-calendar>
            </span>
            <div v-if="selectedMachine" class="flex justify-end">
              <button
                class="input-button-primary v-step-4 shadow-md"
                @click="openModal"
                :disabled="this.$store.getters.getSelectedBookings.length <= 0"
              >
                <svg
                  class="fill-white cursor-pointer icon-button inline-block fill-current w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                  />
                </svg>
                {{ $t('confirm') }}
              </button>
            </div>
          </div>
        </div>
      </fieldset>

      <br />

      <fieldset id="v-step-0" class="table-fieldset">
        <legend>Deine Reservierungen</legend>
        <div class="flex pb-2 button-group">
          <button @click="fetchBookings(member.id)" class="gg-button flex">
            <svg
              style="fill: white"
              :class="{ 'spin-animation': loadingBookings }"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path
                d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"
              />
            </svg>
            <span class="pl-1">{{ $t('reload') }}</span>
          </button>
        </div>
        <div v-if="bookings">
          <table
            v-if="bookings?.length > 0"
            class="member-portal-table table-auto"
            style="margin: auto"
          >
            <thead>
              <tr>
                <th class="activity-date">Startzeit</th>
                <th class="activity-amount">Dauer</th>
                <th class="activity-status">Maschine</th>
                <th class="activity-description">Status</th>
                <th class="activity-description">Stornieren</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="booking of displayedBookings" :key="booking.id">
                <td class="activity-date">
                  {{
                    new Date(booking.fromDateTime).toLocaleDateString('de-AT')
                  }}
                </td>
                <td class="activity-amount">
                  {{
                    durationAsString(
                      new Date(booking.fromDateTime),
                      new Date(booking.untilDateTime),
                    )
                  }}
                </td>
                <td class="activity-status">
                  {{ booking.resource.name }}
                </td>
                <td class="invoice-status">
                  <div
                    v-if="booking.state"
                    class="bubble"
                    :class="getBookingStateClass(booking)"
                  >
                    {{ getBookingStateText(booking) }}
                  </div>
                </td>
                <td class="invoice-status">
                  <div v-if="loadingCancel && booking.id === loadingCancel">
                    <loading-spinner-inline v-if="true" />
                  </div>
                  <div
                    v-else-if="
                      !hasBeenCanceled(booking?.state) &&
                      !isInPast(booking?.untilDateTime)
                    "
                  >
                    <button
                      class="cancelButton"
                      @click="startCancellation(booking)"
                    >
                      <font-awesome-icon
                        :class="{ active: infoModalOpen }"
                        icon="trash"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
            <div class="text-center bg-white py-2">
              <button
                class="pagination-button"
                @click="previousPage"
                :disabled="currentPage === 1"
              >
                <font-awesome-icon icon="arrow-circle-left" />
              </button>
              <button
                class="pagination-button"
                @click="nextPage"
                :disabled="currentPage === totalPages"
              >
                <font-awesome-icon icon="arrow-circle-right" />
              </button>
              <div>
                <small class="mute-text"
                  >{{ currentPage }} / {{ totalPages }}</small
                >
              </div>
            </div>
          </table>
          <div v-else><p>Keine Reservierungen vorhanden.</p></div>
        </div>
      </fieldset>
    </section>
  </div>
</template>

<script>
import Vue, { ref } from 'vue';
import { helper } from '~/plugins/helper';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import EditableBookingCalendar from '@/components/calendar/EditableBookingCalendar.vue';
import VueTour from 'vue-tour';
import 'vue-tour/dist/vue-tour.css';
import Modal from '@/components/modals/Modal.vue';
import moment from 'moment/moment';
import { FABMAN_BOOKING_STATE } from '@/services/constants.js';
import Cookies from 'js-cookie';

Vue.use(VueTour);

export default {
  name: 'bookings',
  middleware: 'authenticated',
  // eslint-disable-next-line vue/no-unused-components
  components: { EditableBookingCalendar, vSelect, Modal },
  data() {
    return {
      isFirstVisit: true,
      isMobile: false,
      modalOpen: false,
      infoModalOpen: false,
      infoModalHeadline: '',
      infoModalText: '',
      infoModalSubmitMethod: '',
      selectedTableBooking: null,
      loadingMachines: false,
      loadingBookings: false,
      loadingCancel: null,
      machines: [],
      bookings: [],
      selectedMachine: null,
      steps: null,
      tourOptions: {
        labels: {
          buttonSkip: 'Überspringen',
          buttonPrevious: 'Zurück',
          buttonNext: 'Weiter',
          buttonStop: 'Fertig',
        },
      },
      currentPage: 1,
      rowsPerPage: 8,
    };
  },
  watch: {
    selectedMachine(value) {
      // Call method in child component
      const machineCalender = this.$refs.machineCalender;
      if (
        machineCalender &&
        typeof machineCalender.fetchBookings === 'function'
      ) {
        //TODO - await
        setTimeout(() => {
          machineCalender.fetchBookings();
          machineCalender.resetBookings(true);
        }, 250);
      }
    },
  },
  created() {
    this.isMobile = helper.isMobile();

    this.steps = this.createTourText();
  },
  async mounted() {
    // Load machines
    await this.fetchMachines();

    // Load machine bookings
    await this.fetchBookings(this.member.id);

    // Check first visit
    if (!Cookies.get('visited')) {
      Cookies.set('visited', 'true');
      this.isFirstVisit = true;
    }
  },
  computed: {
    tourStep2Text() {
      return this.isMobile
        ? "<b>Neue Reservierung: Schritt 2</b> <br><hr class='m-1'>Doppelklicke auf einen Zeitslot, um eine Buchung zu erstellen."
        : "<b>Neue Reservierung: Schritt 2</b> <br><hr class='m-1'>Ziehe mit gedrückter Maustaste einen Zeitslot in den Kalender, um eine Buchung zu erstellen.";
    },
    tourStep3Text() {
      return this.isMobile
        ? "<b>Neue Reservierung: Schritt 2</b> <br><hr class='m-1'>Halte eine Buchung gedrückt, um einen Termin wieder zu entfernen."
        : "<b>Reservierung löschen</b> <br><hr class='m-1'>Halte die Maustaste am gewünschten Zeitslot gedrückt, um einen Termin wieder zu entfernen.";
    },
    newBookings() {
      const bookings = this.$store.getters.getSelectedBookings;
      const readableBookings = bookings.slice();
      readableBookings.map(function (booking) {
        const date = moment(booking.fromDateTime).format('DD.MM.YYYY');
        const fromDateTime = moment(booking.fromDateTime).format('HH:mm');
        const untilDateTime = moment(booking.untilDateTime).format('HH:mm');
        booking.value = date + ': ' + fromDateTime + ' - ' + untilDateTime;
        booking.key = 'Zeitraum';
        return booking;
      });
      return readableBookings;
    },
    isLoading() {
      return (
        this.loadingBookings ||
        this.loadingMachines ||
        this.loadingCancel !== null
      );
    },
    member() {
      return this.$store.state.member;
    },
    displayedBookings() {
      const startIndex = (this.currentPage - 1) * this.rowsPerPage;
      const endIndex = startIndex + this.rowsPerPage;
      return this.bookings.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.bookings.length / this.rowsPerPage);
    },
  },
  methods: {
    getBookingStateClass(booking) {
      switch (booking.state) {
        case 'confirmed':
          return 'green';
        case 'cancelled':
          return 'red';
        default:
          return 'bubble grey';
      }
    },
    getBookingStateText(booking) {
      switch (booking.state) {
        case 'confirmed':
          return 'Gebucht';
        case 'cancelled':
          return 'Storno';
        default:
          return '';
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    openModal() {
      this.modalOpen = true;
    },
    confirmModal() {
      this.saveEvents();
    },
    closeModal() {
      this.modalOpen = false;
    },
    openInfoModal(text, submitMethod = null, headline = 'Bestätigen') {
      this.infoModalSubmitMethod = submitMethod;
      this.infoModalText = text;
      this.infoModalHeadline = headline;
      this.infoModalOpen = true;
    },
    confirmInfoModal() {
      if (
        typeof this?.infoModalSubmitMethod === 'string' &&
        this.$options.methods[this.infoModalSubmitMethod]
      ) {
        // TODO - open method generically
        console.log('open', this.infoModalSubmitMethod);
        // Call the given function by name
        this.cancelBooking(this.selectedTableBooking.id);
        // this.$options.methods[this.infoModalSubmitMethod](
        //   this.selectedTableBooking,
        // );
      }
    },
    closeInfoModal() {
      this.infoModalOpen = false;
      setTimeout(() => {
        this.infoModalSubmitMethod = '';
        this.infoModalText = '';
        this.infoModalHeadline = '';
      }, 1000);
    },
    isInPast(date) {
      return helper.dateIsInPast(date);
    },
    saveEvents() {
      this.closeModal();

      // Call method in child component
      const machineCalender = this.$refs.machineCalender;
      if (
        machineCalender &&
        typeof machineCalender.writeBookingsToFabman === 'function'
      ) {
        machineCalender.writeBookingsToFabman();
      }
    },
    durationInHours(fromDate, untilDate) {
      return parseInt(helper.getDifferenceInHours(fromDate, untilDate));
    },
    durationAsString(fromDate, untilDate) {
      const hours = this.durationInHours(fromDate, untilDate);
      return hours === 1 ? 'eine Stunde' : hours + ' Stunden';
    },
    async fetchMachines() {
      this.loadingMachines = true;
      await this.$store
        .dispatch('getMachines')
        .then((res) => {
          // Filter non visible machines
          const filteredMachines = res.filter(function (machine) {
            return machine.visibleForMembers && machine.canBeBooked;
          });

          // Add dropdown label to machine
          filteredMachines.map(function (machine) {
            machine.machineLabel = machine.name;
            return machine;
          });
          this.machines = filteredMachines;
        })
        .catch((error) => {
          console.log('Error! Could not load machines', error);
        })
        .finally(() => {
          this.loadingMachines = false;
        });
    },
    hasBeenCanceled(state) {
      return state === FABMAN_BOOKING_STATE.cancelled;
    },
    startCancellation(booking) {
      this.selectedTableBooking = booking;
      this.openInfoModal(
        'Möchtest du die ausgewählte Reservierung wirklich stornieren?',
        'cancelBooking',
        'Stornieren?',
      );
    },
    async cancelBooking(id) {
      if (!id) {
        id = this?.selectedTableBooking.id;
      }
      this.loadingCancel = id;
      await this.$store
        .dispatch('cancelBooking', id)
        .then((res) => {
          this.fetchBookings();
          this.closeInfoModal();
        })
        .catch((error) => {
          console.log('Error! Could not cancel booking', error);
        })
        .finally(() => {
          this.loadingCancel = null;
        });
    },
    async fetchBookings(memberId) {
      if (!memberId) {
        memberId = this.member.id;
      }
      this.loadingBookings = true;
      await this.$store
        .dispatch('getBookingsByMember', memberId)
        .then((res) => {
          this.bookings = res;
        })
        .catch((error) => {
          console.log('Error! Could not load bookings', error);
        })
        .finally(() => {
          this.loadingBookings = false;
        });
    },
    startTour() {
      // Start introduction tour
      this.$tours.myTour.scrollToOptions = {
        behavior: 'instant',
      };
      this.$tours.myTour.start();
    },
    createTourText() {
      return [
        {
          target: '#v-step-0',
          content:
            "<b>Reservierungen</b> <br><hr class='m-1'> Hier kannst du deine aktuellen Reservierungen sehen.",
          offset: -300,
          background: '#000',
        },
        {
          target: '#v-step-1',
          content:
            "<b>Neue Reservierung: Schritt 1</b> <br><hr class='m-1'> Wähle zuerst deine gewünschte Maschine aus.",
          offset: -300,
          background: '#000',
        },
        {
          target: '#v-step-2',
          content: this.tourStep2Text,
          offset: -100,
          background: '#000',
        },
        {
          target: '.v-step-3',
          content: this.tourStep3Text,
          offset: -100,
          background: '#000',
        },
        {
          target: '.v-step-4',
          content:
            "<b>Neue Reservierung: Schritt 3</b> <br><hr class='m-1'>Mit Klick auf <i>Bestätigen</i> werden die Reservierungen verbindlich gespeichert.",
          offset: -300,
          background: '#000',
        },
      ];
    },
  },
};
</script>
<style scoped lang="scss">
.custom-svg-style {
  width: 100px;
  height: 100px;
  fill: blue;
}
.table-fieldset {
  padding: 1rem;
}
button:disabled svg {
  color: grey;
}

.pagination-button {
  color: black;
}

.pagination-button:hover {
  color: $color-orange;
}

.booking-calendar {
  background-color: transparent;
}

.icon-button,
.icon-button-secondary {
  color: lightgrey;
  cursor: pointer;
}
.cancelButton {
  color: grey;
}
.cancelButton:hover {
  color: black;
}
.cancelButton:active {
  color: $color-secondary;
}
.icon-button:hover {
  fill: $color-secondary;
}
.icon-button-secondary:hover {
  fill: #0c0c0c;
}
.button-group {
  justify-content: end;
}
.v-step {
  background: black !important;
}
.spin-animation {
  animation: rotate 1s linear infinite;
}
.demo-button {
  height: 1em;
}
.info-arrow {
  height: 1.8em;
  transform: rotate(102deg);
  position: relative;
  top: -20px;
  left: 0;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@include media-breakpoint-down(xs) {
  .demo-button {
    height: 80px;
    width: 50px;
  }
  .info-arrow {
    height: 80px;
    left: 10px;
    position: relative;
    top: -30px;
    transform: rotate(102deg);
  }

  .table-fieldset {
    padding-right: 0;
    padding-left: 0;
  }
  .member-portal-table {
    thead {
      padding: 0;
      width: 100%;

      tr {
        padding: 0.6rem 0.1rem;

        th {
          min-width: 200px;
        }

        td {
          min-width: 200px;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
  .button-group {
    justify-content: center;
  }
}
.jump-animation {
  animation: jump 1s 3;
  transform-origin: center;
  animation-timing-function: ease-in-out;
}

@keyframes jump {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
