<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: 'bg-blue',
    },
    textColor: {
      type: String,
      default: 'text-white',
    }
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    bgColorClass() {
      return this.bgColor;
    },
    textColorClass() {
      return this.textColor;
    }
  },
  methods: {
    toggle: function () {
      this.show = !this.show;
    },
    beforeEnter: function (el) {
      el.style.height = "0";
    },
    enter: function (el) {
      el.style.height = el.scrollHeight + 10 + "px";
    },
    beforeLeave: function (el) {
      el.style.height = el.scrollHeight + "px";
    },
    leave: function (el) {
      el.style.height = "0";
    },
  },
};
</script>

<template>
  <div :class="['shadow-gray-400 shadow-md rounded-lg font-bold', bgColorClass]">
    <div
        :class="['relative uppercase h-12 pt-2 pr-10 pl-4 cursor-pointer font-bold text-xl', textColorClass]"
        @click="toggle"
    >
      <slot name="header"></slot>
      <span
          class="absolute top-2 right-4 transition-transform text-2xl"
          :class="{ 'rotate-180 -translate-y-1': show }"
      >
      <font-awesome-icon icon="fa-solid fa-angle-down" />
      </span>
    </div>
    <transition
        name="accordion"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
        :class="'transition-all'"
    >
      <div
          class="overflow-hidden bg-white border-2 border-t-0 rounded-b-lg border-white transition-all"
          v-show="show"
      >
        <div class="py-2 px-3 h-full break-words">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
