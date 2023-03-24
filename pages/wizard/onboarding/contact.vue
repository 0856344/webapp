<template>
  <div class="section">
    <form class="form">
      <div class="form-item" style="margin-top: 20px">
        <span class="label">{{ $t('dateOfBirth') }}<span class="red">*</span></span>
        <div>
        <input class="input-text" ref="firstInput" type="date" min="1900-01-01" max='2023-01-01'
               v-model="onboardingData.contactInformation.birthdate"
               name=""
               @change="checkBirthdate"/>
        <div class="date-error">
          <span
              v-if="!onboardingData.contactInformation.birthdateValid"
              class="bad"
          >{{ $t('tooYoung') }} </span>
        </div>
      </div>
      </div>
      <div class="form-item" style="margin-top: 0px" >
        <label ></label>
        <h5 style="margin: 0px">Für Personen bis zum vollendeten 18. Lebensjahr gelten besondere Konditionen nach unseren
<!--          <a href="https://a.storyblok.com/f/47294/x/ab97a83e24/gg_hausordnung.pdf"-->
<!--            target="new">AGB.</a>-->
          <nuxt-link
              target="_blank"
              to="/de/agb"
          >AGB.</nuxt-link>
        </h5>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('address') }}<span class="red">*</span></span>
        <input class="input-text" type="text" v-model="onboardingData.contactInformation.address" name=""/>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('zipCode') }}<span class="red">*</span></span>
        <input class="input-text" type="text" v-model="onboardingData.contactInformation.zip" name=""/>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('city/location') }}<span class="red">*</span></span>
        <input class="input-text" type="text" v-model="onboardingData.contactInformation.city" name=""/>
      </div>
