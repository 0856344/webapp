<template>
    <div class="credit-package-item">
        <div class="price-title">Preis:</div>
        <div v-if="!hasDiscount" class="price">{{'40€'}}</div>
        <div v-if="hasDiscount" class="price">{{'10€'}}</div>
        <div class="rewards-box">
          <div class="rewards-small-text">{{'erhalte'}}</div>
          <div class="rewards">{{'500 Credits'}}</div>
          <div class="rewards"><font-awesome-icon class="icon" icon="coins" /></div>
        </div>
          <div class="button-container">
          <div v-if="!buyCreditsDialog" class="button" @click="showBuyCreditsDialog()">
            <div class="button-text">
              {{ 'kaufen' }}
            </div>
          </div>
          <div class="button-dialog-container"> <loading-spinner style="margin-top: 7%" v-if="buyLoading" color="#333"/></div>
          <div v-if="!buyLoading" class="button-dialog-container">
            <div v-if="buyCreditsDialog">
              <div class="button-dialog-no" @click="closeBuyCreditsDialog()">
                <div>
                  {{ 'abbrechen' }}
                </div>
              </div>
              <div class="button-dialog-yes" @click=buyCredits()>
                  <div>
                    {{ 'bestätigen' }}
                  </div>
              </div>
            </div>
          </div>
          </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      buyCreditsDialog: false,
      cancelPackageDialog: false,
      buyLoading: false
    }
  },
  props: ['hasDiscount'],
  computed: {
  },
  methods: {
    // get credit
    async buyCredits () {
      this.buyLoading = true
      this.buyCreditsDialog = true
      // get captcha token
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('submit') // Execute reCAPTCHA with action "submit"
      const captchaData = {
        'g-recaptcha-response': token
      }
      // connector will double-check if discount is valid
      let payload = { hasDiscount: this.hasDiscount }
      // add captcha token to payload
      payload = { ...payload, ...captchaData }
      await this.$store.dispatch('buyCredits', payload)
        .then((response) => {
          this.buyLoading = false
          this.buyCreditsDialog = false
          this.$toast.show('Credits wurden erfolgreich verbucht!', {
            className: 'goodToast'
          })
          this.$emit('reload')
        })
        .catch((error) => {
          this.buyLoading = false
          this.buyCreditsDialog = false
          switch (error.response.status) {
            case 401:
              this.$toast.show('Ermäßigung nicht bestätigt. Kontaktiere bitte den Frontdesk.', {
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
    },
    // Name wird momentan direkt von Paket verwendet (war mit jährlich/reduziert vorher nicht möglich)
    // falls sich die Anforderungen wieder ändern, kann dieser Code verwendet werden
    // getMembershipName () {
    //   if (this?.userPackage?._embedded?.package?.notes?.shortform) {
    //     const ms = this.membershipList.filter((ms) => {
    //       return ms.shortform === this.userPackage._embedded.package.notes.shortform
    //     })
    //     return ms[0].name
    //   }
    // },
    showBuyCreditsDialog () {
      this.buyCreditsDialog = true
    },
    closeBuyCreditsDialog () {
      this.buyCreditsDialog = false
    }
  }
}
</script>

<style lang="scss">

.credit-package-item {
  font-size: 1rem;
  font-family: "Roboto Mono", monospace;
  line-height: 1;
  display: flex;
  background: #fafafa;
  padding: 12px;
  margin: 1em 0;
  border: 1px solid grey;
  border-radius: 0.3em;
  width: 270px;
  height: 270px;
  flex-direction: column;
  //max-width: 500px;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.14118);

  .price-title {
    font-weight: lighter;
    padding-bottom: 5px;
    font-size: 0.9em;
    text-align: center;
    vertical-align: middle;
    color: grey;
  }

  .price {
    margin-top: 10px;
    font-weight: bold;
    color: darkorange;
    padding-bottom: 10px;
    font-size: 1.3em;
    text-align: center;
    vertical-align: middle;
  }
  .rewards-box {
    display: flex;
    width: 100%;
    height: 100%; /* NEW */
    background: #ddefff;
    border-radius: 0.3em;
    flex-direction: column;
    .rewards-small-text {
      margin-top: 20px;
      font-weight: lighter;
      padding-bottom: 5px;
      font-size: 0.9em;
      text-align: center;
      vertical-align: middle;
      color: grey;
    }
    .rewards {
      margin-top: 10px;
      font-weight: bold;
      //color: darkorange;
      padding-bottom: 10px;
      font-size: 1.3em;
      text-align: center;
      vertical-align: middle;
    }
  }

  //margin-left: 25px;
  //  .package-date{
  //    display:flex;
  //    padding-bottom: 10px;
  //    color: $color-secondary;
  //  }
  //  .interval{
  //    padding-bottom: 10px;
  //  }
  .button-container {
    display: flex;
    width: 100%;
    height: 100%; /* NEW */
    //background: #ddefff;
    //border-radius: 0.3em;
    flex-direction: column;
    .button {
      //justify-content: flex-end;
      //display: flex;
      align-self: end;
      height: 30px;
      cursor: pointer;
      //margin-top: 7%;
      background: $color-secondary;
      border-radius: 15px;
      color: white;
      padding: 7px;
      font-size: 16px;
      width: 110px;
      text-align: center;
      vertical-align: middle;
      margin: 7% auto 0;
    }

    .button-text {
      display: inline-block;
      text-align: center;
    }

    & * {
      text-transform: uppercase;
    }

    .button-dialog-container{
      text-align: center;

    .button-dialog-yes {
      cursor: pointer;
      margin-top: 7%;
      background: $color-success-border;
      border-radius: 15px;
      color: white;
      padding: 7px;
      font-size: 16px;
      width: 110px;
      display: inline-block;
    }

    .button-dialog-no {
      cursor: pointer;
      margin-top: 7%;
      background: $color-red;
      border-radius: 15px;
      color: white;
      padding: 7px;
      font-size: 16px;
      width: 110px;
      display: inline-block;
    }
    }
  }
}

</style>
