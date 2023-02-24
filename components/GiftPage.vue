<template href="http://www.w3.org/1999/html">
  <div v-editable="blok" class="gift-page">
    <div class="gift-card-body">
      <h2 v-if="action" class="gift-page-headline">
      <span class="svg-icon mr-05">
        <img width="50px" src="~/assets/img/icons/gift-card-icon.svg" class="decorator">
      </span>
        <span class="svg-h2">
        {{ $t('giftCard') }} {{ action === 'buy' ? 'kaufen' : 'einlösen' }}
      </span>
        <loading-spinner v-if="loading" class="loading-spinner ml-05"/>
      </h2>
      <h2 v-else class="gift-page-headline">
      <span class="svg-icon mr-05">
        <img width="50px" src="~/assets/img/icons/gift-card-icon.svg" class="decorator">
      </span>
        <span class="svg-h2">
        {{ $t('giftCards') }}
      </span>
        <loading-spinner v-if="loading" class="loading-spinner ml-05"/>
      </h2>
      <template v-if="!action">
        <div class="description-gift-card">
          <markdown :value="blok.Title" />
        </div>
        <div class="items">
          <section class="display-item">
            <div class="top">
              <div class="top-image" :style="{ 'background-image': 'url(' + $resizeImage(blok.imageBuy, '1500x1500') + ')' }"></div>
            </div>
            <div class="bottom">
              <div class="bottom-text">
                {{ $t('buyGiftCard') }}
              </div>
              <a href="https://grandgarage.firstvoucher.com/wertgutschein-fuer-die-grand-garage-m73245" target="_blank" class="buy-redeem-button">
                {{ $t('buy') }}
              </a>
            </div>
          </section>
          <div class="spacer"></div>
          <br>
          <section class="display-item">
            <div class="top">
              <div class="top-image" :style="{ 'background-image': 'url(' + $resizeImage(blok.imageRedeem, '1500x1500') + ')' }"></div>
            </div>
            <div class="bottom">
              <div class="bottom-text">
                {{ $t('redeemGiftCard') }}
              </div>
              <div class="buy-redeem-button"
                   @click=goToRedeem()>
                {{ $t('redeem') }}
              </div>
            </div>
          </section>
          <br>
        </div>
      </template>

      <transition name="fade">
        <template>

          <template v-if="action === 'redeem'">
            <div v-if="step === 0" class="giftcardForm" style="margin-left: 10px; margin-right: 10px">
              <br>
              <h3>Du hast zwei Optionen zur Auswahl, um deinen Wertgutschein einzulösen.</h3>
              <br>
              <p style="text-align: justify;"><b>Option 1: Mitgliedskonto</b></p> <p style="text-align: justify; margin-bottom: 0px"> Du kannst deinen Wertgutschein in voller Höhe auf dein Mitgliedskonto aufladen und davon deine Mitgliedschaft, Maschinennutzung, verwendete Materialien aber auch Getränke und Merchandise bezahlen. Klingt gut? Dann einfach ins Feld „Gutschein einlösen“ den Gutscheincode eintragen und auf „Einlösen“ klicken. Dein Guthaben kannst du in deinem
                <router-link v-if="isAuthenticated" to="/me">Mitgliedskonto</router-link>
                <a v-if="!isAuthenticated" @click="login()" target="_self" href="javascript:;">Mitgliedskonto</a> unter
                <router-link v-if="isAuthenticated" to="/me/invoices">„Rechnungen“ </router-link>
                <a v-if="!isAuthenticated" @click="login()" target="_self" href="javascript:;">„Rechnungen“</a>
                abrufen.</p>
              <br>
              <div v-if="!isAuthenticated">
                <div class="card">
                  <div class="input-redeem-card" @click="login()">
                <span class="span">
                {{ $t('giftCard') + ' einlösen' }} </span>
                    <div class="redeem-card-bottom">
                      <div class=" code">
                        <span class="code-span"> Gutscheincode: </span>
                        <input v-model="giftCardCode" class="form-item" disabled>
                        <font-awesome-icon icon="info-circle"/>
                      </div>
                      <div class="image">
                        <img src="~/assets/img/icons/gg-logo-icon.svg" width="50">
                      </div>
                    </div>
                  </div>
                  <div class="login-reminder">
                    <div>
                      <font-awesome-icon icon="info-circle"/>
                      Bitte <a @click="login()" target="_self" href="javascript:;">logge dich ein</a>, um deinen Gutschein einlösen zu könnnen!
                    </div>
