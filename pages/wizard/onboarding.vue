<template>
  <div
      class="wizard"
  >
    <div class="header">
      <font-awesome-icon
          class="icon"
          icon="user-friends"
      />
      <h2>{{ $t('joinNow') }}</h2>
      <p>{{ $t('becomeAMemberIn4simpleSteps') }}</p>
    </div>
    <div class="wizard-section">
      <div class="wizard-section-menu">
        <div class="steps">
          <div
              :key="i"
              v-for="s,i in steps"
              class="step"
              :class="{ 'icon': index > i, 'color': index >= i}"
          >
            <span
                v-if="!i"
                class="dot"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 230 200"
              ><path
                  d="M20 130l40 40L200 30"
                  stroke-width="25"
                  fill="none"
                  stroke="#FFF"
              /></svg>
            </span>
            <span
                v-else
                class="dot"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 230 200"
              ><path
                  d="M20 130l40 40L200 30"
                  stroke-width="25"
                  fill="none"
                  stroke="#FFF"
              /></svg>
            </span>
          </div>
        </div>
      </div>
      <div class="wizard-section-content">
        <NuxtChild
            :key="$route.params.slug"
            :onboarding-data="onboardingData"
        />
      </div>
      <div class="wizard-section-nav">
        <div class="form">
          <div class="button-row">
            <button
                v-if="activeStep === 'confirmation'"
                class="input-button-primary"
                @click="gotoASUorOpenLogin()"
            >
              <font-awesome-icon icon="arrow-circle-right"/> {{ $t('startSafetyTraining') }}
            </button>
            <button
                v-else-if="index > 0"
                class="input-button-primary"
                @click="back()"
            >
              {{ $t('back') }}
            </button>
            <button
                v-if="activeStep !== 'confirmation'"
                :class="['input-button-primary', { disabled: !nextStepDisabled }]"
                :disabled="nextStepDisabled"
                @click="next()"
            >
              {{ activeStep === 'payment' ? 'Anmeldung abschließen' : 'Weiter' }}
            </button>
          </div>
        </div>
        <div v-if="activeStep === 'confirmation'" class="confirmation-footer">
          {{ $t('nextStepsAfterASU') }}
          <br>
          <p style="margin-bottom: 7px">{{ $t('ourOpeningHours') }} </p>
            <a href="https://grandgarage.eu/de/kontakt" target="_blank">
              {{ 'https://grandgarage.eu/de/kontakt' }}
            </a>
          <p style="margin-top: 20px">{{ $t('weAreLookingForwardToWelcomeYou') }}</p>
        </div>
      </div>
      <p v-if="loadingEmail" >{{this.loadingCheckEmailStatus}}</p>
      <loading-spinner v-if="this.loadingEmail" class="loading-spinner ml-05"/>
    </div>

  </div>
</template>

<script>

import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'
Vue.use(VueReCaptcha, {
  //TODO: use functions to inject keys?
  siteKey: process.env.RECAPTCHA_SITE_KEY,
  loaderOptions: {
    autoHideBadge: true
  }
})

