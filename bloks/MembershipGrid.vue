<template>
  <div v-editable="blok" class="membership-grid">
    <div class="membership-info">
      <div>
        <div v-if="blok.title" class="title">
          {{ blok.title }}
        </div>

        <div v-if="blok.info" class="info">
          <markdown :value="blok.info" />
        </div>
      </div>
      <div class="image">
        <img :src="$resizeImage(blok.image, '500x0')" alt="" />
      </div>
    </div>
    <div class="membership-details">
      <div class="payment-options">
        <div class="payment-options-title">
          {{ $t('paymentInterval') }}
        </div>
        <div class="pricetabs">
          <div
            class="pricetab"
            :class="priceView == 'monthly' ? 'active' : ''"
            @click="setPriceView('monthly')"
          >
            {{ $t('monthly') }}
          </div>
          <div
            class="pricetab"
            :class="priceView == 'annually' ? 'active' : ''"
            @click="setPriceView('annually')"
          >
            {{ $t('yearly') }}
          </div>
        </div>
      </div>
      <div class="membership-plans">
        <component
          :is="blok.component"
          v-for="blok in blok.columns"
          :key="blok.uid"
          :blok="blok"
          :price-view="priceView"
        />
      </div>
      <div v-if="!isAuthenticated" class="login-register-info">
        <p>Registriere dich jetzt und werde Mitglied</p>
        <div class="register-button">
          <button @click="register">Jetzt Mitglied werden</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  data() {
    return {
      priceView: 'monthly',
    };
  },
  computed: {
    hasUser() {
      return !!this.$store.state.member;
    },
    isAuthenticated() {
      return !!this.$store.state.auth;
    },
  },
  methods: {
    setPriceView(v) {
      this.priceView = v;
    },
    register() {
      this.$router.push('/wizard/onboarding/userInformation');
    },
    login() {
      this.$store.dispatch('setSidebar', 'login');
    },
  },
};
</script>

<style lang="scss" scoped>
.membership-grid {
  margin: 10vh 0;
  @include media-breakpoint-down(lg) {
    @include margin-page-wide;
  }
  display: flex;
  @include media-breakpoint-down(md) {
    flex-direction: column;
  }
  .membership-info {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    @include media-breakpoint-down(sm) {
      flex-direction: column;
    }

    .title {
      position: relative;
      font-size: 2.8rem;
      @include media-breakpoint-down(lg) {
        font-size: 2.35rem;
      }
      @include media-breakpoint-down(xs) {
        font-size: 1.8rem;
      }
      line-height: 1.3;
      font-weight: bold;
      font-family: $font-primary;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      width: 50%;
    }
    .image {
      @include media-breakpoint-down(md) {
        display: flex;
        align-self: center;
      }
      img {
        display: block;
        max-width: 100%;
        @include media-breakpoint-up(lg) {
          max-width: 90%;
        }
        height: auto;
        max-height: 30vh;
        margin-top: 5%;
      }
    }
    .info {
      margin-top: 0;
      padding: 0;
      width: 80%;
      @include media-breakpoint-down(md) {
        width: 95%;
      }
      font-size: 1rem;
      letter-spacing: 0.04em;
      line-height: 1.6;
    }
  }
  .membership-details {
    flex-basis: 50%;
    .payment-options {
      display: flex;
      @include media-breakpoint-down(md) {
        flex-direction: column;
        .payment-options-title {
          margin: 2em 0 1em 0;
        }
      }
      margin: 0 0 3vh;
      align-items: center;
      justify-content: center;
      font-size: 0.8em;
      text-transform: uppercase;

      .payment-options-title {
        font-weight: bold;
        margin-right: 0.7em;
      }
      .pricetabs {
        display: inline-flex;
        .pricetab {
          cursor: pointer;
          padding: 0.4em 1em;
          &.active {
            background-color: $color-orange;
            border-radius: 1em;
            color: #fff;
          }
        }
      }
    }
    .membership-plans {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    .login-register-info {
      font-size: 1rem;
      letter-spacing: 0.03em;
      line-height: 1.4;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        max-width: 500px;
        span {
          font-size: 1.2rem;
          color: $color-orange;
          font-weight: bold;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .register-button {
        text-align: center;
        button {
          outline: none;
          cursor: pointer;
          font-size: 1.2em;
          font-weight: bold;
          color: #fff;
          border: none;
          padding: 15px;
          background-color: $color-orange;
          margin: 1.5em 0;
          transition: background-color 0.3s linear;
          &:hover {
            background-color: saturate(darken($color-orange, 5%), 100%);
          }
        }
      }
    }
  }
}
</style>
