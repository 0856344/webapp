<template>
  <div class="section">
    <form class="flex flex-col gap-4 mx-4 sm:mx-0 sm:mr-4" @submit.prevent="updateMember">
      <h2>{{ $t('contactDetails') }}</h2>
      <TextInput :label="$t('firstName')" v-model="member.firstName" :disabled="true" :isContact="true" />
      <TextInput :label="$t('lastName')" v-model="member.lastName" :disabled="true" :isContact="true" />
      <TextInput :label="$t('address')" v-model="member.address" :isContact="true" />
      <TextInput :label="$t('zipCode')" v-model="member.zip" :isContact="true" />
      <TextInput :label="$t('city')" v-model="member.city" :isContact="true" />
      <div class="grid items-baseline grid-flow-row gap-2 sm:py-2 sm:h-8 sm:grid-cols-contact ">
        <label class="block text-xs font-bold uppercase sm:text-end" for="country-input">
          {{ $t('country') }}
        </label>
        <select id="country-input" v-model="member.countryCode"
          class="px-2 border-2 rounded-sm w-full m-auto sm:min-w-fit">
          <option v-for="country in countries" :value="country.id" v-bind:key="country.id">
            {{ country.name }}
          </option>
        </select>
      </div>
      <TextInput :label="$t('phone')" v-model="member.phone" :isContact="true" />
      <div class="grid items-baseline grid-flow-row gap-2 self-center grow sm:py-2 sm:h-8 sm:grid-cols-contact sm:w-full" v-if="!member.paidForBy">
        <label class="block text-xs font-bold uppercase sm:text-end" for="checkbox">
          Rechnungsadresse
        </label>
        <div class="flex items-start gap-2">
          <input id="checkbox" class="w-4 h-4 ml-px" type="checkbox" :checked="member.hasBillingAddress"
            v-model="member.hasBillingAddress">
          <div class="text-md">weicht von Kontaktadresse ab</div>
        </div>
      </div>

      <h2 v-if="member.hasBillingAddress">Rechnungsadresse</h2>
      <TextInput v-if="member.hasBillingAddress" :label="$t('firstName')" v-model="member.billingFirstName"
        :disabled="true" :isContact="true" />
      <TextInput v-if="member.hasBillingAddress" :label="$t('lastName')" v-model="member.billingLastName" :disabled="true"
        :isContact="true" />
      <TextInput v-if="member.hasBillingAddress" :label="$t('address')" v-model="member.billingAddress"
        :isContact="true" />
      <TextInput v-if="member.hasBillingAddress" :label="$t('zipCode')" v-model="member.billingZip"
        :isContact="true" />
      <TextInput v-if="member.hasBillingAddress" :label="$t('city')" v-model="member.billingCity" :isContact="true" />
      <div v-if="member.hasBillingAddress"
        class="grid items-baseline grid-flow-row gap-2 sm:py-2 sm:h-8 sm:grid-cols-contact">
        <label class="block text-xs font-bold uppercase sm:text-end" for="country-input">
          {{ $t('country') }}
        </label>
        <select id="country-input" v-model="member.billingCountryCode"
          class="px-2 border-2 rounded-sm w-full m-auto sm:min-w-fit">
          <option v-for="country in countries" :value="country.id" v-bind:key="country.id">
            {{ country.name }}
          </option>
        </select>
      </div>

      <div class="flex justify-center w-full sm:justify-end">
        <div v-if="loading">
          Saving…
        </div>
        <button v-else type="submit"
          class="w-full py-2 mt-6 text-white rounded-sm bg-orange ring-2 ring-orange-300 cursor:pointer disabled:cursor-default disabled:bg-gray-700 disabled:ring-gray-300 sm:max-w-max sm:px-12 hover:bg-gray-900 hover:ring-gray-300"
          :disabled="!dataValid">
          <font-awesome-icon icon="save" /> {{ $t('save') }}
        </button>
      </div>
    </form>

    <form v-if="!member.paidForBy" class="flex flex-col gap-4 mx-4 sm:mx-0 sm:mr-4" @submit.prevent="updatePaymentMethod">
      <h2>Zahlungsmethode</h2>
      <TextInput :label="'IBAN'" v-model="iban" @input="validateIban()" @focus="clearIban()" :isContact="true" />
      <div v-if="!ibanIsValid && paymentMethod.iban" class="text-xs text-orange">
        IBAN ist ungültig
      </div>
      <TextInput :label="'Kontoinhaber:in'" v-model="paymentMethod.accountOwnerName" :isContact="true" />
      <div class="grid items-baseline grid-flow-row gap-2 grow sm:py-2 sm:grid-cols-contact">
        <label class="block text-xs font-bold uppercase sm:text-end" for="checkbox">
          SEPA MANDAT
        </label>
        <div class="flex items-start gap-2">
          <input id="checkbox-sepa" class="w-4 h-4 ml-px" type="checkbox" :checked="sepaMandat" v-model="sepaMandat">
          <div class="text-xs">Ich ermächtige die CAP.future GMBH, Zahlungen von meinem Konto mittels
            SEPA-Lastschrift einzuziehen. Zugleich weise ich mein Kreditinstitut an, die von der CAP.Future GMBH auf mein
            Konto gezogenen SEPA-Lastschriften einzulösen. fIch kann innerhalb von acht Wochen, beginnend mit dem
            Belastungsdatum, die Erstattung des belasteten Betrages verlangen. Es gelten dabei die mit meinem
            Kreditinstitut vereinbarten Bedingungen.</div>
        </div>
      </div>
      <div class="flex justify-center w-full sm:justify-end">
        <div v-if="loadingPayment">
          Saving…
        </div>
        <div v-else class="flex w-5/6 gap-2 mt-6 sm:w-auto">
          <button type="button"
            class="py-2 text-white rounded-sm grow sm:px-12 bg-orange ring-2 ring-orange-300 cursor:pointer disabled:bg-gray-700 disabled:ring-gray-300 disabled:cursor-default hover:bg-gray-900 hover:ring-gray-300"
            :disabled="!ibanFieldFocus" @click="restoreIban()">
            Abbrechen
          </button>
          <button type="submit"
            class="py-2 text-white rounded-sm grow sm:px-12 bg-orange ring-2 ring-orange-300 cursor:pointer disabled:bg-gray-700 disabled:ring-gray-300 disabled:cursor-default hover:bg-gray-900 hover:ring-gray-300"
            :disabled="!sepaMandat || !ibanIsValid || (paymentMethod.iban === currentIban) || (paymentMethod.accountOwnerName === '')">
            <font-awesome-icon icon="save" /> {{ $t('save') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { helper } from '@/plugins/helper'
import TextInput from '../../bloks/basic/TextInput.vue'

export default {
  middleware: 'authenticated',
  components: { TextInput },
  data () {
    return {
      loading: false,
      loadingPayment: false,
      countries: null,
      paymentMethod: {
        iban: ''
      },
      // WIP
      // iban: '',
      sepaMandat: false,
      ibanIsValid: true,
      ibanFieldFocus: false,
      currentIban: ''
    }
  },
  async mounted () {
    this.countries = await this.$store.dispatch('getCountries')
    this.paymentMethod = {
      iban: ''
    }
    const paymentMethod = await this.$store.dispatch('getPaymentMethod')
    if (paymentMethod && paymentMethod.iban) {
      this.paymentMethod = paymentMethod
      this.currentIban = this.paymentMethod.iban
    }
  },
  computed: {
    member () {
      return this.$store.state.member
    },

    iban: {
      get () {
        if (!this.ibanFieldFocus && this.paymentMethod.iban.length > 3) {
          return this.paymentMethod.iban.substr(0, 2) + new Array(this.paymentMethod.iban.length - 4).join('x') + this.paymentMethod.iban.substr(this.paymentMethod.iban.length - 4, 4)
        } else {
          return this.paymentMethod.iban
        }
      },
      set (val) {
        this.paymentMethod.iban = val
      }
    },

    dataValid () {
      //check contact fields
      if (this.member) {
        if (this.member.address && this.member.zip && this.member.city && this.member.countryCode && this.member.countryCode !== 'XX') {
          // check optional invoice contact fields
          if (!this.member.hasBillingAddress) {
            return true
          } else {
            if (this.member.billingFirstName && this.member.billingLastName && this.member.billingAddress &&
              this.member.billingCity && this.member.billingZip && this.member.billingCountryCode) {
              return true
            } else {
              return false
            }
          }
        } else {
          return false
        }
      } else return false
    }
  },
  created () {
  },
  methods: {
    clearIban () {
      this.ibanFieldFocus = true
      this.paymentMethod.iban = ''
      this.sepaMandat = false
      this.validateIban()
    },
    restoreIban () {
      this.paymentMethod.iban = this.currentIban
      this.ibanIsValid = true
      this.ibanFieldFocus = false
      this.sepaMandat = false
    },
    validateIban () {
      if (this.paymentMethod.iban) {
        this.ibanIsValid = true
        if (helper.validateIban(this.paymentMethod.iban)) {
          return true
        }
      }
      this.ibanIsValid = false
      return false
    },
    async updateMember (event) {
      this.loading = true
      let payload = Object.assign({}, this.member)
      // get captcha token
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('submit') // Execute reCAPTCHA with action "submit"
      const captchaData = {
        'g-recaptcha-response': token
      }
      payload = { ...payload, ...captchaData }
      this.$store.dispatch('updateMember', payload).then(() => {
        this.loading = false
        this.$notify({
          title: 'Yay!',
          text: 'Änderungen gespeichert.'
        })
      }).catch((e) => {
        this.loading = false
        this.$notify({
          title: 'Error',
          type: 'error',
          text: 'Ein Fehler ist aufgetreten.'
        })
      })
    },
    async updatePaymentMethod (event) {
      this.loadingPayment = true
      //const accountOwnerName = this.$store.state.user.profile.firstName + ' ' + this.$store.state.user.profile.lastName
      let updatePaymentRequest = {
        type: 'sepa',
        iban: this.paymentMethod.iban,
        accountOwnerName: this.paymentMethod.accountOwnerName
      }
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('submit') // Execute reCAPTCHA with action "submit"
      const captchaData = {
        'g-recaptcha-response': token
      }
      updatePaymentRequest = { ...updatePaymentRequest, ...captchaData }
      this.$store.dispatch('updatePaymentMethod', Object.assign({}, updatePaymentRequest)).then(() => {
        this.loadingPayment = false
        this.currentIban = updatePaymentRequest.iban
        this.ibanFieldFocus = false
        this.sepaMandat = false
        this.$notify({
          title: 'Yay!',
          text: 'Änderungen gespeichert.'
        })
      }).catch((e) => {
        this.loadingPayment = false
        this.$notify({
          title: 'Error',
          type: 'error',
          text: 'Ein Fehler ist aufgetreten.'
        })
      })
    }
  }
}
</script>
