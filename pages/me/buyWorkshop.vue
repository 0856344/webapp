<!--<template>-->
<!--  <div class="workshop-overview">-->
<!--    <div-->
<!--      v-if="workshopDate != null"-->
<!--      class="left-content"-->
<!--    >-->
<!--    <span class="flex-center" style="margin-top: 2em;">-->
<!--      <h1 style="padding-right: 0.5em;">{{ $t('workshopBooking') }}</h1>-->
<!--      <loading-spinner-->
<!--        v-if="!userMetadata || !workshopDate"-->
<!--        color="#333"-->
<!--        style="display: contents;"-->
<!--      />-->
<!--    </span>-->

<!--      <workshop-preview-->
<!--        :id="workshopDate.content.workshop.uuid"-->
<!--        :key="reloadKey"-->
<!--        class="preview"-->
<!--      />-->
<!--      <workshop-dates-->
<!--        :dates="[workshopDate]"-->
<!--        class="workshop-dates"-->
<!--        :hide-register="true"-->
<!--      />-->

<!--      <div class="spacer"/>-->

<!--      <div v-if="step === 0 && userMetadata != null">-->
<!--        <div>-->
<!--          <div class="info-row payment">-->
<!--            <div class="info-block">-->
<!--              <div class="col info title">-->
<!--                {{ $t('selectPaymentOption') }}-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; User has credits, but not enough to pay for the workshop &ndash;&gt;-->
<!--        <div-->
<!--          v-if="memberHasCredits && !memberHasEnoughCredits"-->
<!--          class="info-row option"-->
<!--        >-->
<!--          <div class="info-block">-->
<!--            <div :class="['col', 'info', 'creditsOption']">-->
<!--              <div class="first">-->
<!--                <input-->
<!--                  id="sepa_not_enough"-->
<!--                  type="checkbox"-->
<!--                  name="payment"-->
<!--                  value="credits"-->
<!--                  @click="useRemainingCredits = true"-->
<!--                >-->
<!--                <label-->
<!--                    for="credits"-->
<!--                    class="label"-->
<!--                >-->
<!--                  {{ $t('remainingCredits') }} ({{ credits }}EUR) {{ $t('deduct') }}-->
<!--                </label>-->
<!--              </div>-->
<!--              <button-->
<!--                class="input-button-primary creditsButton"-->
<!--                @click="$router.push(`/de/gift?action=redeem&origin=${$route.query.uuid}`)"-->
<!--              >-->
<!--                {{ $t('redeemGiftCard') }}-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; User has enough credits for workshop, or has zero credits (in which case the option will be visible but disabled) &ndash;&gt;-->
<!--        <div-->
<!--          v-if="!memberHasCredits || memberHasEnoughCredits"-->
<!--          class="info-row option"-->
<!--        >-->
<!--          <div class="info-block">-->
<!--            <div :class="['col', 'info', 'creditsOption', { disabled: !memberHasEnoughCredits }]">-->
<!--              <div class="first">-->
<!--                <input-->
<!--                  id="sepa_credits"-->
<!--                  type="radio"-->
<!--                  :disabled="!memberHasEnoughCredits"-->
<!--                  name="payment"-->
<!--                  value="credits"-->
<!--                  @click="paymentMethod = PAYMENT_METHODS.credits"-->
<!--                >-->
<!--                <label-->
<!--                  for="credits"-->
<!--                  class="label"-->
<!--                >-->
<!--                  {{ $t('credits') }} ({{ $t('currentStatus') }} {{ credits }}EUR)-->
<!--                </label>-->
<!--              </div>-->
<!--              <button-->
<!--                class="input-button-primary creditsButton"-->
<!--                @click="$router.push(`/de/gift?action=redeem&origin=${$route.query.uuid}`)"-->
<!--              >-->
<!--                {{ $t('redeemGiftCard') }}-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div>-->
<!--          <div class="info-row option">-->
<!--            <div class="info-block">-->
<!--              <div class="col info">-->
<!--                <input-->
<!--                  id="payment_provider"-->
<!--                  type="radio"-->
<!--                  name="payment"-->
<!--                  value="payment_provider"-->
<!--                  @click="paymentMethod = PAYMENT_METHODS.payment_provider"-->
<!--                >-->
<!--                <label for="payment_provider">{{ $t('paymentProvider') }} <br>-->
<!--                  <span class="silent-info ml-4">-->
<!--                      <div class="icon svg-icon paypal-icon"></div>-->
<!--                      <div class="icon svg-icon mastercard-icon"></div>-->
<!--                      <div class="icon svg-icon visa-icon"></div>-->
<!--                      <div class="icon svg-icon apple-pay-icon"></div>-->
<!--                    </span>-->
<!--                </label><br>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div-->
<!--          v-if="userMetadata.sepa_active"-->
<!--          class="info-row option"-->
<!--        >-->
<!--          <div class="info-block">-->
<!--            <div class="col info">-->
<!--              <input-->
<!--                id="sepa"-->
<!--                type="radio"-->
<!--                name="payment"-->
<!--                value="sepa"-->
<!--                @click="paymentMethod = PAYMENT_METHODS.sepa"-->
<!--              >-->
<!--              <label for="sepa"> {{ $t('sepaBill') }}</label><br>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="spacer"/>-->

