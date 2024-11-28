<template>
  <div class="section" >
    <h2>{{ $t("membership") }}</h2>
    <br />
    <div><loading-spinner v-if="loading" color="#333" /></div>
    <fieldset v-if="!loading && membership && currentMembership &&currentMembership">
      <legend>Mitgliedschaft</legend>
      <div v-if="!currentMembership._embedded.package.metadata?.group">
        <div v-for="userPackage of membership" :key="userPackage.id">
          <package
            v-on:reload="reload"
            :user-package="userPackage"
            :storage="false"
          />
        </div>
      </div>
      <div v-if="this.memberPackages" class="max-w-lg p-3 mb-4 bg-white border-2">
        <p class="text-lg font-bold text-center">{{this.currentMembership._embedded.package.name}}</p>
        <div v-if="this.isAdmin">
          <p class="font-normal text-center text-sm">
            <strong>{{ this.groupSize }}</strong> Team Plätze
          </p>
          <p class="font-normal text-center text-sm">
            <strong>{{ this.currentMembership.recurringFee*this.groupSize }}€*</strong> monatlich ({{ parseFloat(Number(this.currentMembership.recurringFee).toFixed(1))}}€ pro Platz)
          </p>
          <p v-if="creditType==='pot'" class="font-normal text-center text-sm">
            <strong>{{ this.getMonthlyCreditsForTeamAdmin() *this.groupSize }}€ Guthaben</strong> monatlich ({{ this.getMonthlyCreditsForTeamAdmin()}}€ Guthaben pro Person)
          </p>
          <p v-if="creditType==='split'" class="font-normal text-center text-sm">
            <strong>{{ this.getMonthlyCreditsForTeamAdmin()}}</strong>€ Guthaben pro Person (Guthaben wird geteilt)
          </p>
        </div>
        <div v-if="!this.isAdmin">
          <p v-if="this.getMonthlyCredits()!==0" class="font-normal text-center text-sm">
            <strong>{{ this.getMonthlyCredits() }}</strong>€ monatliches Guthaben*
          </p>
<!--          <p v-else class="font-normal text-center text-sm">-->
<!--            Das monatliche Credit Kontingent ist bei Administrator hinterlegt-->
<!--          </p>-->
        </div>
