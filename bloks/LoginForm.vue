<template>
  <div class="login-form" @keyup.enter="submit">
    <div class="header-item">
      <div class="form-item space">
        <div class="headline">
          {{ $t("toGGCommunityLogin") }}
        </div>
      </div>
      <div class="close" @click="close">
        <font-awesome-icon icon="times" />
      </div>
    </div>
    <div class="form-item">
      <span class="label"> {{ $t("email") }}</span>
      <input
        v-model="email"
        class="input"
        type="text"
        :placeholder="[[$t('yourE-mailAddress')]]"
        @input="clearErrorMessage"
      />
    </div>
    <div class="form-item">
      <span class="label"> {{ $t("password") }}</span>
      <input
        v-model="password"
        class="input"
        type="password"
        :placeholder="[[$t('yourPassword')]]"
        @input="clearErrorMessage"
      />
    </div>
    <div v-if="errorMessage" class="error-message">
      <span>{{ errorMessage }}</span>
    </div>
    <div class="form-item button-row">
      <input
        class="input-button-primary"
        type="submit"
        value="Login"
        @click="submit"
      />
    </div>
    <div class="subtitle" @click="register">
      <font-awesome-icon class="icon" icon="user-friends" />
      <span style="font-weight: bold"> {{ $t("joinNow") }}</span>
    </div>
    <div class="subtitle" @click="recover">
      <font-awesome-icon class="icon" icon="key" />
      <span>{{ $t("resetPassword") }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
  data() {
    return {
      email: "",
      password: "",
      errorMessage: null,
    };
  },
  computed: {},
  methods: {
    close() {
      this.$store.dispatch("setSidebar", null);
    },
    register() {
      this.close();
      this.$router.push("/de/mitgliedschaften");
    },
    recover() {
      this.$store.dispatch("setSidebar", "recover");
    },
    submit() {
      const data = {
        email: this.email,
        password: this.password,
      };
      localStorage.setItem(
        "pathToLoadAfterLogin",
        this.$router.currentRoute.fullPath
      );
      this.$store
        .dispatch("loginUser", data)
        .then((r) => {})
        .catch((e) => {
          this.errorMessage = e.description || e.error || e.code;
        });
    },
    clearErrorMessage() {
      this.errorMessage = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  padding: 5vw;
  background-color: $color-bright-bg;
  .header-item {
    margin-bottom: 40px;
    display: flex;
    & > div {
      &.space {
        flex: 1;
        display: flex;
        flex-flow: column;
        align-items: flex-start;
      }
      &.close {
        margin-left: 2em;
        .close-icon {
          cursor: pointer;
          height: 1.1em;
        }
      }
    }
    .headline {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 15px;
      font-family: $font-secondary;
    }
  }
  .subtitle {
    font-size: 0.9em;
    margin-top: 0.5em;
    font-family: $font-mono;
    cursor: pointer;
    & .icon {
      width: 2em;
    }
    &:hover {
      color: $color-orange;
    }
  }

  .form-item {
    padding: 0 0 18px;
    display: grid;
    @include media-breakpoint-up(sm) {
      grid-template-columns: 28% 72%;
    }
    align-items: center;
    .label {
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.7em;
    }
    .input {
      outline: none;
      border: 1px solid #fff;
      flex-grow: 1;
      padding: 5px 10px;
      @include media-breakpoint-down(xs) {
        margin: 1vh 0;
      }
      &:focus {
        border-color: $color-orange;
      }
    }
    &.button-row {
      display: flex;
      justify-content: flex-end;
    }
    input[type="submit"],
    button {
      cursor: pointer;
      background-color: $color-orange;
      color: #fff;
      min-width: 35%;
      border: 1px solid lighten($color-orange, 10);
      padding: 7px 12px 8px;
      line-height: 1;
      outline: none;
      width: 35%;
      &:hover {
        font-weight: bold;
      }
    }
  }
  .checkbox-item {
    padding: 10px;
    display: flex;
    .checkbox-wrapper {
      padding-right: 20px;
      outline: none;
      text-align: right;
      user-select: none;
      flex: 1;
      max-width: 180px;
    }
    label {
      user-select: none;
    }
  }
  .error-message {
    font-size: 14px;
    font-family: $font-mono;
    padding: 5px 0;
    display: flex;
    color: red;
  }
}
</style>
