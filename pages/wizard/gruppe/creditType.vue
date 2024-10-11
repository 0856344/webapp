<template>
  <div class="section">
    <h3 class="mt-10 text-2xl font-bold">Willkommen in der GRAND GARAGE!</h3>
    <p class="mt-4">
      Wir freuen uns, dass du eine Gruppenmitgliedschaft in unserer Innovationswerkstatt abschließen möchtest.
    </p>
    <p class="mt-2">Wie sollen die monatlichen Credits aufgeteilt werden? </p>

    <form class="form mt-8">
      <div class="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <!-- Maker Auswahl -->
        <div
          class="w-full lg:w-1/2 p-6 border rounded-lg cursor-pointer relative transition-colors h-80 flex items-center justify-center"
          :class="onboardingData.creditType.selectedCreditType === 'split' ? 'bg-orange-300 border-orange-500' : 'bg-orange-50 border-gray-300 hover:bg-orange-200'"
          @click="selectOption('split')"
        >
          <!-- Icon im Hintergrund -->
          <div class="absolute inset-0 flex items-center justify-center opacity-40">
            <font-awesome-icon icon="people-group" class="text-gray-400" style="width: 100%; height: 100%;" />
          </div>

          <!-- Text Box -->
          <div class="relative z-10 bg-white p-4 rounded-md text-center opacity-90">
            <h4 class="text-xl font-semibold">Fair geteilt</h4>
            <p>Die Credits werden auf alle Mitglieder gleichmäßig aufgeteilt. *</p>
          </div>
        </div>

        <!-- Organisator Auswahl -->
        <div
          class="w-full lg:w-1/2 p-6 border rounded-lg cursor-pointer relative transition-colors h-80 flex items-center justify-center"
          :class="onboardingData.creditType.selectedCreditType === 'pot' ? 'bg-blue-300 border-blue-500' : 'bg-blue-50 border-gray-300 hover:bg-blue-200'"
          @click="selectOption('pot')"
        >
          <!-- Icon im Hintergrund -->
          <div class="absolute inset-0 flex items-center justify-center opacity-40">
            <font-awesome-icon icon="arrows-to-circle" class="text-gray-400" style="width: 100%; height: 100%;" />
          </div>

          <!-- Text Box -->
          <div class="relative z-10 bg-white p-4 rounded-md text-center opacity-90">
            <h4 class="text-xl font-semibold">Ein Topf</h4>
            <p>Die Credits sind bei der Organisation oder dem Haupt:Maker hinterlegt. *</p>
          </div>
        </div>
      </div>
      <p>*wenn die Credits aufgebraucht sind, werden die Kosten der hinterlegten Organisation oder Haupt-Maker verrechnet.</p>
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
  methods: {
    selectOption(option) {
      this.onboardingData.creditType.selectedCreditType = option;
      console.log(this.onboardingData.creditType.selectedCreditType)
    },
  },
};
</script>
