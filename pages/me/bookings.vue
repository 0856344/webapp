<template>
  <div>
    <section>
      <v-tour name="myTour" :steps="steps"></v-tour>
      <div class="flex items-center mb-1">
        <h2 class="m-0 mr-1 text-2xl">
          {{ $t("machineBookings") }}
          <svg
            class="cursor-pointer icon-button inline-block fill-current w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            @click="startTour"
            viewBox="0 0 512 512"
          >
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
            />
          </svg>
        </h2>
        <loading-spinner-inline v-if="isLoading" />
      </div>
      <br />
      <fieldset id="v-step-0">
        <legend>Deine Reservierungen</legend>
        <button @click="startTour">Tour</button>
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
              <tr v-for="booking of bookings" :key="booking.id">
                <td class="activity-date">
                  {{
                    new Date(booking.fromDateTime).toLocaleDateString("de-AT")
                  }}
                </td>
                <td class="activity-date">
                  {{
                    durationAsString(
                      new Date(booking.fromDateTime),
                      new Date(booking.untilDateTime)
                    )
                  }}
                </td>
                <td class="activity-description">{{ booking.resource }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else><p>Keine Reservierungen vorhanden.</p></div>
        </div>
      </fieldset>

      <br />

      <fieldset>
        <legend>Neue Reservierung</legend>
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
            <span
              id="v-step-2"
              class="v-step-3 v-step-4"
              v-if="selectedMachine"
            >
              <machine-calendar
                class="pt-6"
                :resource="this.selectedMachine.id"
              ></machine-calendar>
            </span>
            <button class="input-button-primary" @click="saveEvents">
              <font-awesome-icon icon="floppy-disk" />
              Bestätigen
            </button>
          </div>
        </div>
      </fieldset>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import { helper } from "~/plugins/helper";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import MachineCalendar from "@/components/MachineCalendar.vue";
import VueTour from "vue-tour";
import "vue-tour/dist/vue-tour.css";
Vue.use(VueTour);

export default {
  name: "bookings",
  middleware: "authenticated",
  // eslint-disable-next-line vue/no-unused-components
  components: { MachineCalendar, vSelect, VueTour },
  data() {
    return {
      loadingMachines: false,
      loadingBookings: false,
      machines: [],
      bookings: [],
      selectedMachine: null,
      steps: [
        {
          target: "#v-step-0",
          content:
            "<b>Reservierungen</b> <br><hr class='m-1'> Hier kannst du deine aktuellen Reservierungen sehen.",
          offset: -300,
        },
        {
          target: "#v-step-1",
          content:
            "<b>Neue Reservierung: Schritt 1</b> <br><hr class='m-1'> Wähle zuerst deine gewünschte Maschine aus.",
          offset: -300,
        },
        {
          target: "#v-step-2",
          content:
            "<b>Neue Reservierung: Schritt 2</b> <br><hr class='m-1'>Ziehe mit gedrückter Maustaste einen Zeitslot in den Kalender, um eine Buchung zu erstellen.",
          offset: -300,
        },
        {
          target: ".v-step-3",
          content:
            "<b>Reservierung löschen</b> <br><hr class='m-1'>Halte die Maustaste gedrückt, um einen, noch nicht bestätigten, Termin wieder zu entfernen.",
          offset: -300,
        },
        {
          target: ".v-step-4",
          content:
            "<b>Neue Reservierung: Schritt 3</b> <br><hr class='m-1'>Mit Klick auf <i>Bestätigen</i> werden die Reservierungen verbindlich gespeichert.",
          offset: -300,
        },
      ],
    };
  },
  watch: {
    selectedMachine(value) {
      console.log("machine selected", value);
    },
  },
  async mounted() {
    console.log("member", this.member);

    // Load machines
    await this.fetchMachines();

    // Load machine bookings
    await this.fetchBookings(this.member.id);
  },
  computed: {
    isLoading() {
      return this.loadingBookings || this.loadingMachines;
    },
    member() {
      return this.$store.state.member;
    },
  },
  methods: {
    saveEvents() {
      alert("Event saved!");
    },
    startTour() {
      // Start introduction tour
      this.$tours.myTour.scrollToOptions = {
        behavior: "instant",
      };
      this.$tours.myTour.start();
    },
    durationInHours(fromDate, untilDate) {
      return parseInt(helper.getDifferenceInHours(fromDate, untilDate));
    },
    durationAsString(fromDate, untilDate) {
      const hours = this.durationInHours(fromDate, untilDate);
      return hours === 1 ? "eine Stunde" : hours + " Stunden";
    },
    async fetchMachines() {
      this.loadingMachines = true;
      await this.$store
        .dispatch("getMachines")
        .then((res) => {
          // Filter non visible machines
          const filteredMachines = res.filter(function (machine) {
            return machine.visibleForMembers && machine.canBeBooked;
          });

          console.log("machines size", filteredMachines.length);

          // Add dropdown label to machine
          filteredMachines.map(function (machine) {
            machine.machineLabel = machine.name;
            return machine;
          });
          this.machines = filteredMachines;
          console.log("this.machines", this.machines);
        })
        .catch((error) => {
          console.log("Error! Could not load machines", error);
        })
        .finally(() => {
          this.loadingMachines = false;
        });
    },
    async fetchBookings(memberId) {
      this.loadingBookings = true;
      await this.$store
        .dispatch("getBookingsByMember", memberId)
        .then((res) => {
          this.bookings = res;
          console.log(res);
        })
        .catch((error) => {
          console.log("Error! Could not load bookings", error);
        })
        .finally(() => {
          this.loadingBookings = false;
        });
    },
  },
};
</script>
<style scoped lang="scss">
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
</style>