<!--      <div class="form-item">-->
<!--        <span class="label">{{ $t('country') }}<span class="red">*</span></span>-->
<!--        <input class="input-text" type="text" v-model="onboardingData.contactInformation.country" name=""/>-->
<!--      </div>-->
      <div class="form-item">
        <span class="label">{{ $t('country') }}<span class="red">*</span></span>
        <select class="input-select" v-model="onboardingData.contactInformation.country">
          <option
              v-for="country in countries" :value="country.id" v-bind:key="country.id">
            {{ country.name }}
          </option>
        </select>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('phone') }}</span>
        <input class="input-text" type="text" v-model="onboardingData.contactInformation.phone" name=""/>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('companyCode') }}</span>
        <input class="input-text" type="text" v-model="onboardingData.contactInformation.companyCode" name=""/>
        <div class="button-row" v-if="onboardingData.contactInformation.companyCode">
        <button type="button"
            :class="['input-button-primary', { disabled: !companyCodeAvailable }]"
            :disabled="!companyCodeAvailable"
            @click="checkCompanyCode()"
        >
          {{'Code prüfen'}}
        </button>
        </div>

      </div>
      <div class="form-item" v-if="onboardingData.contactInformation.companyCodeValid" >
        <span class="label">Information</span>
        <span class="text-content">{{ companyInformation }}</span>
        <!--          <span class="label">{{ $t('address') }}<span class="red">*</span></span>-->
        <div class="button-row">
          <button type="button"
                  :class="['input-button-primary', { disabled: !onboardingData.contactInformation.companyCodeValid }]"
                  :disabled="!onboardingData.contactInformation.companyCodeValid"
                  @click="cleanCompanyCode()"
          >
            {{'Mitgliedschaft entfernen'}}
          </button>
        </div>
      </div>
      <div v-if="!hasAttendeesFreeCost">
        <div class="form-item">
          <span class="label">Rechnungsadresse</span>
          <div class="checkbox-wrapper" >
            <input id="checkbox" class="checkbox" type="checkbox"
                   :checked="onboardingData.contactInformation.hasBillingAddress"
                   v-model="onboardingData.contactInformation.hasBillingAddress" >
            <p class="text">weicht von Kontaktadresse ab</p>
          </div>
        </div>
        <div v-if="onboardingData.contactInformation.hasBillingAddress">
          <div class="form-item">
            <span class="label">{{ $t('firstName') }}<span class="red">*</span></span>
            <input class="input-text"  ref="firstInput" type="text" v-model="onboardingData.billingInformation.firstName" name=""
                   id="onboarding_userInformation_firstName"/>
          </div>
          <div class="form-item">
            <span class="label">{{ $t('lastName') }}<span class="red">*</span></span>
            <input class="input-text"  ref="firstInput" type="text" v-model="onboardingData.billingInformation.lastName" name=""
                   id="onboarding_userInformation_lastName"/>
          </div>
          <div class="form-item">
            <span class="label">{{ $t('address') }}<span class="red">*</span></span>
            <input class="input-text" type="text" v-model="onboardingData.billingInformation.address" name=""/>
          </div>
          <div class="form-item">
            <span class="label">{{ $t('zipCode') }}<span class="red">*</span></span>
            <input class="input-text" type="text" v-model="onboardingData.billingInformation.zip" name=""/>
          </div>
          <div class="form-item">
            <span class="label">{{ $t('city/location') }}<span class="red">*</span></span>
            <input class="input-text" type="text" v-model="onboardingData.billingInformation.city" name=""/>
          </div>
          <div class="form-item">
            <span class="label">{{ $t('country') }}<span class="red">*</span></span>
            <select class="input-select" v-model="onboardingData.billingInformation.country">
              <option
                  v-for="country in countries" :value="country.id" v-bind:key="country.id">
                {{ country.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

    </form>
  </div>
</template>

<script>

//import moment from 'moment'

export default {
  props: {
    onboardingData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      birthdate: null,
      countries: null
    }
  },
  async mounted () {
    //window.scrollTo(0, 0)
    this.$refs.firstInput.focus()
    this.countries = await this.$store.dispatch('getCountries')
  },
  beforeRouteEnter (to, from, next) {
    //console.log('CONTACT FROM: ', from.path)
    if ((from.path === '/wizard/onboarding/userInformation') || (from.path === '/wizard/onboarding/image')) {
      next()
    } else {
      next('/wizard/onboarding/userInformation')
    }
  },
  computed: {
    companyCodeAvailable () {
      if (this.onboardingData?.contactInformation?.companyCode &&
          this.onboardingData?.contactInformation?.companyCode.length > 5) {
        return true
      } else {
        return false
      }
    },
    companyInformation () {
      if (this.onboardingData.contactInformation.companyCodeValid && this.onboardingData.contactInformation.company) {
        //todo add information
        const information = 'Firmenabo von: ' + this.onboardingData.contactInformation.company?.lastName + ' wird eingelöst.'
        return information
      }
      return ''
    },
    hasAttendeesFreeCost () {
      return this.onboardingData?.contactInformation?.company?.metadata?.attendees_free_cost
    }

  },
  methods: {
    checkBirthdate () {
      //this.onboardingData.contactInformation.birthdate = null
      this.onboardingData.contactInformation.birthdateValid = false
      if (this.onboardingData.contactInformation.birthdate) {
        const birthDate = new Date(this.onboardingData.contactInformation.birthdate)
        const age = this.calculateAge(birthDate)
        if (age >= 14) {
          //this.onboardingData.contactInformation.birthdate = this.birthdate
          this.onboardingData.contactInformation.birthdateValid = true
        }
      }
    },

    calculateAge ($birthDate) {
      const currentDate = new Date()
      const difference = currentDate - $birthDate
      return Math.floor(difference / 31557600000)
    },

    async checkCompanyCode () {
      this.loading = true
      let payload = {
        companyCode: this.onboardingData.contactInformation.companyCode
      }
      // get captcha token
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('submit') // Execute reCAPTCHA with action "submit"
      const captchaData = {
        'g-recaptcha-response': token
      }
      payload = { ...payload, ...captchaData }
      return this.$store.dispatch('checkCompanyCode', payload).then((r) => {
        // this.mailCheck = true
        this.onboardingData.contactInformation.companyCodeValid = true
        this.onboardingData.contactInformation.company = r
        this.loading = false
      }).catch((e) => {
        this.onboardingData.contactInformation.companyCodeValid = false
        this.onboardingData.contactInformation.company = null
        this.loading = false
        const errorMsg = e?.response?.data?.msg
        if (e.error) {
          this.errorMessage = 'Ein Fehler ist aufgetreten: "' + e.error + '"'
        }
        if (errorMsg) {
          switch (errorMsg) {
            case 'code_invalid':
              this.$toast.show('Dieser Firmencode existiert nicht.', {
                theme: 'bubble'
              })
              break
            default:
              this.$toast.show('Ein Fehler ist aufgetreten: ', e.code, {
                theme: 'bubble'
              })
              break
          }
          //this.mailCheck = false
        }
      }
      )
    },
    cleanCompanyCode () {
      this.onboardingData.contactInformation.companyCodeValid = false
      this.onboardingData.contactInformation.companyCode = ''
      this.onboardingData.contactInformation.company = null
    }

  }
}
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
  //min-width: 27em;
  //@include media-breakpoint-down(md) {
  //  min-width: auto;
  //}
  //padding: 0 0 5px;
  //@include media-breakpoint-up(sm) {
  //  padding: 0 0 18px;
  //  display: grid;
  //  grid-template-columns: 28% 72%;
  //}
  //align-items: center;
  //.label {
  //  font-weight: bold;
  //  text-transform: uppercase;
  //  font-size: .7em;
  //}
  .checkbox-wrapper {
    padding-right: 20px;
    margin-right: 0;
    padding: 3px;
    //margin-bottom: 0;
    display: flex;
    .checkbox {
      max-width: 13px;
      max-height: 13px;
      margin-right: 5px;
      margin-top: 3px;
    }
    .text {
      display: flex;
      font-weight: lighter;
      text-transform: none;
      font-size: .7em;
      margin-top: 3px;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
    }
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
  .label {
    font-weight: bold;
    text-transform: uppercase;
    font-size: .7em;
  }
  .text-content {
    align-self: flex-end;
    font-weight: lighter;
    text-transform: none;
    font-size: .7em;

  }
  input {
    display: flex;
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
  .date-error {
    grid-column: 2;
  }
  .button-row {
    grid-column: 2;
    margin-bottom: 5px; // fix for some strange ios safari error
    .input-button-primary {
      align-self: flex-end;
      cursor: pointer;
      background-color: $color-orange;
      color: #FFF;
      min-width: 30%;
      border: 1px solid lighten($color-orange, 10);
      padding: 7px 12px 8px;
      line-height: 1;
      outline: none;
      //&:focus {
      //  background-color: $color-orange;
      //}
    }
    .input-button-primary:disabled {
      cursor: default;
      background-color: grey;
      border: 1px solid darkgrey;
    }
  }

  .bad {
    color: $color-orange;
    font-size: .7em;
    font-weight: bold;
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
</style>
