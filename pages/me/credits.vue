<template>
  <div class="section">
    <h2>Credits</h2>
    <br />
    <loading-spinner v-if="!currentMembership || loadingCreditActivities"></loading-spinner>
    <div v-if="hasSmartGarage && currentMembership &&!loadingCreditActivities">
      <accordion  v-if="!loadingCreditActivities" bgColor="bg-white" textColor="text-black" class="my-4">
        <div slot="header" class="text-xs xs:text-sm md:text-xl">aktuelle Credits:
          <span class="text-orange text-bold">
          {{ Number(monthlyRemainingCredit).toFixed(1)}} Credits</span
          >
<!--          <span v-if="currentMembership._embedded.package.metadata.shortform ==='MS24_PRO'" class="text-orange text-bold">-->
<!--          {{ (monthlyRemainingCredit /0.6).toFixed(1)}} Credits</span-->
<!--          >-->
        </div>
        <div v-if="loadingCreditActivities"><loading-spinner></loading-spinner></div>
        <div class="sm:px-4 my-6 lg:px-8 lg:my-12">
          <table v-if="monthlyCreditActivities && monthlyCreditActivities.length > 0" class="member-portal-table table-auto w-full">
            <thead class="">
            <tr class="w-full text-base">
              <th>
                Creditskontigent gesamt
              </th>
              <th>
                <span v-if="currentMembership._embedded.package.metadata.shortform ==='MS24_MAKER'">{{ Number(monthlyCredits).toFixed(1) }} Credits</span>
<!--                <span v-if="currentMembership._embedded.package.metadata.shortform ==='MS24_PRO'">{{ (monthlyCredits/0.6).toFixed(1) }} Credits</span>-->
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="activity of displayedMonthlyActivities" :key="activity.id"
            >
              <td>
                <div>
                  {{ new Date(activity._embedded.resourceLog.createdAt).toLocaleDateString('de-AT') }} um {{ new Date(activity._embedded.resourceLog.createdAt).toLocaleTimeString('de-AT') }}
                </div>
                <div>
                  {{ convertTime(activity.duration)}}
                </div>
              </td>
              <td>
                <div>
                  <span> - {{((activity.amount * 10)).toFixed(1) }}</span>
<!--                  <span v-if="currentMembership._embedded.package.metadata.shortform ==='MS24_PRO'"> - {{((activity.amount * 10)/0.6).toFixed(1) }}</span>-->
                </div>
                <div>
                  {{ activity.resource_name}}
                </div>
              </td>
            </tr>
            <tr class="w-full bg-black text-white text-base uppercase leading-5 tracking-wide font-semibold">
              <th class="flex-1">
                Verbleibende Credits
              </th>
              <th class="flex-1">
                <span>{{ Number(monthlyRemainingCredit).toFixed(1) }} Credits</span>
