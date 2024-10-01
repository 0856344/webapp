<template>
  <div class="section">
    <h2>{{ $t('membership') }}</h2>
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
      <p class="text-sm mx-4">
        *exklusive der Kosten für Material oder Maschinennutzung.
      </p>
      <div v-if="this.memberPackages" class="max-w-md mt-2 mx-4 p-3">
        <p class="text-lg font-bold">Deine Benefits:</p>
        <p class="text-lg font-normal text-center">
          {{ this.getMonthlyCredits() }} monatliche Credits
        </p>
        <hr class="border-gray-300" />
        <p class="text-lg font-normal text-center">
          24/7 Makerspace
        </p>
      </div>

      <div v-if="!loading && membership &&upcomingMembership" class="bg-white p-3 pt-1">
        <p class="text-lg font-bold"> Deine neue Mitgliedschaft beginnt bald!  </p>
        <p>Mitgliedschaften laufen immer bis zum Monatsende. Wenn du deine Mitgliedschaft wechselst beendest, dann ist die Änderung erst gültig ab den nächsten Monat.</p>
      </div>
      <div v-if="!loading && membership &&!upcomingMembership &&!currentMembership.untilDate" class="bg-white p-3 pt-1">
        <p class="text-lg font-bold"> Du möchtest deine Mitgliedschaft wechseln? </p>
        <p>Mitgliedschaften laufen immer bis zum Monatsende. Wenn du deine Mitgliedschaft wechselst beendest, dann ist die Änderung erst gültig ab den nächsten Monat.</p>
        <!-- Radio buttons for package selection -->
        <div class="mt-8">
          <hr class="border-gray-300" />
          <label
            v-for="(packageOption, index) in upgradePackages"
            :key="index"
            class="block text-left mt-3"
            :class="{ 'text-gray-400': isDisabled(packageOption) }"
          >
          <input
            type="radio"
            :value="packageOption.id"
            v-model="selectedMembership"
            class="mr-2 align-middle"
            :disabled="isDisabled(packageOption)"
          />
          <span class="align-middle">
        Mitgliedschaft: <strong>{{ packageOption.name }}</strong>
          </span>
            <p class="align-middle mx-10 my-4">
              <strong>{{ getPackageCredits(packageOption) }} Credits </strong>  für <strong> {{ packageOption.recurringFee }}€ </strong>im Monat
            </p>
            <hr class="border-gray-300" />
          </label>
          <button
            type="submit"
            class="w-full py-2 mt-6 text-white rounded-sm bg-orange ring-2 ring-orange-300 cursor:pointer disabled:cursor-default disabled:bg-gray-700 disabled:ring-gray-300 sm:max-w-max sm:px-12 hover:bg-gray-900 hover:ring-gray-300"
            :disabled="!selectedMembership"
            @click="upgradePlan()">
            Upgrade durchführen
          </button>
        </div>
      </div>
      <div v-if="!loading && membership &&!upcomingMembership &&currentMembership &&!currentMembership.untilDate" class="bg-white p-3 pt-1 mt-6">
        <p class="text-lg font-bold"> Du möchtest deine Mitgliedschaft beenden? </p>
        <p>Mitgliedschaften laufen immer bis zum Monatsende. Wenn du deine Mitgliedschaft wechselst beendest, dann ist die Änderung erst gültig ab den nächsten Monat.</p>
        <!-- Radio buttons for package selection -->
        <div class="mt-8">
          <hr class="border-gray-300" />
          <button
            type="submit"
            class="w-full py-2 mt-6 text-white rounded-sm bg-red ring-2 ring-red-300 cursor:pointer disabled:cursor-default disabled:bg-gray-700 disabled:ring-gray-300 sm:max-w-max sm:px-12 hover:bg-gray-900 hover:ring-gray-300"
            :disabled="!currentMembership"
            @click="cancelPackage(currentMembership.id)">
            Mitgliedschaft beenden
          </button>
        </div>
      </div>
      <div v-if="!loading && membership &&!upcomingMembership &&currentMembership.untilDate" class="bg-white p-3 pt-1 mt-6">
        <p class="text-lg font-bold"> Du möchtest deine Mitgliedschaft beenden? </p>
        <p>Mitgliedschaften laufen immer bis zum Monatsende. Wenn du deine Mitgliedschaft wechselst oder beendest, dann ist die Änderung erst gültig ab den nächsten Monat.</p>
        <!-- Radio buttons for package selection -->
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
import { PACKAGES_SHORT_FORMS } from '@/services/constants.js';

