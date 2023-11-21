<template>
  <div class="section">
    <div v-if="this.loading" style="margin-top: 30px; margin-bottom: 500px">
      <loading-spinner />
      <!--      <p>lade Mitgliedschaften...</p>-->
    </div>
    <form v-if="!this.loading" class="form">
      <div
        class="form-item"
        v-if="
          !this.onboardingData.contactInformation.company &&
          this.onboardingData.contactInformation.age >= 18
        "
        style="margin-top: 40px"
      >
        <span class="label">MITGLIEDSCHAFT<span class="red">*</span></span>
        <select class="input-select" v-model="selectedMembership">
          <option
            v-for="membership in availableMemberships"
            :value="membership"
            v-bind:key="membership.id"
          >
            {{ membership.name }}
          </option>
        </select>
      </div>
      <div
        class="form-item"
        v-if="
          !this.onboardingData.contactInformation.company &&
          this.onboardingData.contactInformation.age < 18
        "
        style="margin-top: 40px"
      >
        <span class="label">MITGLIEDSCHAFT für Jugendliche</span>
        <select class="input-select" v-model="selectedMembership">
          <option
            v-for="membership in availableMemberships"
            :value="membership"
            v-bind:key="membership.id"
            :disabled="
              membership.metadata.shortform === 'SG+MW' ||
              membership.metadata.shortform === 'SG+ALL'
            "
          >
            {{ membership.name }}
          </option>
        </select>
      </div>
      <div
        class="form-item"
        v-if="
          !this.onboardingData.contactInformation.company &&
          this.onboardingData.contactInformation.age < 18
        "
        style="margin-top: 0px"
      >
        <label></label>
        <h5 style="margin: 0px">
          HINWEIS: Das Mindestalter für eine Mitgliedschaft SMART 14+ bzw. DIGI
          14+ liegt bei 14 Jahren. Für die Nutzung von METAL 18+ und GRAND 18+
          als Mitglied musst du 18 Jahre alt sein. Weitere Infos >
          <nuxt-link target="_blank" to="/de/agb">AGB</nuxt-link>. TOO YOUNG?
          Klick dich in unsere
          <nuxt-link target="_blank" to="/de/bildungswerkstatt"
            >Bildungswerkstatt</nuxt-link
          >
          rein, da gibt's coole Formate und Workshops für dich!
        </h5>
      </div>
      <div
        v-if="this.onboardingData.contactInformation.company"
        style="margin-top: 40px"
      ></div>
      <div v-if="!this.onboardingData.contactInformation.company">
        <div class="form-item" v-if="this.selectedMembership">
          <span class="label">Paket-Preis</span>
          <p class="text">{{ getMembershipPrice() }} (inkl. MwSt)</p>
        </div>

        <div v-if="this.selectedMembership && getMembershipCredits()">
          <div class="form-item" style="margin-bottom: 4px">
            <span class="label">Credits</span>
            <p class="text">
              {{ getMembershipCredits()[0] }}
              <strong v-if="getMembershipCredits()[1] !== ''"
                ><span class="specialOffer">
                  + {{ getMembershipCredits()[1] }} [%Aktion%]</span
                ></strong
              >
            </p>
          </div>
          <div
            class="form-item"
            v-if="this.selectedMembership"
            style="margin-top: 0px; margin-bottom: 30px"
          >
            <label></label>
            <h5 style="margin: 0px">
              Jedes Paket beinhaltet ein gewisses Kontingent an Credits pro
              Monat. Die Freikontingente können nicht ins nächste Monat
              mitgenommen werden. Die zusätzlich (gekauften) Credits bleiben
              auch über die Monatsgrenze hinweg erhalten. Weitere Infos >
              <nuxt-link target="_blank" to="/de/agb">
                {{ $t("conditionsOfParticipation") }} </nuxt-link
              >).
            </h5>
          </div>
        </div>
      </div>
      <!--      Verkauf von Lagerboxen wurde temporär ausgesetzt: https://grandgarage.atlassian.net/browse/HP-212-->
      <!--      <div v-if="!this.onboardingData.contactInformation.company" style="margin-top: 40px; margin-bottom: 40px">-->
      <!--        <div class="form-item" >-->
      <!--          <label ></label>-->
      <!--          <h5 style="margin: 0">Zusätzlich kannst du deine Projekte in einer unserer Lagerboxen aufbewahren.</h5>-->
      <!--        </div>-->
      <!--      <div class="form-item" v-for="storage in this.availableStorage" :key="storage.id" style="margin: 0">-->
      <!--        <span class="label">{{storage.name}}</span>-->
      <!--        <div class="checkbox-wrapper">-->
      <!--          <input class="checkbox" type="checkbox"-->
      <!--                 :id="storage" v-model="onboardingData.payment.bookStorage" :value="storage">-->
      <!--          <p class="text">für {{storage.recurringFee}}€ monatlich buchen</p>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      </div>-->
      <!--      <div class="form-item" v-if="!this.onboardingData.contactInformation.company && this.onboardingData.payment.bookStorage.length > 0">-->
      <!--        <span class="label">LAGER: PREIS<span class="red">*</span></span>-->
      <!--        <p class="text">{{ this.storagePrice }} (inkl. MwSt)</p>-->
      <!--      </div>-->
      <!--      <div class="form-item" v-if="this.onboardingData.payment.membership || this.onboardingData.contactInformation.company">-->
      <!--        <span class="label">MITGLIEDSCHAFT: PREIS<span class="red">*</span></span>-->
      <!--        <p class="text">{{ this.price }} (inkl. MwSt)</p>-->
      <!--      </div>-->
      <div
        class="form-item"
        v-if="!this.onboardingData.contactInformation.company"
        style="margin-top: 20px"
      >
        <span class="label"
          >{{ "Beginn der Mitgliedschaft" }}<span class="red">*</span></span
        >
        <div>
          <input
            class="input-text"
            type="date"
            :min="minDate"
            :max="maxDate"
            v-model="onboardingData.payment.startDate"
            name=""
          />
          <div class="date-error">
            <!--          <span-->
            <!--              v-if="!onboardingData.contactInformation.birthdateValid"-->
            <!--              class="bad"-->
            <!--          >{{ $t('tooYoung') }} </span>-->
          </div>
        </div>
      </div>
      <div
        class="form-item"
        v-if="this.onboardingData.contactInformation.company"
      >
        <span class="label"
          >FIRMENMITGLIEDSCHAFT<span class="red">*</span></span
        >
        <p class="text">{{ companyInformation }}</p>
      </div>
      <div v-if="!this.hasAttendeesFreeCost">
        <div class="form-item">
          <span class="label">IBAN<span class="red">*</span></span>
          <div>
            <input
              class="input-text"
              style="margin-bottom: 3px"
              type="text"
              v-model="onboardingData.payment.iban"
              name=""
              @input="validateIban()"
            />
            <div class="date-error">
              <span
                v-if="
                  !this.onboardingData.payment.ibanIsValid &&
                  this.onboardingData.payment.iban
                "
                class="bad"
                >{{ "IBAN ist üngültig" }}
              </span>
            </div>
          </div>
        </div>
        <div class="form-item">
          <span class="label">Kontoinhaber:in <span class="red">*</span></span>
          <input
            class="input-text"
            type="text"
            v-model="onboardingData.payment.accountOwner"
          />
        </div>
        <div class="form-item">
          <span class="label">Kontoinhaber:in volljährig?</span>
          <div class="checkbox-wrapper">
            <input
              class="checkbox"
              type="checkbox"
              :checked="onboardingData.payment.accountOwnerLegalAge"
              v-model="onboardingData.payment.accountOwnerLegalAge"
            />
            <p class="text" style="max-width: 600px">
              Hiermit bestätige, dass der/die Kontoinhaber:in volljährig ist.
            </p>
          </div>
        </div>
        <div class="form-item">
          <span class="label">SEPA MANDAT</span>
          <div class="checkbox-wrapper">
            <input
              class="checkbox"
              type="checkbox"
              :checked="onboardingData.payment.sepaMandat"
              v-model="onboardingData.payment.sepaMandat"
            />
            <p class="text" style="max-width: 600px">
              Ich ermächtige die CAP.future GMBH, Zahlungen von meinem Konto
              mittels SEPA-Lastschrift einzuziehen. Zugleich weise ich mein
              Kreditinstitut an, die von der CAP.Future GMBH auf mein Konto
              gezogenen SEPA-Lastschriften einzulösen. Ich kann innerhalb von
              acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des
              belasteten Betrages verlangen. Es gelten dabei die mit meinem
              Kreditinstitut vereinbarten Bedingungen.
            </p>
          </div>
        </div>
      </div>
      <div class="form-item">
        <span class="label">AGB</span>
        <div class="checkbox-wrapper">
          <input
            class="checkbox"
            type="checkbox"
            :checked="onboardingData.payment.agb"
            v-model="onboardingData.payment.agb"
          />
          <p class="text" style="max-width: 600px">
            {{ $t("iHaveReadThe") }}&nbsp;<nuxt-link
              target="_blank"
              to="/de/agb"
            >
              {{ $t("conditionsOfParticipation") }} </nuxt-link
            >&nbsp;{{ $t("andAcceptTheTermsAndConditions") }}
          </p>
        </div>
      </div>
      <div class="form-item">
        <span class="label">DATENSCHUTZERKLÄRUNG</span>
        <div class="checkbox-wrapper">
          <input
            class="checkbox"
            type="checkbox"
            :checked="onboardingData.payment.privacyPolicy"
            v-model="onboardingData.payment.privacyPolicy"
          />
          <p class="text" style="max-width: 600px">
            {{ $t("iHaveReadThe") }}&nbsp;
            <nuxt-link target="_blank" to="/de/datenschutzerklaerung">{{
              $t("dataPrivacyPolicy")
            }}</nuxt-link
            >&nbsp; {{ $t("andAcceptTheTermsAndConditions") }}
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { helper } from "@/plugins/helper";