<!--                <span v-if="currentMembership._embedded.package.metadata.shortform ==='MS24_PRO'">{{ (monthlyRemainingCredit/0.6).toFixed(1) }} Credits</span>-->
              </th>
            </tr>
            </tbody>
            <div class="text-center bg-white py-2">
              <button
                  class="pagination-button"
                  @click="previousMonthlyActivityPage"
                  :disabled="currentMonthlyActivityPage === 1"
              >
                <font-awesome-icon icon="arrow-circle-left" />
              </button>
              <button
                  class="pagination-button"
                  @click="nextMonthlyActivityPage"
                  :disabled="currentMonthlyActivityPage === totalMonthlyActivityPages"
              >
                <font-awesome-icon icon="arrow-circle-right" />
              </button>
              <div>
                <small class="mute-text"
                >{{ currentMonthlyActivityPage }} / {{ totalMonthlyActivityPages }}</small
                >
              </div>
            </div>
          </table>
          <div v-else>Du hast noch keine Credits eingelöst</div>
        </div>
      </accordion>

      <accordion bgColor="bg-white" textColor="text-black" class="my-4" v-if="oneTimeCredits && oneTimeCredits>0 ">
        <div slot="header" class="text-xs xs:text-sm md:text-xl">Extra Credits:
          <span class="text-orange  text-bold">
          {{ oneTimeCredits }} Credits</span
          >
        </div>
        <div class="sm:px-4 my-6 lg:px-8 lg:my-12">
          <table v-if="packageCreditActivities.length > 0" class="member-portal-table table-auto w-full">
            <thead class="">
            <tr class="w-full text-base">
              <th>
                Creditskontigent gesamt
              </th>
              <th>
                <span>{{ oneTimeCreditsOriginal }} Credits</span>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="creditActivity of displayedPackageActivities" :key="creditActivity.id"
            >
              <td>
                <div>
                  {{ new Date(creditActivity._embedded.resourceLog.createdAt).toLocaleDateString('de-AT') }} um {{ new Date(creditActivity._embedded.resourceLog.createdAt).toLocaleTimeString('de-AT') }}
                </div>
                <div>
                  {{ convertTime(creditActivity.duration)}}
                </div>
              </td>
              <td>
                <div>
                  - {{(creditActivity.amount * 10).toFixed(1) }}
                </div>
                <div>
                  {{ creditActivity.resource_name}}
                </div>
              </td>
            </tr>
            <tr class="w-full bg-black text-white text-base uppercase leading-5 tracking-wide font-semibold">
              <th class="flex-1">
                Verbleibende Credits
              </th>
              <th class="flex-1">
                <span>{{ oneTimeCredits }} Credits</span>
              </th>
            </tr>
            </tbody>
            <div class="text-center bg-white py-2">
              <button
                  class="pagination-button"
                  @click="previousPackageActivityPage"
                  :disabled="currentPackageActivityPage === 1"
              >
                <font-awesome-icon icon="arrow-circle-left" />
              </button>
              <button
                  class="pagination-button"
                  @click="nextPackageActivityPage"
                  :disabled="currentPackageActivityPage === totalPackageActivityPages"
              >
                <font-awesome-icon icon="arrow-circle-right" />
              </button>
              <div>
                <small class="mute-text"
                >{{ currentPackageActivityPage }} / {{ totalPackageActivityPages }}</small
                >
              </div>
            </div>
          </table>
          <div v-else>Du hast noch keine Credits eingelöst</div>
        </div>
      </accordion>

<!--      <accordion bgColor="bg-white" textColor="text-black" class="my-4" v-if="loadingPreviousCreditActivities" >-->
<!--        <div slot="header" class="text-xs xs:text-sm md:text-xl">Credits-Historie (lade Informationen...)-->
<!--        </div>-->
<!--      </accordion>-->
<!--      <p v-if="loadingPreviousCreditActivities" >-->
<!--        lade Credit-History...-->
<!--      </p>-->
      <accordion bgColor="bg-white" textColor="text-black" class="my-4" :key="loadingPreviousCreditActivities" >
        <div slot="header" class="text-xs xs:text-sm md:text-xl">Credits-Historie
        </div>
        <div v-if="loadingPreviousCreditActivities"><loading-spinner></loading-spinner></div>
        <div v-if="!loadingPreviousCreditActivities"  class="sm:px-4 my-6 lg:px-8 lg:my-12">
          <table v-if="previousCreditActivities.length > 0" class="member-portal-table table-auto w-full">
            <thead class="">
            <tr class="w-full">
              <th>
              </th>
              <th>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="creditActivity of displayedPreviousActivities" :key="creditActivity.id"
                class="py-2 sm:px-4"
            >
              <td>
                <div>
                  {{ new Date(creditActivity._embedded.resourceLog.createdAt).toLocaleDateString('de-AT') }} um {{ new Date(creditActivity._embedded.resourceLog.createdAt).toLocaleTimeString('de-AT') }}
                </div>
                <div>
                  {{ convertTime(creditActivity.duration)}}
                </div>
              </td>
              <td>
                <div>
                  - {{(creditActivity.amount * 10).toFixed(1) }}
                </div>
                <div>
                  {{ creditActivity.resource_name}}
                </div>
              </td>
            </tr>
            <tr class="w-full bg-black text-white text-base uppercase leading-5 tracking-wide font-semibold">
              <th class="flex-1">
              </th>
              <th class="flex-1">
              </th>
            </tr>
            </tbody>
            <div class="text-center bg-white py-2">
              <button
                  class="pagination-button"
                  @click="previousPreviousActivityPage"
                  :disabled="currentPreviousActivityPage === 1"
              >
                <font-awesome-icon icon="arrow-circle-left" />
              </button>
              <button
                  class="pagination-button"
                  @click="nextPreviousActivityPage"
                  :disabled="currentPreviousActivityPage === totalPreviousActivityPages"
              >
                <font-awesome-icon icon="arrow-circle-right" />
              </button>
              <div>
                <small class="mute-text"
                >{{ currentPreviousActivityPage }} / {{ totalPreviousActivityPages }}</small
                >
              </div>
            </div>
          </table>
          <div v-else>Du hast noch keine Credits eingelöst</div>
        </div>
      </accordion>

      <p>
        Jedes Paket beinhaltet ein gewisses Kontingent an Credits pro Monat. Die
        Freikontingente können nicht ins nächste Monat mitgenommen werden.
      </p>
