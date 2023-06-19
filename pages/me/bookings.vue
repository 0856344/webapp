<template>
  <div>
    <section>
      <div class="flex items-center mb-1">
        <h2 class="m-0 mr-1 text-2xl">{{ $t("machineBookings") }}</h2>
        <loading-spinner-inline v-if="isLoading" />
      </div>
      <br />
      <fieldset>
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
              ></label
            >
            <v-select
              :loading="loadingMachines"
              :options="machines"
              v-model="selectedMachine"
              label="machineLabel"
              placeholder="Maschine wählen"
            >
            </v-select>
            <machine-calendar
              v-if="selectedMachine"
              :resource="this.selectedMachine.id"
            ></machine-calendar>
          </div>
        </div>
      </fieldset>
    </section>
  </div>
</template>

<script>
import { helper } from "~/plugins/helper";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import MachineCalendar from "@/components/MachineCalendar.vue";

export default {
  name: "bookings",
  middleware: "authenticated",
  components: { MachineCalendar, vSelect },
  data() {
    return {
      loadingMachines: false,
      loadingBookings: false,
      machines: [],
      bookings: [],
      selectedMachine: null,
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
</style>
