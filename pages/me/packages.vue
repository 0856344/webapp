<template>
  <div class="section">
    <h2>{{ $t('membership') }} & Credits</h2>
    <br>
    <fieldset>
      <legend>Mitgliedschaft</legend>
        <div>  <loading-spinner
            v-if="!(memberPackages && memberStorage)"
            color="#333"
        />
        </div>
      <div v-if="membership">
        <div
            v-for="userPackage of membership"
            :key="userPackage.id">
          <package v-on:reload="reload"
              :user-package="userPackage"
              :storage=false />
        </div>
      </div>

      <div v-if="memberStorage && memberStorage.length > 0" >
        <div
            v-for="userPackage of memberStorage"
            :key="userPackage.id">
          <package v-on:reload="reload"
              :user-package="userPackage"
              :storage=true
              :booked=true
          />
        </div>
      </div>
      <p>Bei Änderungen Deiner Mitgliedschaft kontaktiere bitte unseren
        <a v-bind:href="mail">Frontdesk</a> per E-Mail.  </p>
    </fieldset>
    <fieldset v-if="hasSmartGarage">
      <legend>Credits</legend>
      <div style="margin-top: 20px; margin-bottom: 15px">
        <span>aktueller Status: </span>
        <span v-if="this.getAllCredits() === 0">
          <strong><span>0 Credits</span> </strong>
        </span>
        <span v-if="this.getAllCredits() !== 0">
          <transition name="fade">
            <span v-show="!loading"><strong> <span style="color: green">{{ this.getAllCredits() }} Credits</span> </strong></span>
          </transition>
        </span>
<!--        <transition name="fade">-->

<!--          <p v-show="!loadingCredits">aktueller Status: <strong> <span style="color: green">{{ this.getAllCredits() }} Credits</span> </strong></p>-->
<!--        </transition>-->
      </div>

      <p>monatliches Kontingent: <strong> {{ this.getMonthlyCredits() }} Credits</strong> </p>
      <p style="font-size: smaller"><u>Benötigst du mehr Credits? Dann wechsle deine Mitgliedschaft oder kaufe zusätzliche Credits!</u></p>
      <div v-if="discount" style="margin-top: 50px; margin-bottom: 40px">
        <p><strong>Ermäßigung: </strong> Dein ermäßigter Preis auf Credits ist gültig bis: <strong> <span style="color: green">{{ formatDate(discount.untilDate) }}.</span> </strong></p>
        <p style="font-size: smaller"><u>Läuft deine Ermäßigung bald ab? Dann verlängere sie beim Frontdesk vorort!</u></p>
      </div>
      <div> <loading-spinner v-if="loading" color="#333"/>  </div>
    </fieldset>
    <fieldset v-if="hasSmartGarage">
      <legend style="margin-bottom: 20px">Credits kaufen</legend>
      <div>  <loading-spinner v-if="!memberPackages" color="#333"/></div>
      <div style="margin-bottom: 20px" v-if="memberPackages">
        <credit-package v-on:reload="reload" :hasDiscount=hasDiscount />
        <p style="font-size: smaller"><u>Ausschließlich für die Bezahlung von Maschinengebühren gültig.</u></p>
      </div>
    </fieldset>
    <!--      Verkauf von Lagerboxen wurde temporär ausgesetzt: https://grandgarage.atlassian.net/browse/HP-212-->
<!--  <div v-if="availableStorage && membership.length > 0" >-->
<!--    <h2>Lager buchen</h2>-->
<!--    <div-->
<!--        v-for="userPackage of availableStorage"-->
<!--        :key="userPackage.id">-->
<!--      <package v-on:reload="reload"-->
<!--          :user-package="userPackage"-->
<!--          :storage=true-->
<!--          :booked=false-->
<!--      />-->
<!--    </div>-->
<!--  </div>-->
  </div>
 </template>

<script>

