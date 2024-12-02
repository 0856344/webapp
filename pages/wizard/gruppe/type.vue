<template>
  <div class="section">
    <h3 class="mt-10 text-2xl font-bold">Willkommen in der GRAND GARAGE!</h3>
    <p class="mt-4">
      Wir freuen uns, dass du eine Gruppenmitgliedschaft in unserem MakerSpace abschließen möchtest.
    </p>
    <p class="mt-2">Welche Art der Gruppenmitgliedschaft soll abgeschlossen werden?</p>

    <form class="form mt-8">
      <div class="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <!-- Maker Auswahl -->
        <div
          class="w-full lg:w-1/2 p-6 border rounded-lg cursor-pointer relative transition-colors h-80 flex items-center justify-center"
          :class="onboardingData.type.selectedGroupType === 'maker' ? 'bg-orange-300 border-orange-500' : 'bg-orange-50 border-gray-300 hover:bg-orange-200'"
          @click="selectOption('maker')"
        >
          <!-- Icon im Hintergrund -->
          <div class="absolute inset-0 flex items-center justify-center opacity-40">
            <font-awesome-icon icon="wrench" class="text-gray-400" style="width: 100%; height: 100%;" />
          </div>

          <!-- Text Box -->
          <div class="relative z-10 bg-white p-4 rounded-md text-center">
            <h4 class="text-xl font-semibold">Maker</h4>
            <p>Du möchtest eine Gruppe anlegen und den MakerSpace genauso selber nutzen?</p>
          </div>
        </div>

        <!-- Organisator Auswahl -->
        <div
          class="w-full lg:w-1/2 p-6 border rounded-lg cursor-pointer relative transition-colors h-80 flex items-center justify-center"
        >
<!-- :class="onboardingData.type.selectedGroupType === 'organizer' ? 'bg-blue-300 border-blue-500' : 'bg-blue-50 border-gray-300 hover:bg-blue-200'"-->
          <!-- Icon im Hintergrund -->
          <div class="absolute inset-0 flex items-center justify-center opacity-40">
            <font-awesome-icon icon="users-cog" class="text-gray-400" style="width: 100%; height: 100%;" />
          </div>

          <!-- Text Box -->
          <div class="relative z-10 bg-white p-4 rounded-md text-center">
            <h4 class="text-xl font-semibold">Organisation</h4>
            <p>Du möchtest eine Gruppe anlegen und die Mitgliedschaften verwalten?</p>
            <p class="text-sm">(Kooperationspartner, Bildungseinrichtungen, Startups, ...)</p>
            <p class="my-8">
              Bitte kontaktiere den
              <a href="mailto:frontdesk@grandgarage.eu">Frontdesk</a> und wir klären die Anfrage persönlich.
            </p>
          </div>
        </div>
      </div>
      <p class="text-sm">Du hast bereits einen Kooperationscode bekommen? Dieser Code lässt sich im <a href="/wizard/onboarding/userInformation">Onboarding für Einzelmitgliedschaften</a> einlösen.</p>
    </form>
  </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {

  props: {
    onboardingData: {
      type: Object,
      required: true,
    },
  },
  components: {
    'font-awesome-icon': FontAwesomeIcon,
  },
  data() {
    return {
      //selectedGroupType: null,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    selectOption(option) {
      this.onboardingData.type.selectedGroupType = option;
      console.log(this.onboardingData.type.selectedGroupType)
    },
  },
};
</script>
