<template>
  <div style="overflow: hidden">
    <CookieManager v-if="modalVisible" @close="modalVisible = false" icon="exclamation-triangle">
    </CookieManager>
    <div class="login-spacer" v-if="isAuthenticated"></div>
    <div class="layout-container">
      <top-header/>
      <div v-if="this.$route.path ==='/de/datenschutzerklaerung' || !modalVisible">
      <div class="main-body">
        <main id="main" role="main">
          <div><nuxt/></div>
        </main>
      </div>
    </div>
      <div><bottom-footer/></div>
      <div><sidebar /></div>
      <div><notifications position="bottom right" /></div>
    </div>
  </div>
</template>

<script>
import TopHeader from '@/bloks/TopHeader.vue'
import BottomFooter from '@/bloks/basic/BottomFooter.vue'
import Sidebar from '@/components/Sidebar.vue'
import CookieManager from '../components/CookieManager.vue'

export default {
  data: () => ({
    modalVisible: false
  }),
  components: {
    TopHeader,
    BottomFooter,
    Sidebar,
    CookieManager
  },
  computed: {
    isAuthenticated () {
      return !!this.$store.state.auth
    }
  },
  async mounted () {
    const hasSeenPopup = localStorage.getItem('hasSeenPopup')
    if (!hasSeenPopup) {
      this.modalVisible = true
    }
    const hasAcceptedNecessaryCookie = localStorage.getItem('hasAcceptedNecessaryCookie')
    if (hasAcceptedNecessaryCookie) {
      this.$store.commit('setNecessaryCookie', 'true')
    }
    const hasAcceptedAnalyticsCookie = localStorage.getItem('hasAcceptedNecessaryCookie')
    if (hasAcceptedAnalyticsCookie === 'true') {
      this.$store.commit('setAnalyticsCookie', 'true')
    }
  }
}
</script>
<style lang="scss">

.main-body {
  max-width: 1264px;
  width: 100%;
  background: none;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  flex-flow: column;
}

* {
  box-sizing: border-box;
}

a {
  color: $color-orange;
  text-decoration: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.page-enter-active, .page-leave-active {
  transition: all .30s ease-out;
}
.page-enter, .page-leave-active {
  opacity: 0;
  transform-origin: 50% 50%;
}

.layout-container {
  margin-top: 65px;
  overflow: hidden;
}

.login-spacer {
  height: 26px;
  display: block;
}

h3 {
  margin-top: 1em;
  font-weight: bold;
  font-size: 3rem;
  @include media-breakpoint-down(sm) {
    font-size: 2rem;
  }
}
.pretix-widget-alert-holder {
  display: none;
}

.form {
  margin: 0 1em 2em;
  .form-item {
    display: grid;
    @include media-breakpoint-up(sm) {
      grid-template-columns: 28% 72%;
    }
    margin-bottom: 1em;

    .label {
      @include media-breakpoint-up(sm) {
        text-align: right;
      }
      font-weight: bold;
      text-transform: uppercase;
      font-size: .7em;
      margin:  7px 10px 0 0;
    }
    .input-text, .input-textarea {
      outline: none;
      border: 1px solid #fff;
      flex-grow: 1;
      padding: 5px 10px;
      width: 100%;
      max-width: 100%;
      font-size: .8em;
      @include media-breakpoint-down(xs) {
        margin: 1vh 0;
      }
      &:focus {
        border-color: $color-orange;
      }
    }
    .input-textarea {
      height: 10em;
      min-height: 30vh;
      line-height: 1.8;
      resize: vertical;
    }
    .input-select {
      outline: none;
      border: 1px solid #fff;
      flex-grow: 1;
      padding: 5px 10px;
      width: 100%;
      max-width: 100%;
      font-size: .8em;
      background-color: #FFF;
      @include media-breakpoint-down(xs) {
        margin: 1vh 0;
      }
      &:focus {
        border-color: $color-orange;
      }
    }
  }
  .button-row {
    text-align: right;
    .input-button-primary {
      cursor: pointer;
      background-color: $color-orange;
      color: #FFF;
      min-width: 30%;
      border: 1px solid lighten($color-orange, 10);
      padding: 7px 12px 8px;
      line-height: 1;
      outline: none;
      &:focus {
        background-color: lighten($color-orange, 10);
      }
    }
  }
  .body {
    flex: 3;
    textarea,
    input {
      width: 100%;
    }
  }
}

</style>
