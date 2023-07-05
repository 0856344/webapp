<template>
  <div v-show="show">
    <div
      :style="{ backgroundColor: color }"
      class="flex text-white justify-between align-middle border px-4 py-3 rounded relative mt-2 mb-2"
      role="alert"
    >
      <span>
        <b>Holy smokes!</b>
        <span class="block sm:inline">Something seriously bad happened.</span>
      </span>
      <span>
        <span class="close-button" @click="toggle">
          <svg
            class="fill-current h-6 w-6"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            />
          </svg>
        </span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: Boolean,
    color: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // add data here
    };
  },
  methods: {
    toggle: function () {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped lang="scss">
.close-button {
  color: white;
  fill: white;
}

.close-button:hover {
  color: $color-black;
  fill: $color-black;
}
</style>