<!--        <div class="buttons">-->
<!--          <button-->
<!--            class="input-button-back"-->
<!--            :disabled="!paymentMethod"-->
<!--            @click="onNextStep(1)"-->
<!--          >-->
<!--            {{ $t('continue') }}-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div v-if="step == 1">-->
<!--        <h2> {{ $t('confirmation') }}</h2>-->

<!--        <div v-if="isFree" class="confirmation">-->
<!--          {{ $t('bindingRegistrationText') }} <a href="mailto:events@grandgarage.eu">{{ $t('eventEmailAddress') }}</a>-->
<!--        </div>-->
<!--        <div-->
<!--          v-else-->
<!--          class="alert alert-info" role="alert"-->
<!--        >-->
<!--          <div v-if="useRemainingCredits">-->
<!--            <font-awesome-icon icon="info-circle"/> {{ $t('fromYourCredits') }} {{ credits === 1 ? 'wird' : 'werden' }} {{ credits }} € {{ $t('deducted') }}-->
<!--          </div>-->
<!--          <div v-if="paymentMethod === 1">-->
<!--            <strong><font-awesome-icon icon="info-circle"/> {{ finalWorkshopPrice }} € {{ finalWorkshopPrice === 1 ? 'wird' : 'werden' }}  {{ $t('invoiced') }}</strong>-->
<!--          </div>-->
<!--          <div v-if="paymentMethod === 2">-->
<!--            <strong><font-awesome-icon icon="info-circle"/> {{ finalWorkshopPrice }} € {{ finalWorkshopPrice === 1 ? 'wird' : 'werden' }} {{ $t('includedInYourMonthlyBill') }}</strong>-->
<!--          </div>-->
<!--          <div v-if="paymentMethod === 3">-->
<!--            <font-awesome-icon icon="info-circle"/> {{ finalWorkshopPrice }} € {{ finalWorkshopPrice === 1 ? 'wird' : 'werden' }} {{ $t('fromYourCredits') }} ({{ credits }} €) {{ $t('deducted') }}-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="buttons">-->
<!--          <button-->
<!--            v-if="!isFree"-->
<!--            class="input-button-back"-->
<!--            @click="back"-->
<!--          >-->
<!--            {{ $t('back') }}-->
<!--          </button>-->
<!--          <button-->
<!--            class="input-button-payment"-->
<!--            @click="onNextStep(3)"-->
<!--          >-->
<!--            <template v-if="isFree">-->
<!--             {{ $t('bookFreeOfCharge') }}-->
<!--            </template>-->
<!--            <template v-else>-->
<!--              <span v-if="paymentMethod === 1">{{ $t('toPaymentProcess') }}</span>-->
<!--              <span v-else>{{ $t('bookWorkshopLiableToPayTheCosts') }}</span>-->
<!--            </template>-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div v-if="step == 3">-->
<!--        <loading-spinner-->
<!--          class="spinner"-->
<!--          color="black"-->
<!--        />-->
<!--      </div>-->
<!--      <div v-if="step == 4" >-->
<!--        <div class="alert alert-success text-center" role="alert">{{ $t('workshopBooked') }}</div>-->
<!--          <br>-->
<!--        <button-->
<!--          class="input-button-primary"-->
<!--          @click="$router.push('workshopBookings')"-->
<!--        >-->
<!--         {{ $t('displayMyWorkshops') }}-->
<!--        </button>-->
<!--      </div>-->
<!--      <div v-if="step == 99">-->
<!--        {{ error }}-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--const PAYMENT_METHODS = {-->
<!--  free: 0,-->
<!--  payment_provider: 1,-->
<!--  sepa: 2,-->
<!--  credits: 3-->
<!--}-->
<!--export _default {-->
<!--  scrollToTop: true,-->
<!--  name: 'BuyWorkshop',-->
<!--  props: {},-->
<!--  data () {-->
<!--    return {-->
<!--      PAYMENT_METHODS,-->
<!--      paymentMethod: null,-->
<!--      step: 0,-->
<!--      reloadKey: 0,-->
<!--      workshopDate: null,-->
<!--      userMetadata: null,-->
<!--      error: null,-->
<!--      credits: 0,-->
<!--      useRemainingCredits: false-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    memberHasEnoughCredits () {-->
<!--      return this.credits >= this.workshopPrice-->
<!--    },-->
<!--    memberHasCredits () {-->
<!--      return this.credits > 0-->
<!--    },-->
<!--    workshopPrice () {-->
<!--      if (this.isMember) {-->
<!--        return this.workshopDate.content.workshop.content.price_internal-->
<!--      } else {-->
<!--        return this.workshopDate.content.workshop.content.price_external-->
<!--      }-->
<!--    },-->
<!--    isFree () {-->
<!--      return parseInt(this.workshopPrice) === 0-->
<!--    },-->
<!--    finalWorkshopPrice () {-->
<!--      if (this.useRemainingCredits) {-->
<!--        return this.workshopPrice - this.credits-->
<!--      }-->
<!--      return this.workshopPrice-->
<!--    },-->
<!--    isMember () {-->
<!--      return this.$store.state.user.packages.length > 0-->
<!--    }-->
<!--  },-->
<!--  async mounted () {-->
<!--    await this.getWorkshop()-->
<!--    if (this.isFree) {-->
<!--      this.step = 1-->
<!--    }-->
<!--    this.$store.dispatch('getUserMetadata').then(data => {-->
<!--      this.userMetadata = data.data-->
<!--    })-->
<!--    this.credits = await this.$store.dispatch('getCredits')-->
<!--    window.scrollTo(0, 0) // Scroll to top-->
<!--  },-->
<!--  methods: {-->
<!--    back () {-->
<!--      this.step = 0-->
<!--      this.paymentMethod = null-->
<!--      this.useRemainingCredits = false-->
<!--    },-->
<!--    async getWorkshop () {-->
<!--      await this.$store.dispatch('loadStoryByUUid', this.$route.query.uuid).then(data => {-->
<!--        this.workshopDate = data.story-->
<!--      })-->
<!--    },-->
<!--    onNextStep (step) {-->
<!--      this.step = step-->
<!--      switch (step) {-->
<!--        case 3:-->
<!--          this.pay()-->
<!--          break-->
<!--      }-->
<!--    },-->
<!--    pay: function () {-->
<!--      if (this.isFree) {-->
<!--        this.paymentMethod = PAYMENT_METHODS.free-->
<!--      }-->

<!--      const data = {-->
<!--        workshop_date_id: this.workshopDate.uuid,-->
<!--        payment_method: this.paymentMethod,-->
<!--        use_remaining_credits: this.useRemainingCredits-->
<!--      }-->

<!--      this.$store.dispatch('bookWorkshop', data)-->
<!--        .then((response) => {-->
<!--          switch (this.paymentMethod) {-->
<!--            case PAYMENT_METHODS.payment_provider:-->
<!--              if (response.data.redirect_link) {-->
<!--                if (response.data.invoice_contact) {-->
<!--                  this.connectorInvoiceContact = response.data.invoice_contact-->
<!--                }-->
<!--                // Redirect to payrexx screen-->
<!--                window.location.href = response.data.redirect_link-->
<!--              } else {-->
<!--                console.log('Error: No payrexx redirect_link returned!', response.data)-->
<!--                throw new Error('No payrexx redirect_link returned!')-->
<!--              }-->
<!--              break-->
<!--            _default:-->
<!--              this.step = 4-->
<!--              this.getWorkshop()-->
<!--              this.reloadKey++-->
<!--              break-->
<!--          }-->
<!--        })-->
<!--        .catch((error) => {-->
<!--          console.log('error', error.response.data)-->
<!--          this.$sentry.captureException(new Error(error))-->
<!--          this.$toast.show(error.response.data.msg, {-->
<!--            theme: 'bubble'-->
<!--          })-->
<!--          this.step = 99-->
<!--        })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->

<!--.icon {-->
<!--  width: 26px;-->
<!--  height: 26px;-->
<!--}-->

<!--.svg-icon, .svg-h2 {-->
<!--  vertical-align: middle;-->
<!--  display: inline-grid;-->
<!--}-->

<!--.paypal-icon {-->
<!--  background-color: grey; /* defines the background color of the image */-->
<!--  mask: url('~/assets/img/icons/cc-paypal.svg') no-repeat center / contain;-->
<!--  -webkit-mask: url('~/assets/img/icons/cc-paypal.svg') no-repeat center / contain;-->
<!--}-->

<!--.mastercard-icon {-->
<!--  background-color: grey; /* defines the background color of the image */-->
<!--  mask: url('~/assets/img/icons/cc-mastercard.svg') no-repeat center / contain;-->
<!--  -webkit-mask: url('~/assets/img/icons/cc-mastercard.svg') no-repeat center / contain;-->
<!--}-->

<!--.visa-icon {-->
<!--  background-color: grey; /* defines the background color of the image */-->
<!--  mask: url('~/assets/img/icons/cc-visa.svg') no-repeat center / contain;-->
<!--  -webkit-mask: url('~/assets/img/icons/cc-visa.svg') no-repeat center / contain;-->
<!--}-->

<!--.apple-pay-icon {-->
<!--  background-color: grey; /* defines the background color of the image */-->
<!--  mask: url('~/assets/img/icons/cc-apple-pay.svg') no-repeat center / contain;-->
<!--  -webkit-mask: url('~/assets/img/icons/cc-apple-pay.svg') no-repeat center / contain;-->
<!--}-->

<!--.silent-link, .silent-info {-->
<!--  font-size: 0.6em;-->
<!--}-->

<!--.silent-link {-->
<!--  cursor: pointer;-->
<!--}-->

<!--.silent-link:hover {-->
<!--  text-decoration: underline;-->
<!--}-->

<!--.workshop-overview {-->
<!--  color: #000;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  flex: 1;-->
<!--  justify-content: center;-->
<!--  @include margin-page-wide();-->
<!--  @include media-breakpoint-up(md) {-->
<!--    margin: 0 100px;-->
<!--  }-->

<!--  .link {-->
<!--    cursor: pointer;-->
<!--    font-weight: bold;-->
<!--    padding: 10px;-->
<!--    border: none;-->
<!--    outline: none;-->
<!--    color: #FFF;-->
<!--    background-color: $color-orange;-->
<!--  }-->

<!--  .left-content {-->
<!--    .headline {-->
<!--      position: relative;-->
<!--      @include media-breakpoint-up(md) {-->
<!--        max-width: 50%;-->
<!--        font-size: 2.8rem;-->
<!--      }-->
<!--      @include media-breakpoint-down(sm) {-->
<!--        margin: 3vh 5%;-->
<!--      }-->
<!--      line-height: 1.5;-->
<!--      font-family: $font-secondary;-->
<!--    }-->

<!--    .spacer {-->
<!--      margin: 20px;-->
<!--    }-->

<!--    .info-row {-->
<!--      @include media-breakpoint-down(md) {-->
<!--        flex-direction: column;-->
<!--      }-->
<!--      background-color: #fff;-->
<!--      line-height: 1.6;-->
<!--      font-family: $font-mono;-->
<!--      font-size: 0.9rem;-->
<!--      font-weight: bold;-->
<!--      //margin: -8px;-->
<!--      display: flex;-->

<!--      &.option {-->
<!--        padding: 10px;-->
<!--      }-->

<!--      &.payment {-->
<!--        background-color: #000;-->
<!--        color: #fff;-->
<!--      }-->

<!--      &.bare {-->
<!--        background: none;-->
<!--        padding: 20px;-->
<!--      }-->

<!--      .info-block {-->
<!--        flex: 1;-->
<!--        flex-direction: row;-->
<!--        display: flex;-->
<!--      }-->

<!--      .info-block {-->
<!--        flex: 1;-->
<!--        flex-direction: row;-->
<!--        display: flex;-->
<!--        justify-content: space-between;-->
<!--      }-->

<!--      .col {-->
<!--        padding: 8px;-->

<!--        &.soldOut {-->
<!--          color: $color-orange;-->
<!--          text-transform: uppercase;-->
<!--        }-->

<!--        &.register {-->
<!--          background-color: $color-orange;-->

<!--          a {-->
<!--            color: #FFF;-->
<!--          }-->
<!--        }-->

<!--        &.date {-->
<!--          padding-top: 16px;-->
<!--        }-->

<!--        &.title {-->
<!--          padding: 20px;-->
<!--        }-->
<!--      }-->

<!--      svg {-->
<!--        height: 1em;-->
<!--        width: 1em;-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  .form .form-item {-->
<!--    grid-template-columns: 54% 72%;-->
<!--  }-->

<!--  .full-text {-->
<!--    color: #ff0000;-->
<!--    margin-bottom: 0;-->
<!--    margin-top: 0;-->
<!--  }-->

<!--}-->

<!--</style>-->
<!--<style lang="scss">-->
<!--.preview {-->
<!--  pointer-events: none;-->
<!--  padding: 1em;-->

<!--  .preview-wrapper {-->
<!--    .workshop-preview {-->
<!--      width: 100% !important;-->
<!--      padding: 0 !important;-->

<!--      .story {-->
<!--        padding: 0;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.creditsOption {-->
<!--  display: flex;-->
<!--  flex-flow: row nowrap;-->
<!--  align-items: center;-->
<!--  justify-content: space-between;-->

<!--  & .creditsButton {-->
<!--    margin: 0;-->
<!--  }-->

<!--  & .first {-->
<!--    display: flex;-->

<!--    & label {-->
<!--      margin-left: 0.6em;-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.disabled {-->
<!--  color: grey;-->
<!--}-->

<!--.spinner {-->
<!--  margin-top: 2em;-->
<!--}-->

<!--.confirmation {-->
<!--  & div {-->
<!--    padding: 0.2em 0em;-->
<!--  }-->
<!--}-->
<!--</style>-->