<!--      <p>-->
<!--        <strong>UNSER TIPP: </strong>Sichere dir vorab zusätzliche Credits —-->
<!--        direkt im Bereich ‚Credits kaufen‘ mit einem Klick. Diese zusätzlich-->
<!--        (gekauften) Credits bleiben auch über die Monatsgrenze hinweg erhalten.-->
<!--        Weitere Infos > <nuxt-link target="_blank" to="/de/agb">AGB</nuxt-link>.-->
<!--      </p>-->
<!--      <p>-->
<!--        Du willst dein Paket wechseln, dann schicke gern ein Mail an den-->
<!--        Frontdesk <a v-bind:href="mail">frontdesk@grandgarage.eu</a>-->
<!--      </p>-->
<!--      <div v-if="discount" style="margin-top: 50px; margin-bottom: 40px">-->
<!--        <p>-->
<!--          <strong>Ermäßigung: </strong> Dein ermäßigter Preis auf Credits ist-->
<!--          gültig bis:-->
<!--          <strong>-->
<!--            <span style="color: green"-->
<!--            >{{ formatDate(discount.untilDate) }}.</span-->
<!--            >-->
<!--          </strong>-->
<!--        </p>-->
<!--        <p style="font-size: smaller">-->
<!--          <u-->
<!--          >Läuft deine Ermäßigung bald ab? Dann verlängere sie beim Frontdesk-->
<!--            vorort!</u-->
<!--          >-->
<!--        </p>-->
<!--      </div>-->
<!--      <div><loading-spinner v-if="loading" color="#333" /></div>-->
    </div>


<!--no more credit buy option after MS24 but keep here just in case of Reopening MS25-->
<!--    <fieldset v-if="hasSmartGarage">-->
<!--      <legend style="margin-bottom: 20px">Credits kaufen</legend>-->
<!--      <div><loading-spinner v-if="!memberPackages" color="#333" /></div>-->
<!--      <div style="margin-bottom: 20px" v-if="memberPackages">-->
<!--        <credit-package v-on:reload="reload" :hasDiscount="hasDiscount" />-->
<!--      </div>-->
<!--    </fieldset>-->

