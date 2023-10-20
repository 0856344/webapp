<template>
  <div
    v-editable="blok"
    :id="this.$vnode.key"
    class="grid grid-rows-plan-mobile lg:grid-rows-plan w-72 transition lg:w-full duration-300 rounded-lg group lg:self-auto"
    :class="[
      {
        'lg:shadow-md lg:shadow-blue-700 lg:scale-105 hover:cursor-pointer':
          selected,
      },
      { 'hover:cursor-cell': !selected },
    ]"
    @click="selectPlan"
  >
    <div
      class="inline-flex items-center justify-center gap-4 bg-gray-900 rounded-t-lg border-x-2 border-t-2 border-x-gray-900 border-t-gray-900 text-white"
    >
      <h2
        class="uppercase transition-transform duration-300"
        :class="{ 'group-hover:scale-110': !selected }"
      >
        {{ blok.name }}
      </h2>
      <div
        class="flex items-center justify-center w-8 h-8 text-gray-900 rounded-full transition-transform duration-300 text- bg-white"
        :class="{ 'group-hover:-rotate-12 ': !selected }"
      >
        {{ `${blok.age_limit}+` }}
      </div>
    </div>
    <div
      v-for="item in features"
      :key="item?._uid"
      class="inline-flex items-center justify-center px-2 py-1 text-sm text-center border-b-2 border-x-2 hyphens-auto transition duration-300 border-x-gray-900 border-b-gray-900"
      :class="[
        { 'bg-white': selected },
        { 'bg-gray-100 group-hover:bg-white': !selected },
      ]"
    >
      <div v-if="!isMobile">
        <span
          v-if="item == 'Coming Soon'"
          class="text-xl text-gray-400 transition duration-300"
          >{{ item.toUpperCase() }}</span
        >
        <font-awesome-icon
          v-else-if="item != ''"
          :icon="['fas', 'check']"
          class="text-3xl"
        />
        <span v-else class="text-6xl text-gray-300 transition duration-300"
          >×</span
        >
      </div>
      <div v-else class="flex flex-col items-center">
        <span
          v-if="item.startsWith(comingSoonPrefix)"
          class="px-2 w-max font-bold bg-yellow rounded-md text-gray-900"
          >Coming Soon</span
        >
        <span>{{ item.replace(comingSoonPrefix, "") }}</span>
      </div>
    </div>
    <div
      class="inline-flex flex-col items-center justify-center px-2 py-1 text-sm text-center border-b-2 border-x-2 hyphens-auto transition duration-300 border-x-gray-900 border-b-gray-900"
      :class="[
        { 'bg-white': selected },
        { 'bg-gray-100 group-hover:bg-white': !selected },
      ]"
    >
      <span class="text-xl font-bold">{{ blok.credits }} Credits</span>
      <span v-if="isMobile">{{ $t("creditsDescription") }}</span>
    </div>
    <div
      class="inline-flex items-center justify-center gap-2 px-2 text-gray-900 border-b-2 rounded-b-lg border-x-2 transition duration-300 border-gray-900"
      :class="[
        { 'bg-orange text-white': selected },
        { 'bg-yellow': !selected },
      ]"
    >
      <span class="text-2-xl">EUR</span>
      <h2
        class="text-5xl leading-3 uppercase transition-transform duration-300"
        :class="{ 'group-hover:scale-110': !selected }"
      >
        {{ `${blok.price},-` }}
      </h2>
      <span class="text-2-xl">pro Monat</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok", "strings", "isMobile", "comingSoon"],
  mounted() {
    //we emit a custom event to notify the button component that a plan has been selected
    this.$root.$on("plan-selected", (data) => {
      if (data.plan !== this.blok.name) {
        this.selected = false;
        this.highlighted = false;
      }
    });
  },
  data() {
    return {
      highlighted: false,
      selected: false,
      //this is a little bit hacky but implementing the coming
      //soon feature would be a lot more complicated on mobile
      comingSoonPrefix: "[CS]",
    };
  },
  computed: {
    /**
     * Returns an array of features for the current plan
     *
     * Construct an array from the object this.strings by looking up values in
     * this.blok.features array and using an empty string if the value is not found
     * or 'Coming Soon' if the value is found and the key is in this.comingSoon
     * @returns {Array} features
     */

    features() {
      const features = Object.entries(this.strings).map(([key, value]) => {
        if (
          this.blok.features.includes(value) &&
          this.comingSoon.includes(key)
        ) {
          if (!this.isMobile) {
            //in the desktop view we want to show "coming soon"
            return "Coming Soon";
          } else {
            //in the mobile view we add a prefix to the string that will be removed later
            return this.comingSoonPrefix + value;
          }
        }
        return this.blok.features.includes(value) ? value : "";
      });
      //we don't want to show empty grid rows in the mobile view
      if (this.isMobile) {
        return features.filter((feature) => feature !== "");
      }
      return features;
    },
  },
  methods: {
    selectPlan() {
      if (this.selected) {
        this.$router.push({
          path: "/wizard/onboarding/userInformation",
          query: { plan: this.blok.name },
        });
      } else {
        this.selected = true;
        this.$root.$emit("plan-selected", { plan: this.blok.name });
      }
    },
  },
};
</script>