export default {
  middleware: 'authenticated',
  data () {
    return {
      memberPackages: null,
      membership: null,
      memberStorage: null,
      memberCredits: null,
      buyCredits: null,
      discount: null,
      hasDiscount: false,
      // only SmartGarage members have credit feature
      hasSmartGarage: false,
      loading: false
      //availableStorage: null
    }
  },
  async mounted () {
    await this.reload()
  },
  methods: {
    formatDate (date) {
      return new Date(date).toLocaleDateString('de-at')
    },
    async reload () {
      this.loading = true
      await this.loadCreditStatus()
      this.memberPackages = await this.$store.dispatch('getMemberPackages', this.$store.state.member.id)

      // membership of the current member (precondition: only one membership per member)
      // filter discount package
      this.membership = this.memberPackages.filter((p) => {
        const notes = p._embedded.package.notes
        if (notes?.shortform === 'DISCOUNT') {
          this.discount = p
          this.hasDiscount = true
        }
        // filter only membership from memberPackages - precondition: one member has one membership
        if (notes.is_storage_box || notes?.shortform === 'DISCOUNT' || notes?.shortform === '500_CREDITS' || notes?.shortform === '500_CREDITS_DISCOUNTED') {
          return false
        }
        // only SmartGarage members have credit feature
        if (notes?.shortform === 'SG' || notes?.shortform === 'SG+DT' || notes?.shortform === 'SG+ALL' || notes?.shortform === 'SG+MW') {
          this.hasSmartGarage = true
        }
        return true
      })

      // storage of the current member
      this.memberStorage = this.memberPackages.filter((p) => {
        const notes = p._embedded.package.notes
        return notes.is_storage_box
      })
      this.loading = false

      //all packages available for booking (Verkauf wurde ausgesetzt)
      // this.packages = await this.$store.dispatch('getPackages')
      // // filter already booked storages
      // this.availableStorage = this.packages.filter((p) => {
      //   for (const s of this.memberStorage) {
      //     if (s.package === p.id) {
      //       return false
      //     }
      //   }
      //   //handle packages with no notes available for storage & visibility or malformed format
      //   if (!p.notes) {
      //     console.error('no notes (storage, visible) for package: ', p)
      //     return false
      //   }
      //   return p.notes.is_storage_box && p.notes.shop_visible
      // })
    },
    async loadCreditStatus () {
      this.memberCredits = await this.$store.dispatch('getMemberCredits', this.$store.state.member.id)
      // update credits status every 30 seconds
      setInterval(() => {
        this.$store.dispatch('getMemberCredits', this.$store.state.member.id).then((response) => {
          this.memberCredits = response
        }).catch(err => {
          console.log(err)
        })
      }, 30000)
    },
    getAllCredits () {
      let creditSum = 0
      if (this.memberCredits) {
        this.memberCredits.forEach((credit) => {
          if (credit?.remainingAmount) {
            creditSum += parseFloat(credit.remainingAmount)
          }
        })
      }
      return Number(creditSum * 10).toFixed(1)
    },
    getMonthlyCredits () {
      if (this?.membership) {
        //console.log(this.membership[0])
        let monthlyCredits = 0
        this.membership[0].credits.forEach((credit) => {
          if (credit?.period === 'month') {
            monthlyCredits = parseFloat(credit.amount)
          }
        })
        return monthlyCredits * 10
      }
    },
    checkValue ($value) {
      if (parseFloat($value) > this.deposit) {
        this.redeemDeposit = this.deposit
      }
      if (this.decimalCount($value) > 2) {
        this.redeemDeposit = Number(Math.floor($value * 100) / 100).toFixed(2)
      }
    }
  },
  computed: {
    mail () {
      const fullName = this.$store.state.user.profile.firstName + ' ' + this.$store.state.user.profile.lastName
      const memberNumber = this.$store.state.user.profile.memberNumber
      return 'mailto:frontdesk@grandgarage.eu?subject=Änderungsantrag Mitgliedschaft: ' + fullName + ' ' + '(' + memberNumber + ')'
    }
  }
}
</script>

<style lang="scss">
  fieldset {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #000;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