<!--        <p v-if="currentMembership._embedded.package.metadata.shortform ==='MS24_PRO'" class="font-normal text-center text-sm">-->
<!--          <strong>{{ this.getMonthlyCredits() }}</strong> monatliche Credits-->
<!--        </p>-->
        <hr class="border-gray-300" />
        <div v-if="currentMembership._embedded.package.metadata.shortform ==='MS24_FLEX' " >
          <div v-if="!currentMembership.untilDate">
            <p class="font-normal text-center text-bold  text-sm"><strong>automatische Erneuerung:</strong></p>
            <p class="font-normal text-center text-bold text-sm"> <strong>{{new Date(getUntilDateForFlexPackage(currentMembership.fromDate)).toLocaleDateString("DE", { day: "2-digit",month: "long",year: "numeric" })}}</strong></p>
            <hr class="border-gray-300" />
          </div>

          <p class="font-normal text-center text-bold text-green text-sm"><strong>keine monatliche Gebühr</strong></p>

        </div>
        <div v-if="currentMembership._embedded.package.metadata.shortform ==='MS24_STARTER' ||
         currentMembership._embedded.package.metadata.shortform ==='MS24_STARTER_GROUP' ||
          currentMembership._embedded.package.metadata.shortform ==='MS24_STARTER_PERMISSIONS_TEAMPOT'" class="font-normal text-center text-green text-sm">
          <p><strong>15% Rabatt</strong> auf Maschinenpreise</p>
          <hr class="border-gray-300" />
          <div v-if="this.isAdmin">
            <p><strong>1 Stunde Maschinenreservierung pro Woche für jedes Teammitglied inkludiert</strong> (danach 5€ pro Stunde)</p>
          </div>
          <div v-if="!this.isAdmin">
            <p><strong>1 Stunde Maschinenreservierung pro Woche inkludiert</strong> (danach 5€ pro Stunde)</p>
          </div>
        </div>
        <div v-if="currentMembership._embedded.package.metadata.shortform ==='MS24_MAKER' ||
         currentMembership._embedded.package.metadata.shortform ==='MS24_MAKER_GROUP' ||
          currentMembership._embedded.package.metadata.shortform ==='MS24_MAKER_PERMISSIONS_TEAMPOT'" class="font-normal text-center text-green text-sm">
          <p><strong>25% Rabatt</strong> auf Maschinenpreise</p>
          <hr class="border-gray-300" />
          <div v-if="this.isAdmin">
            <p><strong>1 Stunde Maschinenreservierung pro Woche für jedes Teammitglied inkludiert</strong> (danach 5€ pro Stunde)</p>
          </div>
          <div v-if="!this.isAdmin">
            <p><strong>1 Stunde Maschinenreservierung pro Woche inkludiert</strong> (danach 5€ pro Stunde)</p>
          </div>

        </div>
        <div v-if="currentMembership._embedded.package.metadata.shortform ==='MS24_PRO' ||
         currentMembership._embedded.package.metadata.shortform ==='MS24_PRO_GROUP' ||
         currentMembership._embedded.package.metadata.shortform ==='MS24_PRO_PERMISSIONS_TEAMPOT'" class="font-normal text-center text-green text-sm">
          <p><strong>35% Rabatt</strong>  auf Maschinenpreise</p>
          <hr class="border-gray-300" />
          <div v-if="this.isAdmin">
            <p><strong>5 Stunden Maschinenreservierung pro Woche für jedes Teammitglied inkludiert</strong> (danach 5€ pro Stunde)</p>
          </div>
          <div v-if="!this.isAdmin">
            <p><strong>5 Stunden Maschinenreservierung pro Woche inkludiert</strong> (danach 5€ pro Stunde)</p>
          </div>
        </div>
        <hr class="border-gray-300" />
        <p class="font-normal text-center text-sm">
          <strong>24/7 Makerspace</strong>
        </p>
      </div>
      <p class="text-sm mx-4 mb-8">
        *exklusive der Kosten für Material oder Maschinennutzung (nach Verbrauch des Guthabens).
      </p>

      <div v-if="!loading && membership &&upcomingMembership &&!currentMembership._embedded.package.metadata?.group " class="bg-white p-3 pt-1">
        <p class="text-lg font-bold"> Deine neue Mitgliedschaft beginnt bald!  </p>
        <p>Mitgliedschaften laufen immer bis zum letzen Tag des aktuellen Monats.</p>
      </div>
      <div v-if="!loading && membership &&!upcomingMembership &&!currentMembership._embedded.package.metadata?.group && isPrivateMember()" class="bg-white p-3 pt-1">
        <p class="text-lg font-bold"> Du möchtest deine Mitgliedschaft wechseln? </p>
        <p>Mitgliedschaften laufen immer bis zum letzen Tag des aktuellen Monats. Wenn du deine Mitgliedschaft wechselst, dann startet die neue Mitgliedschaft am:  <strong> {{new Date(getStartDate()).toLocaleDateString("DE", { day: "2-digit",month: "long",year: "numeric" })}} </strong></p>
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
          <span class="align-middle">Mitgliedschaft: <strong>{{ packageOption.name }}</strong>
            <span v-if="isSelectedMembershipCurrentMembership(packageOption)"><strong>(aktuell)</strong></span>
          </span>
            <div v-if="packageOption.metadata.shortform === 'MS24_FLEX'" class="align-middle mx-10 my-4" >
<!--              <strong>{{ getPackageCredits(packageOption) }} Credits </strong>  für <strong> {{ packageOption.recurringFee }}€ </strong>im Monat-->
              <p :class="{ 'text-green': !isDisabled(packageOption) }" ><strong>keine monatliche Gebühr</strong></p>
              <p :class="{ 'text-green': !isDisabled(packageOption) }" ><strong>24/7 Makerspace</strong></p>