export default {
  props: {
    onboardingData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      countries: null,
      packages: [],
      availableStorage: [],
      availableMemberships: [],
      // Name wird momentan direkt von Paket verwendet (war mit jährlich/reduziert vorher nicht möglich)
      // falls sich die Anforderungen wieder ändern, kann dieser Code verwendet werden
      // membershipList: [
      //   { id: 0, name: 'SMART GARAGE', shortform: 'SG' },
      //   { id: 1, name: 'SMART GARAGE + Metallwerkstatt', shortform: 'SG+MW' },
      //   { id: 2, name: 'SMART GARAGE + Digitallabor & Textilwerkstatt', shortform: 'SG+DT' },
      //   { id: 3, name: 'SMART GARAGE + All inclusive', shortform: 'SG+ALL' }
      //     ],
      selectedMembership: null,
      // discounted: false,
      // yearly: false,
      MembershipPrice: null,
      selected: null,
      mutableOnBoarding: this.onboardingData,
      // new memberships only in the future
      minDate: new Date().toISOString().split("T")[0],
      maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0],
    };
  },
  mounted() {
    // this.$refs.firstInput.focus()
    window.scrollTo(0, 0);
    this.loading = true;
    this.$store.dispatch("getCountries").then((r) => (this.countries = r));
    //all packages available for booking
    this.$store.dispatch("getPackages").then((r) => {
      this.packages = r;
      // filter already booked storages
      this.availableStorage = this.packages.filter((p) => {
        //handle packages with no metadata available for storage & visibility or malformed format
        if (!p.metadata) {
          console.error("no metadata (storage, visible) for package: ", p);
          return false;
        }
        if (!p.metadata.is_storage_box && p.metadata.shop_visible) {
          this.availableMemberships.push(p);
        }
        return p.metadata.is_storage_box && p.metadata.shop_visible;
      });
      this.sortByKey(this.availableMemberships, "recurringFee");
      this.loading = false;
      //if membership is preselected, select it, else select first available membership package
      if (this.onboardingData.payment.membership) {
        this.selectedMembership = this.availableMemberships.find(
          (m) => m.id === this.onboardingData.payment.membership.id
        );
      } else {
        this.selectedMembership = this.availableMemberships[0];
      }
    });
  },
  beforeRouteEnter(to, from, next) {
    //console.log('PAYMENT FROM: ', from.path)
    if (from.path === "/wizard/onboarding/image") {
      next();
    } else {
      next("/wizard/onboarding/userInformation");
    }
  },
  computed: {
    storagePrice() {
      let storagePrice = 0.0;
      let selectedStorages = [];
      selectedStorages = JSON.parse(
        JSON.stringify(this.onboardingData.payment.bookStorage)
      );
      selectedStorages.forEach((storage) => {
        storagePrice += parseFloat(storage.recurringFee);
      });
      return storagePrice.toFixed(2) + "€ mntl.";
    },
    ibanIsValid() {
      return this.validate(this.mutableOnBoarding.payment.iban);
    },
    price() {
      if (this.hasAttendeesFreeCost) {
        return "Alle Kosten werden übernommen";
      } else if (this.onboardingData.contactInformation?.company) {
        return "Mitgliedschaftskosten werden übernommen";
      } else if (this.onboardingData.payment?.membership) {
        return this.onboardingData.payment.membership.recurringFee + "€";
      }
      return 0;
    },
    companyInformation() {
      //console.log('Kosten werden übernommen: ', this.onboardingData.contactInformation.company?.metadata?.attendees_free_cost)
      const information =
        "Firmenmitgliedschaft von: " +
        this.onboardingData.contactInformation.company?.lastName +
        " wird eingelöst.";
      return information;
    },
    hasAttendeesFreeCost() {
      return this.onboardingData?.contactInformation?.company?.metadata
        ?.attendees_free_cost;
    },
  },

  methods: {
    validateIban() {
      if (this.onboardingData?.payment?.iban) {
        this.onboardingData.payment.ibanIsValid = true;
        if (helper.validateIban(this.onboardingData?.payment?.iban)) {
          return true;
        }
      }
      this.onboardingData.payment.ibanIsValid = false;
      return false;
    },
    getMembershipPrice() {
      this.onboardingData.payment.membership = this.selectedMembership;
      return (
        this.onboardingData.payment.membership.recurringFee + "€ monatlich"
      );
    },

    getMembershipCredits() {
      let membership = null;
      switch (this.selectedMembership.metadata.shortform) {
        case "SG":
          membership = this.getMembershipByShortform("SG");
          break;
        case "SG+MW":
          membership = this.getMembershipByShortform("SG+MW");
          break;
        case "SG+DT":
          membership = this.getMembershipByShortform("SG+DT");
          break;
        case "SG+ALL":
          membership = this.getMembershipByShortform("SG+ALL");
          break;
      }
      if (membership) {
        const allCredits = membership.credits;
        let monthlyCredit = 0;
        allCredits.forEach((credit) => {
          if (credit?.period === "month") {
            monthlyCredit = credit.amount;
          }
        });
        let oneTimeCredits = 0;
        allCredits.forEach((credit) => {
          if (credit?.period === "once") {
            oneTimeCredits = credit.amount;
          }
        });
        const resultTextmonthlyCredits =
          monthlyCredit * 10 + " Credits monatlich";
        const resultsTexts = [resultTextmonthlyCredits, ""];
        if (oneTimeCredits !== 0) {
          resultsTexts[1] = oneTimeCredits * 10 + " Credits einmalig";
          return resultsTexts;
        }
        return resultsTexts;
      } else {
        return null;
      }
    },

    getMembershipByShortform(shortform) {
      const ms = this.availableMemberships.filter((m) => {
        //handle packages with no metadata available for storage & visibility or malformed format
        if (m.metadata.shortform === shortform) {
          return true;
        } else return false;
      })[0];
      if (ms) {
        return ms;
      } else return null;
    },
    sortByKey(array, key) {
      return array.sort(function (a, b) {
        const x = a[key];
        const y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin-left: -6em;

  @include media-breakpoint-down(md) {
    margin-left: 0em;
  }
}

.red {
  color: $color-red;
}

.form-item {
  .text {
    //margin: 0;
    margin-top: 3px;
    margin-bottom: 10px;
    //max-width: 100px;
    font-weight: lighter;
    text-transform: none;
    font-size: 1em;
    display: flex;
    align-items: flex-start;
  }

  .checkbox-wrapper {
    padding-right: 20px;
    margin-right: 0;
    padding: 3px;
    //margin-bottom: 0;
    display: flex;

    .checkbox {
      //display: flex;
      //justify-content: center;
      //align-items: center;
      //vertical-align: middle;
      //line-height: normal;
      max-width: 13px;
      max-height: 13px;
      margin-right: 5px;
      margin-top: 3px;
    }

    .text {
      display: flex;
      //justify-content: center;
      //align-items: center;
      //margin: 0;
      font-weight: lighter;
      text-transform: none;
      font-size: 0.7em;
      margin-top: 3px;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }

  input {
    outline: none;
    flex-grow: 1;
    padding: 5px 10px;

    @include media-breakpoint-down(xs) {
      margin: 1vh 0;
    }

    background: #fff;
    border: 1px solid #fff;
    width: 100%;

    &:focus {
      border-color: $color-orange;
    }
  }

  .label {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.7em;
    //display: flex;
    justify-content: end;
    //align-self: flex-end;
    margin: 6px 10px 4px 0px;
    //margin-left: 0px;
  }

  .text-content {
    align-self: flex-end;
    font-weight: lighter;
    text-transform: none;
    font-size: 0.7em;
  }

  input {
    display: flex;
    outline: none;
    flex-grow: 1;
    padding: 5px 10px;
    //@include media-breakpoint-down(xs) {
    //  margin: 1vh 0;
    //}
    background: #fff;
    border: 1px solid #fff;
    width: 100%;

    &:focus {
      border-color: $color-orange;
    }
  }

  .password-wrapper {
    position: relative;

    .password-status {
      position: absolute;
      right: 10px;
      top: 50%;
      background-color: $color-orange;
      height: 0.5em;
      width: 0.5em;
      padding: 0;
      margin-top: -0.25em;
      border-radius: 50%;
    }
  }

  .date-error {
    grid-column: 2;
  }

  .button-row {
    grid-column: 2;
    margin-bottom: 5px; // fix for some strange ios safari error

    .input-button-primary {
      align-self: flex-end;
      cursor: pointer;
      background-color: $color-orange;
      color: #fff;
      min-width: 30%;
      border: 1px solid lighten($color-orange, 10);
      padding: 7px 12px 8px;
      line-height: 1;
      outline: none;
      //&:focus {
      //  background-color: $color-orange;
      //}
    }

    .input-button-primary:disabled {
      cursor: default;
      background-color: grey;
      border: 1px solid darkgrey;
    }
  }

  .bad {
    color: $color-orange;
    font-size: 0.7em;
    font-weight: bold;
  }
}

.disclaimer {
  color: #333;

  a {
    color: $color-orange;
    padding: 0 3px;
  }
}

.error-message {
  color: red;

  .policy {
    font-size: 0.8em;
    color: #333;

    > ul {
      list-style-type: circle;
      padding: 0 0 0 1em;

      > li {
        margin: 0.4em 0 0 0;

        > ul {
          padding: 0 0 0 1em;
          list-style-type: circle;

          > li {
            margin: 0.4em 0 0 0;
          }
        }
      }
    }
  }
}

.specialOffer {
  //background-color: $color-blue;
  color: $color-orange;
}

.red {
  border-color: red !important;
}
</style>