<!--                    <div>{{ $t('ifNotAMemberGoAndRegister') }}-->
<!--                    </div>-->
                    <br>
                  </div>
                  <div class="buttons">
                    <button
                        class="input-button-primary"
                        @click="goToGutscheine()"
                    >
                      {{ $t('back') }}
                    </button>
                  </div>
                </div>
              </div>
              <div v-if="isAuthenticated">
                <div class="card">
                  <div class="input-redeem-card">
                <span class="span">
                Gutschein einlösen</span>
                    <div class="redeem-card-bottom">
                      <div class=" code">
                        <span class="code-span"> Gutscheincode: </span>
                        <input
                            v-model="giftcardCode"
                            class="form-item"
                        >
                      </div>
                      <div class="image">
                        <img src="~/assets/img/icons/gg-logo-icon.svg" width="40">
                      </div>
                    </div>
                  </div>
                  <div class="login-reminder">
                    <div>
                      <font-awesome-icon icon="info-circle"/>
                      {{'Bitte den Gutscheincode ohne dem "ID" Präfix eingeben.'}}
                    </div>
                    <br>
                  </div>
                  <div class="buttons">
                    <button
                        class="input-button-payment"
                        @click="goToGutscheine()"
                    >
                      {{ $t('back') }}
                    </button>
                    <button
                        class="input-button-payment"
                        :disabled="!giftcardCode"
                        @click="redeem"
                    >
                      Einlösen
                    </button>

                  </div>
                </div>
              </div>
              <br>
              <p ><b>Option 2: Workshop & Events</b> </p><p style="text-align: justify"> Alternativ kannst du deinen Wertgutschein auch für einen unserer Workshop & Events verwenden. Suche dir dazu zunächst den passenden Termin aus unserem aktuellen
              <router-link to="/de/workshops">{{ 'Angebot' }}</router-link>
              aus und lege den Kurs in deinen Warenkorb. Deinen Wertgutschein kannst du später im Bestellvorgang bei den Zahlungsmethoden einlösen. Ein etwaiger Restbetrag kann mit demselben Gutscheincode zu einem späteren Zeitpunkt eingelöst werden.</p>
            </div>
          </template>
        </template>
      </transition>
    </div>
  </div>
</template>

<script>
// import { helpers } from '~/utils/helper'