<!--    <fieldset>-->
<!--      <legend>Lager</legend>-->
<!--      <div><loading-spinner v-if="loadingAvailableStorage" color="#333" /></div>-->
<!--      <div-->
<!--          v-if="-->
<!--          !loadingAvailableStorage &&-->
<!--          availableStorage &&-->
<!--          availableStorage.length > 0 &&-->
<!--          membership &&-->
<!--          membership.length > 0-->
<!--        "-->
<!--      >-->
<!--        <div v-for="userPackage of availableStorage" :key="userPackage.id">-->
<!--          <package-->
<!--              v-on:reload="reload"-->
<!--              :user-package="userPackage"-->
<!--              :storage="true"-->
<!--              :booked="false"-->
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
      memberPackages: null,
      membership: null,
      currentMembership: null,
      memberStorage: null,
      memberCredits: null,
      memberPreviousCredits: null,
      previousCreditActivities: [],
      loadingPreviousCreditActivities:true,
      monthlyCreditActivities: null,
      loadingCreditActivities: true,
      packageCreditActivities: [],
      activitiesUsed: [],
      creditId: null,
      monthlyCreditId :null,
      monthlyRemainingCredit:null,
      monthlyCredits:null,
      oneTimeCreditIds :[],
      oneTimeCredits: null,
      oneTimeCreditsOriginal:null,
      buyCredits: null,
      discount: null,
      hasDiscount: false,
      // only SmartGarage members have credit feature
      hasSmartGarage: false,
      loading: false,
      availableStorage: null,
      loadingAvailableStorage: false,
      currentMonthlyActivityPage: 1,
      currentPackageActivityPage: 1,
      currentPreviousActivityPage: 1,
      rowsPerPage: 5,
      convertedTime: null,
    };
  },
  async mounted() {

    await this.reload();
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('de-at');
    },
    convertTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      return this.convertedTime = `${hours} Stunde(n), ${minutes} Minute(n) und ${remainingSeconds} Sekunde(n)`;
    },
    previousMonthlyActivityPage() {
      if (this.currentMonthlyActivityPage > 1) {
        this.currentMonthlyActivityPage--;
      }
    },
    nextMonthlyActivityPage() {
      if (this.currentMonthlyActivityPage < this.totalMonthlyActivityPages) {
        this.currentMonthlyActivityPage++;
      }
    },
    previousPackageActivityPage() {
      if (this.currentPackageActivityPage > 1) {
        this.currentPackageActivityPage--;
      }
    },
    nextPackageActivityPage() {
      if (this.currentPackageActivityPage < this.totalPackageActivityPages) {
        this.currentPackageActivityPage++;
      }
    },
    previousPreviousActivityPage() {
      if (this.currentPreviousActivityPage > 1) {
        this.currentPreviousActivityPage--;
      }
    },
    nextPreviousActivityPage() {
      if (this.currentPreviousActivityPage < this.totalPreviousActivityPages) {
        this.currentPreviousActivityPage++;
      }
    },
    async reload() {
      this.loading = true;
      this.loadingAvailableStorage = true;

      this.memberPackages = await this.$store.dispatch(
          'getMemberPackages',
          this.$store.state.member.id,
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
      // (show only identified membership in that case)
      // https://grandgarage.atlassian.net/browse/CON-443
      //let identifiedMembership = null;
      this.membership.forEach((p) => {
        if (p?._embedded?.package?.metadata?.is_membership_identifier) {
          console.log('p: ', p)
          if (this.isActiveMembership(p.fromDate,  p.untilDate)) {
            this.membership = []; // fix this
            this.membership.push(p);
            this.currentMembership = p;
          }
          // identifiedMembership = p;
        }
      });

      // if (identifiedMembership) {
      //   this.membership = [];
      //   this.membership.push(identifiedMembership);
      // }
      // this.membership.forEach((p) => {
      //   console.log('package: ',p)
      //   if (this.isActiveMembership(p.fromDate,  p.untilDate)) {
      //     this.currentMembership = p;
      //   }
      // })
      this.getMonthlyCredits();

      await this.loadCreditStatus();
      await this.loadCreditActivities();
      await this.loadPreviousCreditStatus();
      await this.loadPreviousCreditActivities();

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
        //handle packages with no notes available for storage & visibility or malformed format
        if (!p.metadata) {
          console.error('no notes (storage, visible) for package: ', p);
          return false;
        }
        this.loading = false;
        this.loadingAvailableStorage = false;
        return p.metadata.is_storage_box && p.metadata.shop_visible;
      });
    },
    async loadCreditStatus() {
      this.memberCredits = await this.$store.dispatch(
          'getMemberCredits',
          this.$store.state.member.id,
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
      }, 300000);
    },
    async loadPreviousCreditStatus() {
      this.memberPreviousCredits = await this.$store.dispatch(
          'getMemberPreviousCredits',
          this.$store.state.member.id,
      );
      this.memberPreviousCredits = this.memberPreviousCredits.filter(credit => {
        return credit.scope === 'usage';
      })
      // update credits status every 30 seconds
      setInterval(() => {
        this.$store
            .dispatch("getMemberPreviousCredits", this.$store.state.member.id)
            .then((response) => {
              this.memberPreviousCredits = response;
              this.memberPreviousCredits = this.memberPreviousCredits.filter(credit => {
                return credit.scope === 'usage';
              })
            })
            .catch((err) => {
              console.error(err);
            });
      }, 300000);
    },
    async loadCreditActivities() {
      this.loadingCreditActivities = true;
      if (this.memberCredits && this.memberCredits.length > 0 &&this.memberPackages) {
        this.getMonthlyRemainingCredit()
        this.getOneTimeCredits()
        // Lade monatliche Kreditaktivitäten für das erste Element
        try {
          if (this.monthlyCreditId) {
            this.monthlyCreditActivities = await this.$store.dispatch('getCreditActivities', {
              id: this.$store.state.member.id,
              creditId: this.monthlyCreditId
            });
            this.activitiesUsed.push(...this.monthlyCreditActivities)

          }




          // Aktualisiere regelmäßig die monatlichen Kreditaktivitäten
          setInterval(async () => {
            try {
              if (this.monthlyCreditId) {
                this.monthlyCreditActivities = await this.$store.dispatch('getCreditActivities', {
                  id: this.$store.state.member.id,
                  creditId: this.monthlyCreditId
                });
              }
            } catch (err) {
              console.error(err);
            }
          }, 300000);
        } catch (err) {
          console.error("Error loading monthly credit activities:", err);
        }
      }



      // Überprüfe, ob one-time Credits vorhanden sind
      for (let i = 0; i < this.oneTimeCreditIds.length; i++) {
        let creditId = this.oneTimeCreditIds[i];
        try {
          let activities = await this.$store.dispatch('getCreditActivities', {
            id: this.$store.state.member.id,
            creditId: creditId
          });
          this.packageCreditActivities.push(...activities);
          this.activitiesUsed.push(...activities)
        } catch (err) {
          console.error("Error loading package credit activities for creditId:", creditId, err);
        }
      }
      // if (this.memberCredits && this.memberCredits.length > 1) {
      //   for (let i = 1; i < this.memberCredits.length; i++) {
      //     let credit = this.memberCredits[i];
      //
      //     try {
      //       let activities =  await this.$store.dispatch('getCreditActivities', {
      //         id: this.$store.state.member.id,
      //         creditId: credit.id
      //       });
      //       this.packageCreditActivities.push(...activities);
      //       this.activitiesUsed.push(...activities)
      //     } catch (err) {
      //       console.error("Error loading package credit activities for creditId:", credit.id, err);
      //     }
      //   }
      // }
      this.loadingCreditActivities = false;
    },
    async loadPreviousCreditActivities() {
      this.loadingPreviousCreditActivities = true;
      if (this.memberPreviousCredits && this.memberPreviousCredits.length > 0) {
        for (let i = 0; i < this.memberPreviousCredits.length; i++) {
          let credit = this.memberPreviousCredits[i];

          try {
            let activities =  await this.$store.dispatch('getCreditActivities', {
              id: this.$store.state.member.id,
              creditId: credit.id
            });
            this.previousCreditActivities.push(...activities);
            this.activitiesUsed.push(...activities);
          } catch (err) {
            console.error("Error loading package credit activities for creditId:", credit.id, err);
          }
        }
      }
      this.loadingPreviousCreditActivities = false;
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
    getMonthlyRemainingCredit() {
      let creditSum = 0;
        this.memberCredits.forEach((credit) => {
          if (credit?.scope === 'usage' && credit?.untilDate) {
            // unhandled precondition: there may only be one monthly credit
            this.monthlyCreditId = credit.id
            creditSum += parseFloat(credit.remainingAmount);
          }
        });
        this.monthlyRemainingCredit = Number(parseFloat(creditSum) * 10).toFixed(1);
      //return "0.0"; // Rückgabe eines Standardwerts, falls keine Daten vorhanden sind
    },

    getOneTimeCredits() {
      let creditSum = 0;
      let creditSumOriginal = 0;
      this.oneTimeCreditIds = []
      this.memberCredits.forEach((credit) => {
        if (credit?.scope === 'usage' && !credit?.untilDate) {
          if (credit.remainingAmount > 0){
            this.oneTimeCreditIds.push(credit.id)
            creditSum += parseFloat(credit.remainingAmount);
            creditSumOriginal +=parseFloat(credit.amount);
          }
        }
      });
      this.oneTimeCreditsOriginal = Number(parseFloat(creditSumOriginal) * 10).toFixed(1);
      this.oneTimeCredits = Number(parseFloat(creditSum) * 10).toFixed(1);
      //return Number(parseFloat(creditSum) * 10).toFixed(1);
    },
    getPackageCredits() {
      // TODO fix

      if (this.memberCredits && this.memberCredits.length > 1) {
        let totalAmount = 0;
        for (let i = 1; i < this.memberCredits.length; i++) {
          if (this.memberCredits[i].amount) {
            totalAmount += parseFloat(this.memberCredits[i].amount);
          }
        }
        return (totalAmount * 10).toFixed(1);
      }
      return "0.0";
    },
    getMonthlyCredits() {
      // check all memberPackages for possible monthly credits
      let monthlyCredits = 0;
      this.memberPackages.forEach((p) => {
        if (p?.credits.length > 0) {
          p.credits.forEach((credit) => {
            if (credit?.period === 'month') {
              monthlyCredits += parseFloat(credit.amount);
            }
          });
        }
      });
      this.monthlyCredits = monthlyCredits * 10;
      //return monthlyCredits * 10;
    },
    checkValue($value) {
      if (parseFloat($value) > this.deposit) {
        this.redeemDeposit = this.deposit;
      }
      if (this.decimalCount($value) > 2) {
        this.redeemDeposit = Number(Math.floor($value * 100) / 100).toFixed(2);
      }
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
    getDiscountForDate($date){
      //retrieves the membership discount for an older date


    }
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
    displayedMonthlyActivities() {
      const startIndex = (this.currentMonthlyActivityPage - 1) * this.rowsPerPage;
      const endIndex = startIndex + this.rowsPerPage;
      return this.monthlyCreditActivities.slice(startIndex, endIndex);
    },
    totalMonthlyActivityPages() {
      return Math.ceil(this.monthlyCreditActivities.length / this.rowsPerPage);
    },
    displayedPackageActivities() {
      const startIndex = (this.currentPackageActivityPage - 1) * this.rowsPerPage;
      const endIndex = startIndex + this.rowsPerPage;
      return this.packageCreditActivities.slice(startIndex, endIndex);
    },
    totalPackageActivityPages() {
      return Math.ceil(this.packageCreditActivities.length / this.rowsPerPage);
    },
    displayedPreviousActivities() {
      const startIndex = (this.currentPreviousActivityPage - 1) * this.rowsPerPage;
      const endIndex = startIndex + this.rowsPerPage;
      return this.activitiesUsed.slice(startIndex, endIndex);
    },
    totalPreviousActivityPages() {
      return Math.ceil(this.activitiesUsed.length / this.rowsPerPage);
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
button:disabled svg {
  color: grey;
}
.pagination-button {
  color: black;
}
.pagination-button:hover {
  color: $color-orange;
}
</style>
