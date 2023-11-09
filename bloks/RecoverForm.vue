<template>
  <div class="recover-form">
    <div v-if="loading">
      <loading-spinner color="black" />
    </div>
    <div v-else>
      <div class="header-item">
        <div class="space">
          <div class="headline">
            <div>
              <div class="back" @click="login">
                <font-awesome-icon icon="angle-left" />
              </div>
              <span class="text"> {{ $t("resetPassword") }}</span>
            </div>
            <div class="close" @click="close">
              <font-awesome-icon icon="times" />
            </div>
          </div>
          <div class="info">
            {{ $t("pleaseEnterEmail") }}
          </div>
        </div>
      </div>
      <div class="form-item">
        <span class="label"> {{ $t("email") }}</span>
        <input
          ref="email"
          v-model="email"
          type="email"
          :placeholder="[[$t('yourE-mailAddress')]]"
          @input="checkMail"
        />
      </div>
      <div class="form-item button-row">
        <button :disabled="!email.length" @click="submit">
          {{ $t("send") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
  data() {
    return {
      email: "",
      loading: false,
    };
  },
  methods: {
    close() {
      this.$store.dispatch("setSidebar", null);
    },
    async submit() {
      this.loading = true;
      const data = {
        email: this.email,
      };
      await this.$store.dispatch("recoverPassword", data);
      this.loading = false;
      this.$store.dispatch("setSidebar", "recover-success");
    },
    login() {
      this.$store.dispatch("setSidebar", "login");
    },
    clearError() {
      this.errorMessage = null;
      this.errorDescription = "";
    },
    checkName() {
      this.clearError();
    },
    checkMail() {
      this.clearError();
    },
    checkPassword() {
      this.clearError();
    },
  },
};
</script>

<style lang="scss">
.recover-form {
  padding: 5vw;
  background-color: $color-bright-bg;
  width: 35em;
  .header-item {
    display: flex;
    margin-bottom: 40px;
    & > div {
      .back,
      .close {
        display: inline-flex;
      }
      .close {
        margin-left: 6em;
      }
      .back:hover,
      .close:hover {
        color: $color-orange;
        cursor: pointer;
      }
    }
    .headline {
      & .text {
        vertical-align: top;
      }
      & .back {
        margin-right: 1em;
      }
      display: flex;
      justify-content: space-between;
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 15px;
      font-family: $font-secondary;
    }
    .info {
      font-size: 0.9em;
      line-height: 1.3;
    }
    .subtitle {
      font-size: 0.9rem;
      color: $color-orange;
      font-family: $font-mono;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .form-item {
    padding: 0 0 5px;
    @include media-breakpoint-up(sm) {
      padding: 0 0 18px;
      display: grid;
      grid-template-columns: 28% 72%;
    }
    align-items: center;
    .label {
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.7em;
    }
    input {
      outline: none;
      flex-grow: 1;
      padding: 5px 10px;
      @include media-breakpoint-down(xs) {
        margin: 1vh 0;
      }
      background: #fff;
      border: 1px solid #fff;
      width: 100%;
      &:focus {
        border-color: $color-orange;
      }
    }
    .password-wrapper {
      position: relative;
      .password-status {
        position: absolute;
        right: 10px;
        top: 50%;
        background-color: $color-orange;
        height: 0.5em;
        width: 0.5em;
        padding: 0;
        margin-top: -0.25em;
        border-radius: 50%;
      }
    }
    .password-error {
      grid-column: 2;
    }
    &.button-row {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 80px; // fix for some strange ios safari error
    }
    button {
      background-color: $color-orange;
      color: #fff;
      border: 1px solid lighten($color-orange, 10);
      padding: 7px 13px 9px;
      line-height: 1;
      outline: none;
      &:focus {
        background-color: lighten($color-orange, 10);
      }
      &:disabled {
        background-color: #aaa;
        border-color: #999;
        cursor: not-allowed;
      }
    }
    .bad {
      color: $color-orange;
      font-size: 0.7em;
      font-weight: bold;
    }
  }
  .checkbox-item {
    padding: 8px 0;
    display: flex;
    .checkbox-wrapper {
      padding-right: 0.5em;
      outline: none;
      user-select: none;
      max-width: 180px;
    }
    label {
      user-select: none;
      flex: 1;
      font-size: 0.7em;
      letter-spacing: 0.03em;
      line-height: 1.2;
      font-weight: 700;
    }
  }
  .disclaimer {
    color: #333;
    a {
      color: $color-orange;
      padding: 0 3px;
    }
  }
  .error-message {
    color: red;
    .policy {
      font-size: 0.8em;
      color: #333;
      > ul {
        list-style-type: circle;
        padding: 0 0 0 1em;
        > li {
          margin: 0.4em 0 0 0;
          > ul {
            padding: 0 0 0 1em;
            list-style-type: circle;
            > li {
              margin: 0.4em 0 0 0;
            }
          }
        }
      }
    }
  }
}
</style>
