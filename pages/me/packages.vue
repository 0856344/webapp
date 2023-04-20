<template>
  <div class="section">
    <h2>{{ $t('membership') }} & Coins</h2>
    <br>
    <fieldset>
      <legend>Mitgliedschaft</legend>
<!--        <h2>{{ $t('membership') }}</h2>-->
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
        <p>Bei Änderungen Deiner Mitgliedschaft kontaktiere bitte unseren
          <a v-bind:href="mail">Frontdesk</a>
          Frontdesk per E-Mail.  </p>
      <div v-if="memberStorage && memberStorage.length > 0" >
        <h2>Lager</h2>
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
    </fieldset>
    <br>
    <br>
    <fieldset>
      <legend>Coins</legend>
<!--      <p>{{ this.getMonthlyMembershipCredits() }}</p>-->
      <p>aktueller Status: <strong> <span style="color: green">{{ this.getAllCredits() }} Coins</span> </strong></p>
      <p>monatliches Kontingent: <strong> {{ this.getMonthlyCredits() }} Coins</strong> </p>
      <p style="font-size: smaller"><u>benötigst du mehr Coins? Dann wechsle deine Mitgliedschaft oder kaufe zusätzliche Coins!</u></p>
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
      memberCredits: null
      //availableStorage: null
    }
  },
  async mounted () {
    await this.reload()
  },
  methods: {
    async reload () {
      this.memberCredits = await this.$store.dispatch('getMemberCredits', this.$store.state.member.id)
      this.memberPackages = await this.$store.dispatch('getMemberPackages', this.$store.state.member.id)

      // membership of the current member
      this.membership = this.memberPackages.filter((p) => {
        //console.log(p)
        const notes = p._embedded.package.notes
        return !notes.is_storage_box
      })

      // storage of the current member
      this.memberStorage = this.memberPackages.filter((p) => {
        const notes = p._embedded.package.notes
        return notes.is_storage_box
      })

      //all packages available for booking
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
    getAllCredits () {
      if (this.memberCredits) {
        let creditSum = 0
        this.memberCredits.forEach((credit) => {
          if (credit?.amount) {
            creditSum += parseFloat(credit.amount)
          }
        })
        return creditSum
      }
    },
    getMonthlyCredits () {
      if (this?.membership) {
        console.log(this.membership[0])
        let monthlyCredits = 0
        this.membership[0].credits.forEach((credit) => {
          if (credit?.period === 'month') {
            monthlyCredits = parseFloat(credit.amount)
          }
        })
        return monthlyCredits
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
    border: 1px solid #000;
  }
</style>