export default {
  middleware: 'authenticated',
  data() {
    return {
      packages: null,
      upgradePackages: null,
      currentMembership: null,
      memberPackages: null,
      membership: null,
      upcomingMembership: null,
      memberStorage: null,
      hasSmartGarage: false,
      loading: false,
      loadingAvailableStorage:false,
      availableStorage: null,
      selectedMembership: null, // For tracking the selected membership
    };
  },
  async mounted() {
    await this.reload();
    console.log('this.membership: ', this.membership)
  },
  methods: {
    async reload() {
      this.loading = true;

      this.memberPackages = await this.$store.dispatch(
        'getMemberPackages',
        this.$store.state.member.id,
      );
      this.upgradePackages = await this.$store.dispatch('getPackages');
      this.upgradePackages = this.upgradePackages.filter((p) => {
        const metadata = p.metadata;
        return !metadata.is_storage_box;
      });
      this.sortByKey(this.upgradePackages, "recurringFee");
      console.log(this.upgradePackages)

      this.memberPackages = this.memberPackages.filter((p) => {
        // filter old packages
        if (p.untilDate) {
          const packageDate = new Date(p.untilDate)
          const currentDate = new Date();
          if (packageDate.getTime() < currentDate.getTime()) {
            return false;
          }
        }
        return true;
      });

      // membership of the current member (precondition: only one membership per member)
      // filter discount package
      this.membership = this.memberPackages.filter((p) => {
        const metadata = p._embedded.package.metadata;
        if (metadata?.shortform === PACKAGES_SHORT_FORMS.discount) {
          this.discount = p;
          this.hasDiscount = true;
        }
        // filter only membership from memberPackages - precondition: one member has one membership
        if (
          metadata.is_storage_box ||
          metadata?.shortform === PACKAGES_SHORT_FORMS.discount ||
          metadata?.shortform === PACKAGES_SHORT_FORMS.credits_500 ||
          metadata?.shortform === PACKAGES_SHORT_FORMS.credits_500_discounted
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
      //let identifiedMembership = null;
      //this.membership = [];
      this.membership.filter((p) => {
        return p?._embedded?.package?.metadata?.is_membership_identifier
      });
      this.membership.forEach((p) => {
        if (this.isActiveMembership(p.fromDate,  p.untilDate)) {
          this.currentMembership = p;
        }
        if (this.isUpcomingMembership(p.fromDate)) {
          this.upcomingMembership = p;
        }
      })
      console.log('currentMembership: ', this.currentMembership)

      // storage of the current member
      this.memberStorage = this.memberPackages.filter((p) => {
        const metadata = p._embedded.package.metadata;
        return metadata.is_storage_box;
      });
      //all packages available for booking (Verkauf wurde ausgesetzt)
      this.packages = await this.$store.dispatch('getPackages');
      // filter already booked storages
      this.availableStorage = this.packages.filter((p) => {
        for (const s of this.memberStorage) {
          if (s.package === p.id) {
            return false;
          }
        }
        if (!p.metadata) {
          console.error('no notes (storage, visible) for package: ', p);
          return false;
        }
        this.loading = false;
        this.loadingAvailableStorage = false;
        return p.metadata.is_storage_box && p.metadata.shop_visible;
      });
    },
    getMonthlyCredits() {
      // check all memberPackages for possible monthly credits
      let monthlyCredits = 0;
      this.memberPackages.forEach((p) => {
        if (p?.credits.length > 0) {
          p.credits.forEach((credit) => {
            if (credit?.period === 'month') {
              if (this.isActiveMembership(p.fromDate,  p.untilDate)) {
                monthlyCredits += parseFloat(credit.amount);
              }
            }
          });
        }
      });
      return monthlyCredits * 10;
    },
    isDisabled(packageOption) {
      // Überprüfen, ob die Option in der aktuellen Mitgliedschaft enthalten ist
      return this.membership.some(m => m._embedded.package.metadata.shortform === packageOption.metadata.shortform);
    },
    getPackageCredits(memberPackage) {
      let monthlyCredits = 0
      memberPackage.credits.forEach((c) => {
            if (c?.period === 'month') {
              monthlyCredits += parseFloat(c.amount);
            }
      })
      return monthlyCredits * 10;
    },
    sortByKey(array, key) {
      return array.sort(function (a, b) {
        const x = Number(a[key]);
        const y = Number(b[key]);
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    getFirstDayOfNextMonth() {
      const today = new Date(); // Aktuelles Datum
      const year = today.getFullYear();
      const month = today.getMonth(); // Monate sind 0-basiert (0 = Januar, 11 = Dezember)

      // Erster Tag des nächsten Monats (kein Problem mit Zeitzonen)
      const firstDayOfNextMonth = new Date(Date.UTC(year, month + 1, 1));

      return firstDayOfNextMonth.toISOString(); // Im ISO 8601-Format
    },
    isActiveMembership(startDateString, endDateString) {
      const today = new Date(); // Aktuelles Datum
      // Konvertiere die Eingabe-Strings in Date-Objekte
      const startDate = new Date(startDateString);
      if (endDateString) {
        const endDate = new Date(endDateString);
        // Vergleiche, ob "heute" zwischen dem Start- und Enddatum liegt
        return today >= startDate && today <= endDate;
      }
      else{
        return today >= startDate
      }
    },
    isUpcomingMembership(startDateString) {
      const today = new Date(); // Aktuelles Datum
      // Konvertiere die Eingabe-Strings in Date-Objekte
      const startDate = new Date(startDateString);
      if (startDateString) {
        return today < startDate;
      }
    },


async upgradePlan() {
      // TODO:
      // cancel current membership on upgrade DONE
      // fix credit calculation DONE
      // show alternative text if upgrade is pending DONE
      // cancel membership button
      await this.setPackage(this.selectedMembership);
      await this.cancelPackage(this.currentMembership.id);
    },
    async setPackage(id) {
      await this.$recaptchaLoaded();
      const token = await this.$recaptcha("submit"); // Execute reCAPTCHA with action "submit"
      const captchaData = {
        "g-recaptcha-response": token,
      };
      const startDate = this.getFirstDayOfNextMonth();
      let payload = { id: id, startDate:startDate };
      // add captcha token to payload
      payload = { ...payload, ...captchaData };
      await this.$store
        .dispatch("setPackage", payload)
        .then((response) => {
          //this.packageLoading = false;
          //this.closeSetPackageDialog();
          this.$toast.show("Buchung wurde erfolgreich durchgeführt", {
            className: "goodToast",
          });
          //this.reload();
          window.scrollTo(0, 0)
        })
        .catch((error) => {
          //this.packageLoading = false;
          switch (error?.response?.status) {
            default:
              this.$toast.show("Ein Fehler ist aufgetreten", {
                className: "badToast",
              });
              break;
          }
        });
    },
    async cancelPackage(id) {
       await this.$recaptchaLoaded();
       const token = await this.$recaptcha("submit"); // Execute reCAPTCHA with action "submit"
       const captchaData = {
         "g-recaptcha-response": token,
       };
       let payload = { id: id };
       // add captcha token to payload
       payload = { ...payload, ...captchaData };
       await this.$store
         .dispatch("cancelPackage", payload)
         .then((response) => {
           this.$toast.show("Kündigung wurde erfolgreich durchgeführt", {
             className: "goodToast",
           });
           this.reload();
         })
         .catch((error) => {
           switch (error.response.status) {
             default:
               this.$toast.show("Ein Fehler ist aufgetreten", {
                 className: "badToast",
               });
               break;
           }
         });
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
  },
  computed: {
    mail() {
      const fullName =
        this.$store.state.member.firstName +
        ' ' +
        this.$store.state.member.lastName;
      const memberNumber = this.$store.state.member.memberNumber;
      return (
        'mailto:frontdesk@grandgarage.eu?subject=Änderungsantrag Mitgliedschaft: ' +
        fullName +
        ' ' +
        '(' +
        memberNumber +
        ')'
      );
    },
  },
};
</script>

