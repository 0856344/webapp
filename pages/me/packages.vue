<template>
  <div class="section">
    <h2>{{ $t("membership") }} & Credits</h2>
    <br />
    <fieldset>
      <legend>Mitgliedschaft</legend>
      <div><loading-spinner v-if="loading" color="#333" /></div>
      <div v-if="!loading && membership">
        <div v-for="userPackage of membership" :key="userPackage.id">
          <package
            v-on:reload="reload"
            :user-package="userPackage"
            :storage="false"
          />
        </div>
      </div>

      <div v-if="memberStorage && memberStorage.length > 0">
        <div v-for="userPackage of memberStorage" :key="userPackage.id">
          <package
            v-on:reload="reload"
            :user-package="userPackage"
            :storage="true"
            :booked="true"
          />
        </div>
      </div>
      <p>
        Bei Änderungen deiner Mitgliedschaft kontaktiere bitte unseren Frontdesk
        per Mail an <a v-bind:href="mail">frontdesk@grandgarage.eu</a>
      </p>
    </fieldset>
    <fieldset v-if="hasSmartGarage">
      <legend>Credits</legend>
      <div style="margin-top: 20px; margin-bottom: 15px">
        <span>Aktueller Status: </span>
        <span v-if="this.getAllCredits() === 0">
          <strong><span>0 Credits</span> </strong>
        </span>
        <span v-if="this.getAllCredits() !== 0">
          <transition name="fade">
            <span v-show="!loading"
              ><strong>
                <span style="color: green"
                  >{{ this.getAllCredits() }} Credits</span
                >
              </strong></span
            >
          </transition>
        </span>
      </div>

      <p>
        Monatliches Kontingent:
        <strong> {{ this.getMonthlyCredits() }} Credits</strong>
      </p>
      <p>
        Jedes Paket beinhaltet ein gewisses Kontingent an Credits pro Monat. Die
        Freikontingente können nicht ins nächste Monat mitgenommen werden.
      </p>
      <p>
        <strong>UNSER TIPP: </strong>Sichere dir vorab zusätzliche Credits —
        direkt im Bereich ‚Credits kaufen‘ mit einem Klick. Diese zusätzlich
        (gekauften) Credits bleiben auch über die Monatsgrenze hinweg erhalten.
        Weitere Infos > <nuxt-link target="_blank" to="/de/agb">AGB</nuxt-link>.
      </p>
      <p>
        Du willst dein Paket wechseln, dann schicke gern ein Mail an den
        Frontdesk <a v-bind:href="mail">frontdesk@grandgarage.eu</a>
      </p>
      <div v-if="discount" style="margin-top: 50px; margin-bottom: 40px">
        <p>
          <strong>Ermäßigung: </strong> Dein ermäßigter Preis auf Credits ist
          gültig bis:
          <strong>
            <span style="color: green"
              >{{ formatDate(discount.untilDate) }}.</span
            >
          </strong>
        </p>
        <p style="font-size: smaller">
          <u
            >Läuft deine Ermäßigung bald ab? Dann verlängere sie beim Frontdesk
            vorort!</u
          >
        </p>
      </div>
      <div><loading-spinner v-if="loading" color="#333" /></div>
    </fieldset>
    <fieldset v-if="hasSmartGarage">
      <legend style="margin-bottom: 20px">Credits kaufen</legend>
      <div><loading-spinner v-if="!memberPackages" color="#333" /></div>
      <div style="margin-bottom: 20px" v-if="memberPackages">
        <credit-package v-on:reload="reload" :hasDiscount="hasDiscount" />
      </div>
    </fieldset>

    <fieldset>
      <legend>Lager</legend>
      <div><loading-spinner v-if="loadingAvailableStorage" color="#333" /></div>
      <div
        v-if="
          !loadingAvailableStorage &&
          availableStorage &&
          availableStorage.length > 0 &&
          membership &&
          membership.length > 0
        "
      >
        <div v-for="userPackage of availableStorage" :key="userPackage.id">
          <package
            v-on:reload="reload"
            :user-package="userPackage"
            :storage="true"
            :booked="false"
          />
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  data() {
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
      loading: false,
      availableStorage: null,
      loadingAvailableStorage: false,
    };
  },
  async mounted() {
    await this.reload();
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("de-at");
    },
    async reload() {
      this.loading = true;
      this.loadingAvailableStorage = true;
      await this.loadCreditStatus();
      this.memberPackages = await this.$store.dispatch(
        "getMemberPackages",
        this.$store.state.member.id
      );
      this.memberPackages = this.memberPackages.filter((p) => {
        // filter old packages
          if (p.untilDate) {
            const packageDate = new Date(p.untilDate)
            const currentDate = new Date();
            if (packageDate.getTime() < currentDate.getTime()) {
              return false;
            }
          }
          return true
      })

      // membership of the current member (precondition: only one membership per member)
      // filter discount package
      this.membership = this.memberPackages.filter((p) => {
        const metadata = p._embedded.package.metadata;
        if (metadata?.shortform === "DISCOUNT") {
          this.discount = p;
          this.hasDiscount = true;
        }
        // filter only membership from memberPackages - precondition: one member has one membership
        if (
          metadata.is_storage_box ||
          metadata?.shortform === "DISCOUNT" ||
          metadata?.shortform === "500_CREDITS" ||
          metadata?.shortform === "500_CREDITS_DISCOUNTED"
        ) {
          return false;
        }
        // only SmartGarage members have credit feature
        if (metadata?.allow_credits) {
          this.hasSmartGarage = true;
        }
        return true;
      });
      // check if package has "is_membership_identifier" flag to identify the membership package
      // (show only identified membership in that case)
      // https://grandgarage.atlassian.net/browse/CON-443
      let identifiedMembership = null;
      this.membership.forEach((p) => {
        if (p?._embedded?.package?.metadata?.is_membership_identifier) {
          identifiedMembership = p;
        }
      });
      if (identifiedMembership) {
        this.membership = [];
        this.membership.push(identifiedMembership);
      }

      // storage of the current member
      this.memberStorage = this.memberPackages.filter((p) => {
        const metadata = p._embedded.package.metadata;
        return metadata.is_storage_box;
      });
      //all packages available for booking (Verkauf wurde ausgesetzt)
      this.packages = await this.$store.dispatch("getPackages");
      // filter already booked storages
      this.availableStorage = this.packages.filter((p) => {
        for (const s of this.memberStorage) {
          if (s.package === p.id) {
            return false;
          }
        }
        //handle packages with no notes available for storage & visibility or malformed format
        if (!p.metadata) {
          console.error("no notes (storage, visible) for package: ", p);
          return false;
        }
        this.loading = false;
        this.loadingAvailableStorage = false;
        return p.metadata.is_storage_box && p.metadata.shop_visible;
      });
    },
    async loadCreditStatus() {
      this.memberCredits = await this.$store.dispatch(
        "getMemberCredits",
        this.$store.state.member.id
      );
      // update credits status every 30 seconds
      setInterval(() => {
        this.$store
          .dispatch("getMemberCredits", this.$store.state.member.id)
          .then((response) => {
            this.memberCredits = response;
          })
          .catch((err) => {
            console.error(err);
          });
      }, 30000);
    },
    getAllCredits() {
      let creditSum = 0;
      if (this.memberCredits) {
        this.memberCredits.forEach((credit) => {
          if (credit?.remainingAmount) {
            creditSum += parseFloat(credit.remainingAmount);
          }
        });
      }
      return Number(creditSum * 10).toFixed(1);
    },
    getMonthlyCredits() {
      // check all memberPackages for possible monthly credits
      let monthlyCredits = 0;
      this.memberPackages.forEach((p) => {
        if (p?.credits.length > 0) {
          p.credits.forEach((credit) => {
            if (credit?.period === "month") {
              monthlyCredits += parseFloat(credit.amount);
            }
          });
        }
      });
      return monthlyCredits * 10;
    },
    checkValue($value) {
      if (parseFloat($value) > this.deposit) {
        this.redeemDeposit = this.deposit;
      }
      if (this.decimalCount($value) > 2) {
        this.redeemDeposit = Number(Math.floor($value * 100) / 100).toFixed(2);
      }
    },
  },
  computed: {
    mail() {
      const fullName =
        this.$store.state.user.profile.firstName +
        " " +
        this.$store.state.user.profile.lastName;
      const memberNumber = this.$store.state.user.profile.memberNumber;
      return (
        "mailto:frontdesk@grandgarage.eu?subject=Änderungsantrag Mitgliedschaft: " +
        fullName +
        " " +
        "(" +
        memberNumber +
        ")"
      );
    },
  },
};
</script>

<style lang="scss">
fieldset {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #000;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
