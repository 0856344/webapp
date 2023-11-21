<template>
  <div class="section">
    <h3 style="margin-top: 40px">Willkommen in der GRAND GARAGE!</h3>
    <p>
      Wir freuen uns darauf, dass du Mitglied in unserer Innovationswerkstatt
      wirst.
    </p>
    <p>{{ $t("beforeYouCanStart") }}</p>
    <form class="form">
      <div class="form-item">
        <span class="label"
          >{{ $t("firstName") }}<span class="red">*</span></span
        >
        <input
          class="input-text"
          ref="firstInput"
          type="text"
          v-model="onboardingData.userInformation.firstName"
        />
      </div>
      <div class="form-item">
        <span class="label"
          >{{ $t("lastName") }}<span class="red">*</span></span
        >
        <input
          class="input-text"
          type="text"
          v-model="onboardingData.userInformation.lastName"
        />
      </div>
      <div class="form-item">
        <span class="label">{{ $t("gender") }}<span class="red">*</span></span>
        <select
          class="input-select"
          v-model="onboardingData.userInformation.gender"
        >
          <option
            :key="gender.id"
            :value="gender.internalName"
            v-for="gender in genders"
          >
            {{ gender.displayName }}
          </option>
        </select>
      </div>
      <div class="form-item">
        <span class="label">{{ $t("email") }}<span class="red">*</span></span>
        <input
          class="input-text"
          type="text"
          v-model="onboardingData.userInformation.email"
          @input="checkMail"
        />
      </div>

      <div class="form-item">
        <span class="label">{{ $t("password") }}</span>
        <div class="password-wrapper">
          <input
            v-model="password"
            :class="{ red: invalidFields.includes('password') }"
            type="password"
            placeholder=""
            @input="checkPassword"
          />
          <div v-if="!passwordValid" class="form-item password-status" />
        </div>
      </div>
      <div class="form-item">
        <span class="label">{{ $t("reenterPassword") }}</span>
        <div class="password-wrapper">
          <input v-model="passwordRepeat" type="password" placeholder="" />

          <div class="password-error">
            <div v-if="!passwordRepeatIsEqual">
              <span class="bad">{{ $t("passwordsDoNotMatch") }} </span>
              <br />
            </div>
            <div v-if="passwordTooShort">
              <span class="bad">{{ $t("passwordTooShort") }} </span>
              <br />
            </div>
            <div v-if="password && !passwordComplexity">
              <span class="bad"
                >Das Passwort muss sowohl Ziffern als auch Groß- und
                Kleinschreibung enthalten.</span
              >
              <br />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import validator from "validator";

export default {
  props: {
    onboardingData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      genders: [
        { id: 1, displayName: "männlich", internalName: "male" },
        { id: 2, displayName: "weiblich", internalName: "female" },
        { id: 3, displayName: "andere", internalName: "other" },
        { id: 4, displayName: "keine Angabe", internalName: "empty" },
      ],
      loading: false,
      invalidFields: [],
      email: "",
      password: "",
      passwordRepeat: "",
      firstName: "",
      lastName: "",
      errorMessage: null,
      errorDescription: "",
      emailInvalid: false,
    };
  },
  async mounted() {
    if (this.$route.query.plan) {
      const availablePackages = await this.$store.dispatch("getPackages");
      const memberPackage = availablePackages.find(
        (p) =>
          p.name === decodeURIComponent(this.$route.query.plan).toUpperCase()
      );
      if (memberPackage !== undefined) {
        this.onboardingData.payment.membership = memberPackage;
      }
    }
    this.$refs.firstInput.focus();
  },
  computed: {
    passwordValid() {
      if (
        this.passwordRepeatIsEqual &&
        !this.passwordTooShort &&
        this.passwordComplexity
      ) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.onboardingData.userInformation.password = this.password;
        return true;
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.onboardingData.userInformation.password = null;
        return false;
      }
    },
    passwordRepeatIsEqual() {
      if (this.password === this.passwordRepeat) {
        return true;
      } else {
        return false;
      }
    },
    passwordTooShort() {
      if (this.password && this.password.length < 8) {
        return true;
      } else {
        return false;
      }
    },
    passwordComplexity() {
      if (this.password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\x20-\x7E]*$/;
        return passwordRegex.test(this.password);
      } else {
        return false;
      }
    },
    emailValid() {
      return validator.isEmail(this.email);
    },
  },
  methods: {
    checkMail() {
      this.onboardingData.userInformation.emailOk = false;
      if (validator.isEmail(this.onboardingData.userInformation.email)) {
        this.onboardingData.userInformation.emailOk = true;
      }
    },
    clearError() {
      this.errorMessage = null;
      this.errorDescription = "";
    },

    checkPassword() {
      this.clearError();
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin-left: -6em;

  @include media-breakpoint-down(md) {
    margin-left: 0em;
  }
}

.red {
  color: $color-red;
}

.form-item {
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

.red {
  border-color: red !important;
}
</style>
