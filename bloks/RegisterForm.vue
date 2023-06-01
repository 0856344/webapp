<template>
  <div class="register-form">
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
              <span class="text">{{ $t('becomeACommunityPart') }}</span>
            </div>
            <div
              class="close"
              @click="close"
            >
              <font-awesome-icon icon="times" />
            </div>
          </div>
          <div class="info">
            {{ $t('firstStepsInTheGG') }} </div>
        </div>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('firstName') }} </span>
        <input
          v-model="firstName"
          :class="{ red: invalidFields.includes('firstName')} "
          type="text"
          :placeholder= "[[ $t('firstName') ]]"
          @input="checkName"
        >
      </div>
      <div class="form-item">
        <span class="label">{{ $t('lastName') }} </span>
        <input
          v-model="lastName"
          :class="{ red: invalidFields.includes('lastName')}"
          type="text"
          :placeholder="[[ $t('lastName') ]]"
          @input="checkName"
        >
      </div>
      <div class="form-item">
        <span class="label">{{ $t('email') }} </span>
        <input
          ref="email"
          v-model="email"
          :class="{ red: invalidFields.includes('email') }"
          type="email"
          :placeholder= "[[ $t('yourE-mailAddress') ]]"
          @input="checkMail"
        >
      </div>
      <div class="form-item">
        <span class="label">{{ $t('address') }}</span>
        <input
          ref="address"
          v-model="address"
          :class="{ red: invalidFields.includes('address') }"
          type="text"
          :placeholder= "[[ $t('streetAndHouseNumber') ]]"
          @input="checkAddress"
        >
      </div>
      <div class="form-item">
        <span class="label">{{ $t('city') }}</span>
        <input
          ref="city"
          v-model="city"
          :class="{ red: invalidFields.includes('city') }"
          type="text"
          :placeholder= "[[ $t('city') ]]"
          @input="checkCity"
        >
      </div>
      <div class="form-item">
        <span class="label">{{ $t('zipCode') }}</span>
        <input
          ref="zip"
          v-model="zip"
          :class="{ red: invalidFields.includes('zip') }"
          type="text"
          :placeholder= "[[ $t('zipCode') ]]"
          @input="checkZip"
        >
      </div>
      <div class="form-item">
        <span class="label">{{ $t('password') }}</span>
        <div class="password-wrapper">
          <input
            v-model="password"
            :class="{ red: invalidFields.includes('password') }"
            type="password"
            placeholder=""
            @input="checkPassword"
          >
          <div
            v-if="!passwordValid"
            class="form-item password-status"
          />
        </div>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('reenterPassword') }}</span>
        <input
          v-model="passwordRepeat"
          type="password"
          placeholder=""
        >
        <div class="password-error">
          <span
            v-if="!passwordValid"
            class="bad"
          >{{ $t('passwordsDoNotMatch') }}</span>
        </div>
      </div>
      <div class="checkbox-item">
        <div class="checkbox-wrapper">
          <input
            id="agb"
            v-model="agb"
            :class="{ red: invalidFields.includes('agb') }"
            type="checkbox"
          >
        </div>
        <label for="agb">{{ $t('iHaveReadThe') }}<nuxt-link
          target="_blank"
          to="/de/agb"
        >{{ $t('conditionsOfParticipation') }} </nuxt-link> {{ $t('andAcceptTheTermsAndConditions') }}</label>
      </div>
      <div class="checkbox-item">
        <div class="checkbox-wrapper">
          <input
            id="dsg"
            v-model="dsg"
            :class="{ red: invalidFields.includes('dsg') }"
            type="checkbox"
          >
        </div>
        <label for="dsg">{{ $t('iHaveReadThe') }}<nuxt-link
          target="_blank"
          to="/de/datenschutzerklaerung"
        >{{ $t('dataPrivacyPolicy') }}</nuxt-link> {{ $t('andAcceptTheTermsAndConditions') }}</label>
      </div>
      <!--
      <div class="checkbox-item">
        <div class="checkbox-wrapper">
          <input type="checkbox" id="newsletter" v-model="newsletter" />
        </div>
        <label for="newsletter">Ich bin damit einverstanden, Newsletter an meine angegebene E-Mail Adresse zu erhalten.</label>
      </div>
      -->
      <div
        v-if="errorMessage"
        class="form-item error-message"
      >
        <span />
        <div>
          <span>{{ errorMessage }}</span>
          <markdown
            v-if="errorDescription"
            class="policy"
            :value="errorDescription"
          />
        </div>
      </div>
      <div class="form-item button-row">
        <button class="input-button-primary" @click="submit">
          {{ $t('register') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import validator from 'validator'

export default {
  props: ['blok'],
  data () {
    return {
      email: '',
      address: '',
      city: '',
      zip: '',
      password: '',
      passwordRepeat: '',
      firstName: '',
      lastName: '',
      agb: false,
      dsg: false,
      newsletter: false,
      errorMessage: null,
      errorDescription: '',
      loading: false,
      emailInvalid: false,
      invalidFields: []
    }
  },
  computed: {
    passwordValid () {
      return this.password === this.passwordRepeat
    },
    emailValid () {
      return validator.isEmail(this.email)
    },
    formValid () {
      return this.passwordValid && this.emailValid && this.agb && this.dsg && this.firstName && this.lastName && this.address && this.city && this.zip
    },
    showEmailError () {
      return this.email !== ''
    },
    showPasswordError () {
      return this.password !== ''
    }
  },
  methods: {
    close () {
      this.$store.dispatch('setSidebar', null)
    },
    submit () {
      if (!this.formValid) {
        this.invalidFields.length = 0
        if (!this.emailValid) {
          //console.log('### NOT VALID1')
          this.invalidFields.push('email', true)
        }
        if (!this.firstName) {
          //console.log('### NOT VALID2')
          this.invalidFields.push('firstName', true)
        }
        if (!this.lastName) {
          //console.log('### NOT VALID3')
          this.invalidFields.push('lastName', true)
        }
        if (!this.address) {
          //console.log('### NOT VALID4')
          this.invalidFields.push('address', true)
        }
        if (!this.city) {
          //console.log('### NOT VALID5')
          this.invalidFields.push('city', true)
        }
        if (!this.zip) {
          //console.log('### NOT VALID6')
          this.invalidFields.push('zip', true)
        }
        if (!this.password) {
          //console.log('### NOT VALID7')
          this.invalidFields.push('password', true)
        }
        if (!this.agb) {
          //console.log('### NOT VALID8')
          this.invalidFields.push('agb', true)
        }
        if (!this.dsg) {
          //console.log('### NOT VALID9')
          this.invalidFields.push('dsg', true)
        }
        return
      }
      //console.log('### VALID')
      this.loading = true
      const data = {
        email: this.email,
        password: this.password,
        user_metadata: {
          firstName: this.firstName,
          lastName: this.lastName,
          address: this.address,
          city: this.city,
          zip: this.zip
        }
      }
      this.$store.dispatch('registerUser', data).then((r) => {
        this.loading = false
        this.$store.dispatch('setSidebar', 'register-success')
      }).catch((e) => {
        this.loading = false
        if (e.error) {
          this.errorMessage = 'Ein Fehler ist aufgetreten: "' + e.error + '"'
          return
        }
        if (e.code) {
          switch (e.code) {
            case 'user_exists':
              this.errorMessage = 'Ein User mit dieser Email Adresse existiert bereits'
              break
            case 'invalid_password':
              this.errorMessage = 'Das Passwort ist zu schwach.'
              this.errorDescription = e.policy
              break
            default:
              this.errorMessage = 'Ein Fehler ist aufgetreten: "' + e.code + '"'
              break
          }
        }
      })
    },
    login () {
      this.$store.dispatch('setSidebar', 'login')
    },
    clearError () {
      this.errorMessage = null
      this.errorDescription = ''
    },
    checkName () {
      this.clearError()
    },
    checkMail () {
      this.clearError()
    },
    checkAddress () {
      this.clearError()
    },
    checkCity () {
      this.clearError()
    },
    checkZip () {
      this.clearError()
    },
    checkPassword () {
      this.clearError()
    }
  }
}
</script>

<style lang="scss">

.register-form {
  padding: 5vw;
  background-color: $color-bright-bg;
  .header-item {
    display: flex;
    margin-bottom: 40px;
    & > div {
      .back, .close {
        display: inline-flex;
      }
      .back:hover, .close:hover {
        color: $color-orange;
        cursor:pointer
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
      font-size: .7em;
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
        height: .5em;
        width: .5em;
        padding: 0;
        margin-top: -.25em;
        border-radius: 50%
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
      color: #FFF;
      border: 1px solid lighten($color-orange, 10);
      padding: 7px 13px 9px;
      line-height: 1;
      outline: none;
      &:focus {
        background-color: lighten($color-orange, 10);
      }
      &:disabled {
        background-color: #AAA;
        border-color: #999;
        cursor: not-allowed;
      }
    }
    .bad {
      color: $color-orange;
      font-size: .7em;
      font-weight: bold;
    }
  }
  .checkbox-item {
    padding: 8px 0;
    display: flex;
    .checkbox-wrapper {
      padding-right: .5em;
      outline: none;
      user-select: none;
      max-width: 180px;
    }
    label {
      user-select: none;
      flex: 1;
      font-size: .7em;
      letter-spacing: .03em;
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
          margin: .4em 0 0 0;
          > ul {
            padding: 0 0 0 1em;
            list-style-type: circle;
            > li {
              margin: .4em 0 0 0;
            }
          }
        }
      }
    }
  }

  .red {
    border-color: red !important;
  }
}
</style>
