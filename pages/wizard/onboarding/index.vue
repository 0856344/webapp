<template>
  <div class="section onboarding-wizard">
    <h2>{{ $t('welcomeToTheGG') }}</h2>
    <p class="text">
      {{ $t('memberBenefitsText') }}
      <br>
      {{ $t('niceToSeeYouHere') }}
      <br><br>
      {{ $t('memberPerksText') }}
      <br><br>
      {{ $t('ifYouHaveAnyQuestionsRegardingYourMembership') }}
      <br>
      {{ $t('doNotHesitateToAskOurFrontdeskTeam') }}
      <br><br>
      {{ $t('#makersgonnamake') }}
    </p>
    <div class="our-rates">
      <h3>{{ $t('ourRates') }}</h3>
      <ul>
        <li>{{ $t('regular/month') }}</li>
        <li>{{ $t('discounted/month') }} <br> </li>

        <li>{{ $t('specialConditions') }}</li>
      </ul>
      * {{ $t('differentCardListing') }}<br>{{ $t('pleaseBringAccordingID') }}
    </div>
    <div class="membership-information">
      {{ $t('additionalInformationPayment') }}
    </div>
<!--    <div> {{ $t('inOrderToWorkSafely') }}</div>-->
<!--    <br>-->
<!--    <br>-->
<!--    <div>-->
<!--      <input id="checkbox" type="checkbox" name="checkbox" v-model="onboardingData.rulesAccepted">-->
<!--      <label for="checkbox">{{ $t('iHaveReadThe') }} <a-->
<!--          href="https://a.storyblok.com/f/47294/x/ab97a83e24/gg_hausordnung.pdf"-->
<!--          target="new">{{ $t('factoryRules') }}</a> {{ $t('andAcceptTheTermsAndConditions') }}</label>-->
<!--    </div>-->
  </div>
</template>

<script>
// const TYPES = {
//   regular: 1,
//   reduced: 2
// }
export default {
  //middleware: 'authenticated',
  props: {
    onboardingData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      /*      TYPES, */
      loading: false
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  created () {
  },
  methods: {},
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss" scoped>

.onboarding-wizard {
  line-height: 1.7;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .our-rates {
    margin-top:5%;
    margin-bottom: 5%;
    margin-left: auto;
    margin-right: auto;
    @include media-breakpoint-up(md) {
      max-width: 60%;
    }
  }
  .membership-information{
    display:flex;
    max-width: 1000px;
    text-align:center;
    margin-bottom: 5%;
  }
  .name {
    font-weight: bolder;
    margin-bottom: 1em;
  }

  .text {
    text-align: center;
  }

  .selected {
    border: 2px solid $color-orange !important;
  }

  .spacer {
    flex: 1;
  }
}

</style>