export default {
  props: ['blok'],
  scrollToTop: true,
  asyncData (context) {
    const path = '/members/shop'
    return context.store.dispatch('loadPage', path).catch((e) => {
      context.error({
        statusCode: e.response.status,
        message: e.response.statusText
      })
    })
  },
  data () {
    return {
      step: 0,
      action: null,
      //origin: null,
      //selectedProductId: null,
      giftcardCode: null,
      //paymentMethod: 0,
      error: '',
      //shippingstreetEnabled: 0,
      //invoiceContact: {},
      //connectorInvoiceContact: null,
      //sepa_active: false,
      //shippingstreet: [],
      loading: false
      //sepaActive: false
    }
  },
  computed: {
    user () {
      // if (this.$store.state.user) {
      //   this.loadUserData()
      // }
      return this.$store.state.user
    },
    isAuthenticated () {
      return !!this.$store.state.auth
    },
    // validInvoiceContact () {
    //   if (!this.invoiceContact) {
    //     return false
    //   }
    //   if (this.user === null) {
    //     return (this.invoiceContact.firstname && this.invoiceContact.lastname && helpers.validateEmail(this.invoiceContact.email) && this.invoiceContact.street && this.invoiceContact.city && this.invoiceContact.zip)
    //   } else {
    //     return (this.invoiceContact.firstname && this.invoiceContact.lastname && this.invoiceContact.street && this.invoiceContact.city && this.invoiceContact.zip)
    //   }
    // },
    // validPayment () {
    //   return this.paymentMethod !== 0
    // },
    // ibanIsValid () {
    //   return helpers.validateIban(this.invoiceContact.iban)
    // },
    images () {
      return this.blok.Images
    }
  },
  watch: {
    '$route.query' (to) {
      this.getQuery(to)
    }
  },
  mounted () {
    this.getQuery(this.$route.query)
  },
  methods: {
    login () {
      this.$store.dispatch('setSidebar', 'login')
    },
    // loadUserData () {
    //   this.loading = true
    //   this.$store.dispatch('getUserMetadata')
    //     .then((data) => {
    //       this.invoiceContact = data.data.invoice_contact
    //       this.sepaActive = data.data.sepa_active
    //     })
    //     .catch((error) => {
    //       console.log(error.response.status, error.response.data.msg)
    //       this.$toast.show('Ein Fehler ist aufgetreten', {
    //         theme: 'bubble'
    //       })
    //     })
    //     .finally(() => {
    //       this.loading = false
    //     })
    // },
    // capitalize (str) {
    //   return helpers.capitalize(str)
    // },
    // isValidEmailAdress (email) {
    //   if (this.user === null) {
    //     return helpers.validateEmail(email)
    //   } else return true
    // },
    getQuery (to) {
      // eslint-disable-next-line no-prototype-builtins
      if (to.hasOwnProperty('origin')) {
        this.origin = to.origin
      }
      // eslint-disable-next-line no-prototype-builtins
      if (to.hasOwnProperty('action') && ['buy', 'redeem'].includes(to.action)) {
        this.action = to.action
        this.step = 0
        return
      }
      this.action = null
    },
    goToRedeem () {
      this.$router.push('gutscheine?action=redeem')
      window.scrollTo(0, 0)
    },
    goToGutscheine () {
      this.$router.push('gutscheine')
      window.scrollTo(0, 0)
    },
    async redeem () {
      this.loading = true
      await this.$store.dispatch('redeemGiftCard', { secret: this.giftcardCode })
        .then((response) => {
          //console.log('success', response)
          this.$toast.show('Der Gutschein wurde erfolgreich eingelöst!', {
            className: 'goodToast'
          })
          // if (this.origin) {
          //   this.$router.push(`buyWorkshop?uuid=${this.origin}`)
          // }
          this.$router.push('/me/invoices')
        })
        .catch((error) => {
          console.log('error', error.response)
          this.giftcardCode = ''
          switch (error.response.status) {
            case 405:
              this.$toast.show('Dieser Gutschein wurde bereits eingelöst', {
                className: 'badToast'
              })
              break
            case 404:
              this.$toast.show('Kein Gutschein mit diesem Code gefunden', {
                className: 'badToast'
              })
              break
            default:
              this.$toast.show('Ein Fehler ist aufgetreten', {
                className: 'badToast'
              })
              break
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles';

.success-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

h2 {
  display: table;
  width: 100%;
}

.alert-info {
  width: 50%;
  @include media-breakpoint-down(md) {
    width: 80%;
  }
  @include media-breakpoint-down(sm) {
    width: 80%;
  }
  @include media-breakpoint-down(xs) {
    width: 80%;
  }
}

.loading-spinner {
  margin-left: 0.5em;
  display: inline;
  font-size: 0.8em;
  color: #333;
}

.icon {
  width: 26px;
  height: 26px;
}

.svg-icon, .svg-h2 {
  vertical-align: middle;
  display: inline-grid;
}

//.paypal-icon {
//  background-color: grey; /* defines the background color of the image */
//  mask: url('~/assets/img/icons/cc-paypal.svg') no-repeat center / contain;
//  -webkit-mask: url('~/assets/img/icons/cc-paypal.svg') no-repeat center / contain;
//}
//
//.mastercard-icon {
//  background-color: grey; /* defines the background color of the image */
//  mask: url('~/assets/img/icons/cc-mastercard.svg') no-repeat center / contain;
//  -webkit-mask: url('~/assets/img/icons/cc-mastercard.svg') no-repeat center / contain;
//}
//
//.visa-icon {
//  background-color: grey; /* defines the background color of the image */
//  mask: url('~/assets/img/icons/cc-visa.svg') no-repeat center / contain;
//  -webkit-mask: url('~/assets/img/icons/cc-visa.svg') no-repeat center / contain;
//}
//
//.apple-pay-icon {
//  background-color: grey; /* defines the background color of the image */
//  mask: url('~/assets/img/icons/cc-apple-pay.svg') no-repeat center / contain;
//  -webkit-mask: url('~/assets/img/icons/cc-apple-pay.svg') no-repeat center / contain;
//}

.silent-link, .silent-info {
  font-size: 0.6em;
}

.silent-link {
  cursor: pointer;
}

.silent-link:hover {
  text-decoration: underline;
}

.image-spacer {
  background-size: cover;
  width: 3em;
  position: relative;
}

.spacer {
  width: 2em;
  height: 2vh;
  @include media-breakpoint-down(sm) {
    width: 0px;
  }
}

//////////FIRST-PAGE//////////////////////////////////////////
.gift-page-headline {
  width: 1200px;
  background: white;
  margin-left: auto;
  margin-right: auto;
  font-size: 2.8rem;
  font-family: "Chakra Petch", sans-serif;
  text-transform: uppercase;
  padding: 38px;
  padding-left: 130px;
  @include media-breakpoint-down(md) {
    max-width: 800px;
    padding-left: 38px;
  }
  @include media-breakpoint-down(sm) {
    max-width: 600px;
    padding: 20px;
    font-size: 2rem;
  }
  @include media-breakpoint-down(xs) {
    max-width: 400px;
    font-size: 1.8rem;
    padding: 19px;
  }
}

.items {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 4em;

  .display-item {
    border-radius: 15px;
    height: 230px;
    display: flex;
    background: black;
    width: 370px;
    box-shadow: 10px 5px 5px #00000024;
    flex-flow: column;
    overflow: hidden;
    @include media-breakpoint-down(sm) {
      height: 220px;
      width: 300px;
    }

    .top {
      height: inherit;
      color: white;

      .top-image {
        background-size: cover;
        background-position: 50%;
        background-repeat: no-repeat;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        height: 160px;
        transition: transform 0.4s ease;
        transform-origin: 50% 50%;
        @include media-breakpoint-down(md) {
          height: 160px;
        }
      }

      .top-text {
        display: flex;
        justify-content: center;
        margin-top: 5%;
        font-size: 28px;
      }
    }

    .bottom {
      height: 45%;
      background: white;
      align-self: end;
      width: inherit;
      border-bottom-right-radius: 13px;
      border-bottom-left-radius: 13px;
      display: flex;
      flex-flow: row;

      .bottom-text {
        width: 8vw;
        margin-left: 5%;
        margin-top: 3%;
      }

      .buy-redeem-button {
        cursor: pointer;
        margin-top: 3%;
        margin-right: 5%;
        width: 110px;
        height: 3vh;
        background: $color-secondary;
        border-radius: 15px;
        display: flex;
        align-items: center;
        color: white;
        padding: 20px;
        font-size: 16px;
        margin-left: 35%;
        @include media-breakpoint-down(sm) {
          margin-left: 35%;
        }
        &:hover {
          background: black;
        }
      }

      & * {
        text-transform: uppercase;
      }
    }

    &:hover {
      .top {
        .top-image {
          transform: scale(1.02);
          width: 100%;
        }
      }
    }
  }

  @media screen and (max-width: 799px) {
    flex-direction: column;
    justify-content: space-between;
  }
}

////////////SELECT-GIFT-CARD-VALUE/////////////////////////////////

.buy-gift-cards {
  position: relative;
  display: flex;
  align-items: center;
  flex-flow: wrap;
  justify-content: space-around;
  padding-left: 11vw;
  padding-right: 11vw;

  .bottom-gift-card {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding-left: 3vw;
    padding-top: 0.5vh;
    margin-left: 7%;

    .image {
      padding-top: 0.6vh;
    }
  }

  .bottom-gift-card option {
    display: contents;
  }

  .headline {
    padding-left: 15vw;
    margin-top: 2em;
  }
}

.input {
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.14118);
  background-color: white;
  margin: 1em 0;
  padding-top: 1.5vh;
  padding-bottom: 2vh;
  padding-left: 1.5vw;
  padding-right: 3vw;
  border: 1px solid #30302f42;
  border-radius: 0.3em;
  font-size: 24px;
  width: 350px;

  @include media-breakpoint-down(sm) {
    width: 80vw;
  }
}

///////////PAYMENT-DETAILS//////////////////////////////////////////////////////////
.payment-methods {
  position: relative;
  display: flex;
  flex-flow: wrap;
  align-content: center;
  align-items: center;
  justify-content: center;
  @include media-breakpoint-down(sm) {
    flex-flow: column;
  }
}

.logged-out-payment {
  display: flex;
  flex-flow: column;
  align-content: center;
  align-items: center;

  .user-contact {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 10px 5px 5px #00000024;
    border: 1px solid #30302f26;

    .label {
      padding-left: 60px;
      padding-right: 90px;
    }

    .input-text {
      margin-right: 40px;
    }

    @include media-breakpoint-down(sm) {
      padding: 17px;
      .label {
        padding-left: 4px;
        padding-right: 4px;
      }
      .input-text {
        margin-right: 3px;
      }
    }
  }
}

.logged-in-payment {
  padding-left: 10vw;
  padding-right: 40vw;

  .input {
    padding-top: 1vh;
    padding-bottom: 1.2vh;
    padding-left: 1vw;
    padding-right: 3vw;
  }

  .spacer {
    width: 0em;
    height: 0vh;
  }

  @include media-breakpoint-down(md) {
    padding-right: 10vw;
  }
}

///////////REDEEM-CARD-PAGE//////////////////////////////////////////
.card {
  .login-reminder {
    margin-bottom: 0;
    display: flex;
    //flex-flow: column;
    align-items: center;
    font-size: medium;
    line-height: 1.5;
    @include media-breakpoint-down(sm) {
      max-width: 80%;
    }
  }

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  .input-redeem-card {
    box-shadow: 10px 5px 5px #00000024;
    padding: 20px;
    position: relative;
    display: flex;
    justify-content: space-between;
    background-color: white;
    margin: 1em 0;
    border: 1px solid grey;
    border-radius: 0.3em;
    flex-direction: column;
    height: 200px;
    width: 580px;

    .redeem-card-bottom {
      display: flex;
      flex-flow: row;
      justify-content: inherit;

      .form-item {
        width: 150px;
        height: 21px;
        @include media-breakpoint-down(sm) {
          width: 150px;
          height: 21px;
        }
      }
    }

    @include media-breakpoint-down(xs) {
      width: 300px;
      height: 150px;
      padding: 15px;

    }
  }
}

/////////GENERAL////////////////////////////////////////////////
.gift-card-body {
  max-width: 1264px;
  width: 100%;
  background: none;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  flex-flow: column;
}

.headline {
  padding-left: 21vw;
  text-decoration: underline;
}

.input-button-payment {
  font-weight: 700;
  line-height: 1em;
  padding: 10px;
  outline: 0;
  color: #fff;
  background-color: $color-orange;
  margin: 0;
  cursor: pointer;
  border-radius: 0.2em;
  border: 1px solid $color-secondary-border;
  @include media-breakpoint-down(xs) {
    font-size: 16px !important;
  }
}

.span {
  font-size: 2rem;
  font-weight: bold;
  @include media-breakpoint-down(xs) {
    font-size: 1.4rem;
  }
}

.buttons {
  display: flex;
  flex-flow: row;
  align-content: center;
  margin-top: 1em;
  justify-content: center;

  & * {
    font-size: 19px;
    margin-right: 0.5em;
    margin-left: 0.5em;
    font-weight: 700;
    line-height: 1em;
    padding: 10px;
    outline: 0;
    color: #fff;
    background-color: $color-orange;
    cursor: pointer;
    border-radius: 0.2em;
    border: 1px solid $color-secondary-border;
  }
}

.container-box {
  margin-left: auto;
  margin-right: auto;
  @include media-breakpoint-down(md) {
    margin: 40px;
    padding: 30px;
  }
  @include media-breakpoint-down(sm) {
    margin: 30px;
    padding: 20px;
  }
  @include media-breakpoint-down(xs) {
    margin: 20px;
    padding: 19px;
  }
}
.description-gift-card {
  height: 100%;
  width: 100%;
  display: flex;
  align-self: center;
  font-weight: 400;
  font-family: $font-primary;
  line-height: 1.6;
  font-size: 0.9em;
  letter-spacing: .03em;
  @include media-breakpoint-up(md) {
    width: 70%;
    font-size: 1em;
  }
  @include media-breakpoint-down(sm) {
    padding: 0 11vw;
  }
}
</style>