<!--              <p :class="{ 'text-red': !isDisabled(packageOption) }" ><strong>50% Aufpreis </strong>  auf Maschinenpreise</p>-->
              <p :class="{ 'text-red': !isDisabled(packageOption) }" ><strong>25€ Jahresbeitrag </strong></p>
            </div>
            <div v-if="packageOption.metadata.shortform === 'MS24_STARTER'" class="align-middle mx-10 my-4" >
              <strong>{{ getPackageCredits(packageOption) }}€ Guthaben </strong>  für <strong> {{ packageOption.recurringFee }}€ </strong>im Monat
              <p :class="{ 'text-green': !isDisabled(packageOption) }" ><strong>24/7 Makerspace</strong></p>
              <p :class="{ 'text-green': !isDisabled(packageOption) }" ><strong>15% Rabatt</strong>  auf Maschinenpreise</p>
              <p :class="{ 'text-green': !isDisabled(packageOption) }" ><strong>kein Jahresbeitrag</strong></p>
              <p :class="{ 'text-green': !isDisabled(packageOption) }" ><strong>1 Stunde Maschinenreservierung pro Woche inkludiert</strong> (danach 5€ pro Stunde)</p>
            </div>
            <div v-if="packageOption.metadata.shortform === 'MS24_MAKER'" class="align-middle mx-10 my-4 ">
              <strong>{{ getPackageCredits(packageOption) }}€ Guthaben </strong>  für <strong> {{ packageOption.recurringFee }}€ </strong>im Monat
              <p :class="{ 'text-green': !isDisabled(packageOption) }" ><strong>24/7 Makerspace</strong></p>
              <p :class="{ 'text-green': !isDisabled(packageOption) }"><strong>25% Rabatt </strong>  auf Maschinenpreise</p>
              <p :class="{ 'text-green': !isDisabled(packageOption) }"><strong>kein Jahresbeitrag</strong></p>
              <p :class="{ 'text-green': !isDisabled(packageOption) }" ><strong>1 Stunde Maschinenreservierung pro Woche inkludiert </strong>(danach 5€ pro Stunde)</p>
            </div>
            <div v-if="packageOption.metadata.shortform === 'MS24_PRO'" class="align-middle mx-10 my-4 ">
              <strong>{{ getPackageCredits(packageOption) }}€ Guthaben </strong>  für <strong> {{ packageOption.recurringFee }}€ </strong>im Monat
              <p :class="{ 'text-green': !isDisabled(packageOption) }" ><strong>24/7 Makerspace</strong></p>
              <p  :class="{ 'text-green': !isDisabled(packageOption) }"><strong>35% Rabatt </strong>  auf Maschinenpreise</p>
              <p :class="{ 'text-green': !isDisabled(packageOption) }"><strong>kein Jahresbeitrag</strong></p>
              <p :class="{ 'text-green': !isDisabled(packageOption) }" ><strong>5 Stunden Maschinenreservierung pro Woche inkludiert </strong>(danach 5€ pro Stunde)</p>
            </div>
            <hr class="border-gray-300 my-4" />
          </label>
          <p class="text-xs text-left">* die Mitgliedschaften <strong>"SMALL & DIGI"</strong> laufen am 30.11.2024 aus.</p>
          <button
            type="submit"
            class="w-full py-2 mt-6 text-white rounded-sm bg-orange ring-2 ring-orange-300 cursor:pointer disabled:cursor-default disabled:bg-gray-700 disabled:ring-gray-300 sm:max-w-max sm:px-12 hover:bg-gray-900 hover:ring-gray-300"
            :disabled="!selectedMembership || selectedMembership===currentMembership._embedded.package.id"
            @click="upgradePlan()">
            Mitgliedschaft wechseln
          </button>
        </div>
      </div>
      <div v-if="!loading && membership &&!upcomingMembership &&currentMembership &&!currentMembership.untilDate &&!currentMembership._embedded.package.metadata?.group && isPrivateMember() " class="bg-white p-3 pt-1 mt-6">
        <p class="text-lg font-bold"> Du möchtest deine Mitgliedschaft beenden? </p>
        <p>Bei Kündigungen laufen Mitgliedschaften bis zum letzten Tag des nächsten Monats. Wenn du deine Mitgliedschaft jetzt beendest, dann läuft deine Mitgliedschaft bis: <strong> {{new Date(getCancelDate()).toLocaleDateString("DE", { day: "2-digit",month: "long",year: "numeric" })}} </strong></p>
        <!-- Radio buttons for package selection -->
        <div class="mt-8">
          <hr class="border-gray-300" />
          <button
            type="submit"
            class="w-full py-2 mt-6 text-white rounded-sm bg-red ring-2 ring-red-300 cursor:pointer disabled:cursor-default disabled:bg-gray-700 disabled:ring-gray-300 sm:max-w-max sm:px-12 hover:bg-gray-900 hover:ring-gray-300"
            :disabled="!currentMembership"
            @click="cancelPackage(currentMembership.id, getCancelDate())">
            Mitgliedschaft kündigen
          </button>
        </div>
      </div>
      <div v-if="!loading && membership &&!upcomingMembership &&currentMembership.untilDate &&!currentMembership._embedded.package.metadata?.group  " class="bg-white p-3 pt-1 mt-6">
        <p class="text-lg font-bold"> Du möchtest deine Mitgliedschaft beenden? </p>
        <p>Die Mitgliedschaften haben eine Mindestlaufzeit bis am letzten Tag des Folgemonats ab Kündigungsdatum. </p>
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
      <div v-if="currentMembership && currentMembership._embedded.package.metadata?.group">
        <p class="my-8">
              Bitte kontaktiere den
              <a href="mailto:frontdesk@grandgarage.eu">Frontdesk</a>, um dein Mitgliedschaftspaket anzupassen.
        </p>
        <p>Mitgliedschaften laufen bei einer Kündigung immer bis zum letzten Tag des nächsten Monats. </p>
        <p>Wenn du eine Mitgliedschaft jetzt beendest, dann läuft die Mitgliedschaft bis: <strong> {{new Date(getCancelDate()).toLocaleDateString("DE", { day: "2-digit",month: "long",year: "numeric" })}} </strong></p>
      </div>

    </fieldset>

