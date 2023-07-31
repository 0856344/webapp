<template>
  <transition name="fade">
    <div
      class="modal"
      @click="close"
    >
      <div class="container">
        <div class="top">
          <div class="title">
            {{ $t( "covid-19-information" ) }}
          </div>
        </div>
        <div class="content">
          <slot />
        </div>
        <div class="buttons">
          <button
            class="button-primary"
            @click="close"
          >
            {{ $t( "understood" ) }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false,
      default: null
    }
  },
  mounted () {
    window.addEventListener('scroll', this.close)
  },
  methods: {
    close () {
      this.$emit('close')
      sessionStorage.setItem('hasSeenPopup', 'true')
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
}
</script>

<style lang="scss" scoped>

.modal {
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw !important;
  height: 100vh !important;
  background: repeating-linear-gradient(
          45deg,
          rgba(0, 0, 0, 0.3),
          rgba(0, 0, 0, 0.3) 70px,
          rgba(0, 0, 0, 0.8) 70px,
          rgba(0, 0, 0, 0.8) 140px
  );
  & .container {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: -20em;
    border: 4px solid $color-yellow;
    padding: 3em;
    background: white;
    width: 40em;
    height: 18em;
    text-align: center;
    font-family: $font-mono;
    @include media-breakpoint-down(sm) {
      margin: 0;
      height: initial;
    }
    & .top {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      margin-bottom: 1em;
      & .title {
        width: 100%;
        font-size: 1.5em !important;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3em;
        margin-bottom: 0.5em;
      }
    }
    & .content {
      justify-content: flex-start;
      padding: 1em;
      line-height: 1.3em;
    }
    & .buttons {
      margin-top: 1em;
      display: flex;
      justify-content: center;
      align-items: center;
      & .button-primary {
        font-family: $font-mono;
        background: black;
        padding: 1em;
        color: white;
        outline: 0;
        border: 1px solid black;
        border-radius: 1em;
        width: 15em;
        cursor: pointer;
      }
      & .button-primary:hover {
        font-weight: bold;
      }
    }
  }
}
</style>
