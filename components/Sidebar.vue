<template>
  <transition name="fade">
    <div v-if="sidebar" class="sidebar">
      <div class="backdrop" @click="close" />
      <transition name="slide" appear>
        <login-form v-if="sidebar === 'login'" class="pane" />
        <register-form v-else-if="sidebar === 'register'" class="pane" />
        <register-success-form
          v-else-if="sidebar === 'register-success'"
          class="pane"
        />
        <recover-form v-else-if="sidebar === 'recover'" class="pane" />
        <recover-success-form
          v-else-if="sidebar === 'recover-success'"
          class="pane"
        />
      </transition>
    </div>
  </transition>
</template>

<script charset="utf-8">
export default {
  computed: {
    sidebar() {
      return this.$store.state.sidebar;
    },
  },
  created() {},
  methods: {
    close() {
      this.$store.dispatch("setSidebar", null);
    },
    login() {
      this.$store.dispatch("setSidebar", "login");
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  z-index: 5000;
  top: 0;
  width: 100%;
  height: 100%;
  .backdrop {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  .pane {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    @include media-breakpoint-up(lg) {
      max-width: 50vw;
    }
    @include media-breakpoint-down(md) {
      max-width: 60vw;
    }
    @include media-breakpoint-down(sm) {
      max-width: 100vw;
    }

    overflow: auto;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
</style>