const MemberType = {
  member: 1,
  corporate: 2,
  corporate_freeCost: 3
}
export default {
  data () {
    return {
      loading: false,
      loadingEmail: false,
      loadingCheckEmailStatus: '',
      mailCheck: false,
      MemberType,
      steps: ['userInformation', 'contact', 'image', 'payment', 'confirmation'],
      onboardingData: {
        //image: null,
        image64: null,
        //imageUrl: null,
        userInformation: {
          firstName: null,
          lastName: null,
          gender: null,
          email: null,
          password: null,
          registered: false,
          emailOk: false
        },
        contactInformation: {
          birthdate: null,
          birthdateValid: false,
          name: null,
          address: null,
          zip: null,
          city: null,
          country: null,
          phone: null,
          companyCode: null,
          companyCodeValid: false,
          company: null,
          hasBillingAddress: false
        },
        billingInformation: {
          firstName: null,
          lastName: null,
          address: null,
          zip: null,
          city: null,
          country: null
        },
        payment: {
          iban: null,
          bookStorage: [],
          membership: null,
          sepaMandat: false,
          agb: false,
          accountOwner: null,
          accountOwnerLegalAge: false,
          privacyPolicy: false,
          ibanIsValid: false,
          startDate: new Date().toISOString().split('T')[0]
        },
        profile: {
          address: null,
          address2: null,
          city: null,
          zip: null,
          phone: null,
          birthdate: null,
          company: null
        },
        referrer: ''
      },
      invoiceContact: {}
    }
  },
  computed: {
    activeStep () {
      return this.$route.path.split('/')[3] || 'index'
    },
    nextStepDisabled () {
      const data = this.onboardingData
      switch (this.activeStep) {
        case 'index':
          return false
        case 'userInformation': {
          const requiredKeys = ['firstName', 'lastName', 'gender', 'email', 'password']
          return ((!!requiredKeys.filter(k => !data.userInformation[k]).length) || !data.userInformation.emailOk)
        }
        case 'contact': {
          const data = this.onboardingData
          const requiredKeys = ['birthdate', 'address', 'zip', 'city', 'country']
          const requiredKeysInvoiceContact = ['firstName', 'lastName', 'address', 'zip', 'city', 'country']
          if (data.contactInformation.country === 'XX') return true
          const allInvoiceContactFieldsSet = (!requiredKeysInvoiceContact.filter(k => !data.billingInformation[k]).length)
          // if another invoice contact (checkbox) is selected, then the additional fields are required to proceed
          if (data.contactInformation.hasBillingAddress && !allInvoiceContactFieldsSet) {
            return true
          }
          return ((!!requiredKeys.filter(k => !data.contactInformation[k]).length || !data.contactInformation.birthdateValid))
        }
        case 'image': {
          return this.onboardingData.image64 === null
        }
        case 'payment': {
          const membershipType = this.getMemberType()
          // if company & free cost
          if (membershipType === MemberType.corporate_freeCost) {
            if (data.payment.agb && data.payment.privacyPolicy) {
              return false
            }
          }
          // if company & no free cost
          if (membershipType === MemberType.corporate) {
            if (data.payment.agb && data.payment.privacyPolicy && data.payment.sepaMandat && data.payment.ibanIsValid && data.payment.accountOwnerLegalAge && data.payment.accountOwner) {
              return false
            }
          }
          // if no company member
          if (membershipType === MemberType.member) {
            if (data.payment.agb && data.payment.privacyPolicy && data.payment.sepaMandat && data.payment.ibanIsValid && data.payment.accountOwnerLegalAge && data.payment.accountOwner && data.payment.membership && data.payment.startDate) {
              return false
            }
          }
          return true
        }
        case 'done': {
          return data.referrer === ''
        }
        default:
          return false
      }
    },
    index () {
      return this.steps.indexOf(this.activeStep)
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    // TODO delete, clean up, unused & deprecated
    getData () {
      if (sessionStorage.getItem('onboardingData')) {
        this.onboardingData = JSON.parse(sessionStorage.getItem('onboardingData'))
      }
      const user = this.$store.state.user
      for (const key of Object.keys(this.onboardingData.profile)) {
        if (Object.prototype.hasOwnProperty.call(user, key)) {
          this.onboardingData.profile[key] = user.profile[key]
        }
      }
    },
    // saveUserData () {
    //   this.$store.dispatch('updateUser', Object.assign({}, this.onboardingData.profile))
    // },
    saveOnboardingData () {
      sessionStorage.setItem('onboardingData', JSON.stringify(this.onboardingData))
    },
    back () {
      const ni = this.index - 1 < 0 ? 0 : this.index - 1
      let path = this.steps[ni]
      if (ni === 0) {
        path = 'userInformation'
      }
      this.$router.push('/wizard/onboarding/' + path)
    },
    async next () {
      switch (this.activeStep) {
        case 'index':
          this.loadNextPage()
          this.saveOnboardingData()
          break
        case 'userInformation':
          this.mailCheck = false
          // will go to next page if email is valid
          await this.checkLoginDataAndProceed()
          this.saveOnboardingData()
          break
        case 'contact':
          this.loadNextPage()
          this.saveOnboardingData()
          // set account owner default name
          if (this.onboardingData.contactInformation.hasBillingAddress) {
            this.onboardingData.payment.accountOwner = this.onboardingData.billingInformation.firstName + ' ' + this.onboardingData.billingInformation.lastName
          } else {
            this.onboardingData.payment.accountOwner = this.onboardingData.userInformation.firstName + ' ' + this.onboardingData.userInformation.lastName
          }

          break
        case 'image':
          this.loadNextPage()
          this.saveOnboardingData()
          break
        case 'payment':
          this.saveOnboardingData()
          this.submit()
          break
        case 'done':
          break
        default:
          this.saveOnboardingData()
          this.loadNextPage()
      }
    },

    loadNextPage () {
      const ni = this.index + 1 < 0 ? 0 : this.index + 1
      const path = this.steps[ni]
      if (path) {
        this.$router.push('/wizard/onboarding/' + path)
      }
    },
    gotoASUorOpenLogin () {
      if (this.$store.state.auth) {
        this.$router.push('/me/trainings')
      } else {
        this.$store.dispatch('setSidebar', 'login')
      }
    },
    getMemberType () {
      if (this.onboardingData.contactInformation?.company?.metadata?.attendees_free_cost) {
        return MemberType.corporate_freeCost
      }
      if (this.onboardingData.contactInformation?.company && !this.onboardingData.contactInformation.company?.metadata?.attendees_free_cost) {
        return MemberType.corporate
      } else { return MemberType.member }
    },

    // sets this.mailCheck to true, if e-mail address is valid for registration
    async checkLoginDataAndProceed () {
      this.loadingEmail = true
      this.loadingCheckEmailStatus = 'Prüfe E-Mail Adresse...'
      const data = {
        email: this.onboardingData.userInformation.email,
        password: this.onboardingData.userInformation.password,
        user_metadata: {
          firstName: this.onboardingData.userInformation.firstName,
          lastName: this.onboardingData.userInformation.lastName
        }
      }
      this.$store.dispatch('checkLoginData', data).then((r) => {
        this.loadingCheckEmailStatus = 'E-Mail Adresse ist verfügbar'
        return new Promise(resolve => {
          setTimeout(() => {
            this.mailCheck = true
            this.loadingEmail = false
            this.loadNextPage()
            this.saveOnboardingData()
          }, 1000)
        })
      })
        .catch((e) => {
          this.loadingEmail = false
          this.mailCheck = false
          const errorMsg = e?.response?.data?.msg
          if (e.error) {
            this.errorMessage = 'Ein Fehler ist aufgetreten: "' + e.error + '"'
          }
          if (errorMsg) {
            switch (errorMsg) {
              case 'user_exists':
                this.$toast.show('Ein User mit dieser Email Adresse existiert bereits', {
                  theme: 'bubble'
                })
                break
              default:
                this.$toast.show('Ein Fehler ist aufgetreten: ', e.code, {
                  theme: 'bubble'
                })
                break
            }
            this.mailCheck = false
          }
        }
        )
    },
    async submit () {
      const memberType = this.getMemberType()
      // build onboarding requests
      let memberDataBasic = {
        // basicData = data for the new fabman user, that is needed for any membership type
        emailAddress: this.onboardingData.userInformation.email,
        address: this.onboardingData.contactInformation.address,
        city: this.onboardingData.contactInformation.city,
        zip: this.onboardingData.contactInformation.zip,
        firstName: this.onboardingData.userInformation.firstName,
        lastName: this.onboardingData.userInformation.lastName,
        // optional
        //region, language,requireUpfrontPayment, state,  not used
        gender: null,
        dateOfBirth: this.onboardingData.contactInformation.birthdate,
        phone: this.onboardingData.contactInformation.phone,
        countryCode: this.onboardingData.contactInformation.country,
        hasBillingAddress: this.onboardingData.contactInformation.hasBillingAddress
      }
      if (this.onboardingData.userInformation.gender !== 'empty') {
        memberDataBasic = { ...memberDataBasic, gender: this.onboardingData.userInformation.gender }
      }
      //let memberData = null
      let extendMemberDataIban = null
      let extendMemberDataBillingAddress = null
      let memberData = null
      switch (memberType) {
        case MemberType.corporate_freeCost:
          //console.log('MemberType: corporate_freeCost')
          memberData = memberDataBasic
          memberData = {
            ...memberData,
            paidForBy: this.onboardingData.contactInformation.company.id,
            space: this.onboardingData.contactInformation.company.metadata.attendees_space_id,
            metadata: {
              corporateMemberId: this.onboardingData.contactInformation.company.id
            }

          }
          break
        case MemberType.corporate:
          //console.log('MemberType: corporate')
          memberData = memberDataBasic
          memberData = {
            ...memberData,
            space: this.onboardingData.contactInformation.company.metadata.attendees_space_id,
            metadata: {
              corporateMemberId: this.onboardingData.contactInformation.company.id
            }
          }
          extendMemberDataIban = {
            iban: this.onboardingData.payment.iban,
            accountOwner: this.onboardingData.payment.accountOwner
          }
          if (this.onboardingData.contactInformation.hasBillingAddress) {
            extendMemberDataBillingAddress = {
              billingFirstName: this.onboardingData.billingInformation.firstName,
              billingLastName: this.onboardingData.billingInformation.lastName,
              billingAddress: this.onboardingData.billingInformation.address,
              billingCity: this.onboardingData.billingInformation.city,
              billingZip: this.onboardingData.billingInformation.zip,
              billingCountryCode: this.onboardingData.billingInformation.country
            }
          }
          memberData = { ...memberData, ...extendMemberDataIban }
          memberData = { ...memberData, ...extendMemberDataBillingAddress }
          break
        case MemberType.member:
          //console.log('MemberType: member or corporate (no free cost)')
          extendMemberDataIban = {
            iban: this.onboardingData.payment.iban,
            accountOwner: this.onboardingData.payment.accountOwner
          }
          if (this.onboardingData.contactInformation.hasBillingAddress) {
            extendMemberDataBillingAddress = {
              billingFirstName: this.onboardingData.billingInformation.firstName,
              billingLastName: this.onboardingData.billingInformation.lastName,
              billingAddress: this.onboardingData.billingInformation.address,
              billingCity: this.onboardingData.billingInformation.city,
              billingZip: this.onboardingData.billingInformation.zip,
              billingCountryCode: this.onboardingData.billingInformation.country
            }
          }
          memberData = { ...memberDataBasic, ...extendMemberDataIban }
          memberData = { ...memberData, ...extendMemberDataBillingAddress }
          break
      }
      //console.log('memberData: ', memberData)
      // bundle package (membership) information
      let packageData = null
      // private member
      if (memberType === MemberType.member) {
        packageData = {
          packageId: this.onboardingData.payment.membership.id,
          startDate: this.onboardingData.payment.startDate
        }
      } else {
        // company member
        packageData = {
          packageId: this.onboardingData.contactInformation.company.metadata.attendees_package_id
        }
      }
      // add package information to memberdata
      memberData = { ...memberData, packageData }
      // get captcha token
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('submit') // Execute reCAPTCHA with action "submit"
      const captchaData = {
        'g-recaptcha-response': token
      }
      // add captcha token to memberData
      memberData = { ...memberData, ...captchaData }
      this.loading = true
      // 1) create Fabman member and set membership
      this.$store.dispatch('createMember', memberData).then((r) => {
        // eslint-disable-next-line camelcase
        const fabman_id = r.id
        // 2) upload Image
        if (this.onboardingData.image64) {
          const uploadImageRequest = {
            memberId: fabman_id.toString(),
            dataUrl: this.onboardingData.image64
          }
          this.$store.dispatch('uploadImage', uploadImageRequest).then((r) => {})
        }
        // 3) register Auth0
        const registerAuth0Data = {
          email: this.onboardingData.userInformation.email,
          password: this.onboardingData.userInformation.password,
          user_metadata: {
            firstName: this.onboardingData.userInformation.firstName,
            lastName: this.onboardingData.userInformation.lastName,
            address: this.onboardingData.contactInformation.address,
            city: this.onboardingData.contactInformation.city,
            zip: this.onboardingData.contactInformation.zip
          }
        }
        this.$store.dispatch('registerUser', registerAuth0Data).then((r) => {
          this.loadNextPage()
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
      })
        .catch((e) => {
          this.$toast.show('Ein Fehler ist aufgetreten ', e.code, {
            theme: 'bubble'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>

.wizard {
  margin: 0 4%;

  & .header {
    margin-top: 1em;

    & .icon {
      font-size: 3em;
    }
  }

  .wizard-section {
    h2 {
      width: 100%;
      margin-top: 1.5em;
      text-align: center;
    }

    & .form {
      margin-top: 1em;
    }

    display: flex;
    align-items: center;
    flex-direction: column;

    .wizard-section-menu {
      .steps {
        .step {
          display: inline-block;
          position: relative;

          &:before {
            z-index: -1;
            content: '';
            position: absolute;
            margin-top: -3px;
            top: 50%;
            right: -10px;
            border-bottom: 6px solid #999;
            width: 50px;
          }

          &.color {
            .dot {
              background-color: $color-orange;
            }
          }

          &.icon {
            .dot {
              svg {
                display: block;
              }
            }

            &:before {
              border-bottom: 6px solid $color-orange;
            }
          }

          .dot {
            height: $step-size;
            width: $step-size;
            display: inline-block;
            border-radius: 50%;
            margin-right: $step-size;
            background-color: #999;

            svg {
              display: none;
              padding: 8px;
              height: 30px;
            }
          }

          &:last-child {
            .dot {
              margin-right: 0;
            }

            &:before {
              display: none;
            }
          }
        }
      }
    }

    .wizard-section-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .wizard-section-nav {
      min-width: 50vh;

      .button-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;

        .spacer {
          flex: 1;
        }
      }
    }
  }
  .confirmation-footer {
    display: flex;
    max-width: 1000px;
    text-align: center;
    flex-flow: column;
    @include media-breakpoint-down(sm) {
      max-width: 90%;
      margin-left: 5%;
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
      //&:focus {
      //  background-color: $color-orange;
      //}
    }
  }
  .input-button-primary:disabled {
    cursor: default;
    background-color: grey;
    border: 1px solid darkgrey;
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
</style>
