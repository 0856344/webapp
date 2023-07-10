<template>
  <div>
    <section>
      <modal
        :show="modalOpen"
        :header-text="'Buchung bestätigen?'"
        :content-text="'Sollen deine eingetragenen Termine verbindlich gespeichert werden?'"
        :data="newBookings"
        :submit-text="'Speichern'"
        :loading="isLoading"
        @close="closeModal"
        @confirm="confirmModal"
      >
      </modal>
      <v-tour name="myTour" :steps="steps"></v-tour>
      <div class="flex items-center mb-1">
        <h2 class="m-0 mr-2 text-2xl">
          {{ $t('machineBookings') }}
          <svg
            class="cursor-pointer icon-button inline-block fill-current w-5 h-5 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            @click="startTour"
            viewBox="0 0 512 512"
          >
            <path
              d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
            />
          </svg>
        </h2>
        <loading-spinner-inline v-if="isLoading" />
      </div>
      <br />
      <fieldset id="v-step-0" class="p-4">
        <legend>Deine Reservierungen</legend>
        <div v-if="bookings">
          <table
            v-if="bookings.length > 0"
            class="member-portal-table table-auto"
          >
            <thead>
              <tr>
                <th class="activity-date">Startzeit</th>
                <th class="activity-amount">Dauer</th>
                <th class="activity-description">Maschine</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="booking of displayedBookings" :key="booking.id">
                <td class="activity-date">
                  {{
                    new Date(booking.fromDateTime).toLocaleDateString('de-AT')
                  }}
                </td>
                <td class="activity-date">
                  {{
                    durationAsString(
                      new Date(booking.fromDateTime),
                      new Date(booking.untilDateTime),
                    )
                  }}
                </td>
                <td class="activity-description">{{ booking.resource }}</td>
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
            </div>
          </table>
          <div v-else><p>Keine Reservierungen vorhanden.</p></div>
        </div>
      </fieldset>

      <br />

      <fieldset class="p-4">
        <legend>Neue Reservierung</legend>
        <Alert
          :show="showInfoBox"
          :message="infoBoxMsg"
          :color="infoBoxColor"
        ></Alert>
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
              <machine-calendar
                class="pt-6"
                :resource="this.selectedMachine.id"
                @dateConflict="setDateConflict"
              ></machine-calendar>
            </span>
            <div v-if="selectedMachine" class="flex justify-end">
              <button
                class="input-button-primary v-step-4 shadow-md"
                @click="openModal"
                :disabled="dateConflict"
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
    </section>
  </div>
</template>

<script>
import Vue from 'vue';
import { helper } from '~/plugins/helper';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import MachineCalendar from '@/components/MachineCalendar.vue';
import VueTour from 'vue-tour';
import 'vue-tour/dist/vue-tour.css';
import Modal from '@/components/Modals/Modal.vue';
import Alert from '@/components/Alert.vue';
import moment from 'moment/moment';

Vue.use(VueTour);

export default {
  name: 'bookings',
  middleware: 'authenticated',
  // eslint-disable-next-line vue/no-unused-components
  components: { MachineCalendar, vSelect, VueTour, Modal, Alert },
  data() {
    return {
      modalOpen: false,
      loadingMachines: false,
      loadingBookings: false,
      machines: [],
      bookings: [],
      selectedMachine: null,
      steps: [
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
          content:
            "<b>Neue Reservierung: Schritt 2</b> <br><hr class='m-1'>Ziehe mit gedrückter Maustaste einen Zeitslot in den Kalender, um eine Buchung zu erstellen.",
          offset: -300,
          background: '#000',
        },
        {
          target: '.v-step-3',
          content:
            "<b>Reservierung löschen</b> <br><hr class='m-1'>Halte die Maustaste am gewünschten Zeitslot gedrückt, um einen Termin wieder zu entfernen.",
          offset: -300,
          background: '#000',
        },
        {
          target: '.v-step-4',
          content:
            "<b>Neue Reservierung: Schritt 3</b> <br><hr class='m-1'>Mit Klick auf <i>Bestätigen</i> werden die Reservierungen verbindlich gespeichert.",
          offset: -300,
          background: '#000',
        },
      ],
      currentPage: 1,
      rowsPerPage: 8,
      dateConflict: false,
      showInfoBox: false,
      infoBoxColor: '',
      infoBoxMsg: 'lorema sfasf saf saf sadf saf ',
    };
  },
  watch: {
    selectedMachine(value) {
      console.log('machine selected', value);
    },
  },
  async mounted() {
    // Load machines
    await this.fetchMachines();

    // Load machine bookings
    await this.fetchBookings(this.member.id);
  },
  computed: {
    newBookings() {
      console.log('newBookings', this.$store.getters.getSelectedBookings);
      const bookings = this.$store.getters.getSelectedBookings;
      const readableBookings = bookings.slice();
      readableBookings.map(function (booking) {
        const fromDateTime = moment(booking.fromDateTime).format(
          'DD.MM.YYYY HH:mm',
        );
        const untilDateTime = moment(booking.untilDateTime).format(
          'DD.MM.YYYY HH:mm',
        );
        console.log('fromDateTime', fromDateTime);
        console.log('untilDateTime', untilDateTime);
        booking.value = fromDateTime + ' - ' + untilDateTime;
        booking.key = 'Zeitraum';
        return booking;
      });
      return readableBookings;
    },
    isLoading() {
      return this.loadingBookings || this.loadingMachines;
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
    openInfoBox(msg, color = null) {
      this.infoBoxColor = color;
      this.infoBoxMsg = msg;
      this.showInfoBox = true;
    },
    setDateConflict(msg) {
      console.log('Date Conflict! show info box!');
      this.dateConflict = true;
      this.openInfoBox(msg, '#f55252fc');
    },
    // rememberBooking(event) {
    //   console.log('new Booking!', event);
    //   this.newBookings.push(event);
    // },
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
    saveEvents() {
      alert('Event saved!');
      this.closeModal();
    },
    startTour() {
      // Start introduction tour
      this.$tours.myTour.scrollToOptions = {
        behavior: 'instant',
      };
      this.$tours.myTour.start();
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
    async fetchBookings(memberId) {
      this.loadingBookings = true;
      await this.$store
        .dispatch('getBookingsByMember', memberId)
        .then((res) => {
          this.bookings = res;
          console.log('bookings', res);
        })
        .catch((error) => {
          console.log('Error! Could not load bookings', error);
        })
        .finally(() => {
          this.loadingBookings = false;
        });
    },
  },
};
</script>
<style scoped lang="scss">
button:disabled svg {
  color: grey;
}

.pagination-button {
  color: black;
}

.pagination-button:hover {
  color: $color-orange;
}

.machine-calendar {
  background-color: transparent;
}

.icon-button {
  color: lightgrey;
  cursor: pointer;
}

.icon-button:hover {
  fill: $color-orange;
}

.v-step {
  background: black !important;
}
</style>