<!--    Lagerbuchung deaktiviert am 26.11 nach Projektmeeting-->
<!--    <fieldset v-if="!loading">-->
<!--      <legend>Lager</legend>-->
<!--      <div><loading-spinner v-if="loadingAvailableStorage" color="#333" /></div>-->
<!--      <div-->
<!--        v-if="-->
<!--          !loadingAvailableStorage &&-->
<!--          availableStorage &&-->
<!--          availableStorage.length > 0 &&-->
<!--          membership &&-->
<!--          membership.length > 0-->
<!--        "-->
<!--      >-->
<!--        <div v-for="userPackage of availableStorage" :key="userPackage.id">-->
<!--          <package-->
<!--            v-on:reload="reload"-->
<!--            :user-package="userPackage"-->
<!--            :storage="true"-->
<!--            :booked="false"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->
<!--    </fieldset>-->
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
  },
  methods: {
    async reload() {
      window.scrollTo(0, 0)
      this.loading = true;

      this.memberPackages = await this.$store.dispatch(
        'getMemberPackages',
        this.$store.state.member.id,
      );
      this.upgradePackages = await this.$store.dispatch('getPackages');
      // sort packages for upgrading: FLEX, STARTER, MAKER, PRO
      const flex = this.upgradePackages.find((p) => {
        const metadata = p.metadata;
        return metadata.shortform ==="MS24_FLEX"
      });
      this.upgradePackages = this.upgradePackages.filter((p) => {
        const metadata = p.metadata;
        return metadata.is_membership_identifier && !metadata?.group && !(metadata?.shortform === 'MS24_FLEX');
      });
      this.sortByKey(this.upgradePackages, "recurringFee");
      // insert flex in first place to have the right order
      if (flex) {
        this.upgradePackages = [flex].concat(this.upgradePackages)
      }

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
      this.membership = this.membership.filter((p) => {
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
      if (this.currentMembership) {
        this.selectedMembership = this.currentMembership._embedded.package.id;
      }

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
      return monthlyCredits;
    },
    getMonthlyCreditsForTeamAdmin() {
      // check all memberPackages for possible monthly credits
      let monthlyCredits = 0;
      this.currentMembership.credits.forEach((credit) => {
            if (credit?.period === 'month') {
              if (this.isActiveMembership(this.currentMembership.fromDate,  this.currentMembership.untilDate)) {
                monthlyCredits = parseFloat(credit.amount);
              }
            }
      });
      return monthlyCredits;
    },
    isDisabled(packageOption) {
      // Überprüfen, ob die Option in der aktuellen Mitgliedschaft enthalten ist oder SMART oder DIGI
      return this.membership.some(m => m._embedded.package.metadata.shortform === packageOption.metadata.shortform) || (packageOption.metadata.shortform === 'SG+DT' || packageOption.metadata.shortform ==='SG');
    },
    isSelectedMembershipCurrentMembership(packageOption) {
      // Überprüfen, ob die ausgewählte Option die aktuelle Membership ist
      if (this.membership.some(m => m._embedded.package.metadata.shortform === packageOption.metadata.shortform)){
        //this.selectedMembership=packageOption.id;
        return true
      } else {
        return false
      }
    },
    getPackageCredits(memberPackage) {
      let monthlyCredits = 0
      memberPackage.credits.forEach((c) => {
            if (c?.period === 'month') {
              monthlyCredits += parseFloat(c.amount);
            }
      })
      return monthlyCredits;
    },
    sortByKey(array, key) {
      return array.sort(function (a, b) {
        const x = Number(a[key]);
        const y = Number(b[key]);
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    getStartDate() {
      const today = new Date(); // Aktuelles Datum
      const year = today.getFullYear();
      const month = today.getMonth(); // Monate sind 0-basiert (0 = Januar, 11 = Dezember)

      // Erster Tag des nächsten Monats (kein Problem mit Zeitzonen)
      const startDate = new Date(Date.UTC(year, month + 1, 1));

      return startDate.toISOString(); // Im ISO 8601-Format
    },
    getUntilDateForFlexPackage(startDate){
      const start = new Date(startDate);

      return start.setFullYear(start.getFullYear() + 1)// Im ISO 8601-Format
    },
    getCancelDate() {
      const today = new Date(); // Aktuelles Datum
      const year = today.getFullYear();
      const month = today.getMonth(); // Monate sind 0-basiert (0 = Januar, 11 = Dezember)

      // Letzter Tag des nächsten Monats (kein Problem mit Zeitzonen)
      let cancelDate = new Date(Date.UTC(year, month + 2, 1));
      cancelDate.setUTCDate(cancelDate.getUTCDate() - 1);

      return cancelDate.toISOString(); // Im ISO 8601-Format
    },
    getChangeMembershipDate() {
      const today = new Date(); // Aktuelles Datum
      const year = today.getFullYear();
      const month = today.getMonth(); // Monate sind 0-basiert (0 = Januar, 11 = Dezember)

      // Letzter Tag des aktuellen Monats (kein Problem mit Zeitzonen)
      let cancelDate = new Date(Date.UTC(year, month + 1, 1));
      cancelDate.setUTCDate(cancelDate.getUTCDate() - 1);

      return cancelDate.toISOString(); // Im ISO 8601-Format
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
    // private and no team member
    // TODO remove Smart & Digi after 1.12.24
    isPrivateMember() {
      if (this.currentMembership &&
        (this.currentMembership._embedded.package.metadata?.shortform === 'MS24_FLEX'||
          this.currentMembership._embedded.package.metadata?.shortform === 'MS24_STARTER'||
          this.currentMembership._embedded.package.metadata?.shortform === 'MS24_MAKER'||
        this.currentMembership._embedded.package.metadata?.shortform === 'MS24_PRO' ||
          this.currentMembership._embedded.package.metadata?.shortform === 'SG'||
          this.currentMembership._embedded.package.metadata?.shortform === 'SG+DT')){
        return true
      } else return false
    },


async upgradePlan() {
      await this.setPackage(this.selectedMembership);
      await this.cancelPackage(this.currentMembership.id, this.getChangeMembershipDate());
    },
    async setPackage(id) {
      await this.$recaptchaLoaded();
      const token = await this.$recaptcha("submit"); // Execute reCAPTCHA with action "submit"
      const captchaData = {
        "g-recaptcha-response": token,
      };
      const startDate = this.getStartDate();
      let payload = { id: id, startDate:startDate };
      // add captcha token to payload
      payload = { ...payload, ...captchaData };
      await this.$store
        .dispatch("setPackage", payload)
        .then((response) => {
          this.$toast.show("Buchung wurde erfolgreich durchgeführt", {
            className: "goodToast",
          });
          //this.reload();
          window.scrollTo(0, 0)
        })
        .catch((error) => {
          switch (error?.response?.status) {
            default:
              this.$toast.show("Ein Fehler ist aufgetreten", {
                className: "badToast",
              });
              break;
          }
        });
    },
    async cancelPackage(id, cancellationDate) {

       await this.$recaptchaLoaded();
       const token = await this.$recaptcha("submit"); // Execute reCAPTCHA with action "submit"
       const captchaData = {
         "g-recaptcha-response": token,
       };
       let payload = { id: id, cancellationDate:cancellationDate };
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
    isAdmin() {
      return this.$store.state.member.metadata?.groupMemberType === 'admin';
    },
    groupSize() {
        return this.$store.state.member.metadata?.numberOfMembers;
    },
    // Split pot oder Team pot for credits
    creditType() {
      return this.$store.state.member.metadata?.selectedCreditType;
    },
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

