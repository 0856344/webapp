<template>
  <transition name="fade">
    <div v-show="show" class="fade-transition fade-div">
      <div
        v-if="!closed"
        :style="{ backgroundColor: color }"
        class="fade-transition info-box flex text-white justify-between align-middle border px-4 py-3 rounded relative my-3"
        :class="[customCssClass, color !== '#f55252fc' ? 'text-center' : 'text-left']"
        role="alert"
        style="min-height: 60px"
      >
        <span class="flex-1">
          <span class="block sm:inline">
            <font-awesome-icon :icon="icon"></font-awesome-icon><span v-show="headline.length > 0" style="display:inline;padding: 0 0 0 10px;margin: 0;">{{ headline }}</span>
            <span v-html="message" class="alert-message"></span>
          </span>
        </span>
        <span v-show="closeable">
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
      <div v-else-if="dismissible" class="my-3" style="transition: 0.3s">
        <font-awesome-icon
          class="clickable-icon"
          icon="info-circle"
          @click="toggle"
        ></font-awesome-icon>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    show: Boolean,
    message: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
      required: false,
      default: ''
    },
    customCssClass: {
      type: String,
      required: false,
      default: ''
    },
    color: {
      type: String,
      default: '#72a4b2',
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: 'info-circle',
    },
    closeable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      closed: false,
    };
  },
  methods: {
    toggle: function () {
      this.closed = !this.closed;
    },
  },
};
</script>

<style scoped lang="scss">
.info-box {
  display: flex;
  opacity: 0.9;
  transition: 0.3s;
}

.close-button {
  color: white;
  fill: white;
}

.close-button:hover {
  color: $color-black;
  fill: $color-black;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s; /* Adjust the duration as needed */
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.fade-enter-to /* .fade-enter-active in <2.1.8 */ {
  opacity: 1;
}
.alert-message ul {
  display: inline-flex;
  list-style-type: disc;
  flex-direction: column;
  padding: 0;
  margin: 10px 0 10px 30px;
}
</style>
