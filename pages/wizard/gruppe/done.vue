<template>
  <div class="section">
    <h2>{{ $t("howDidYouLearnAboutUs") }}</h2>
    <section class="questionnaireAnswer">
      <div class="answerOption" @click="onboardingData.referrer = 'online'">
        <input type="radio" value="online" v-model="onboardingData.referrer" />
        <span> {{ $t("onlineSearch") }} </span>
      </div>
      <br />
      <div
        class="answerOption"
        @click="onboardingData.referrer = 'social-media'"
      >
        <input
          type="radio"
          value="social-media"
          v-model="onboardingData.referrer"
        />
        <span> {{ $t("socialMedia") }} </span>
      </div>
      <br />
      <div class="answerOption" @click="onboardingData.referrer = 'website'">
        <input type="radio" value="website" v-model="onboardingData.referrer" />
        <span> {{ $t("website") }} </span>
      </div>
      <br />
      <div class="answerOption" @click="onboardingData.referrer = 'print'">
        <input type="radio" value="print" v-model="onboardingData.referrer" />
        <span> {{ $t("printMedia") }} </span>
      </div>
      <br />
      <div class="answerOption" @click="onboardingData.referrer = 'friends'">
        <input type="radio" value="friends" v-model="onboardingData.referrer" />
        <span> {{ $t("friends") }} </span>
      </div>
      <br />
      <div class="answerOption" @click="onboardingData.referrer = 'partner'">
        <input type="radio" value="partner" v-model="onboardingData.referrer" />
        <span> {{ $t("partners") }}</span>
      </div>
      <br />
    </section>
  </div>
</template>
<script>
export default {
  props: {
    onboardingData: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.answerOption {
  padding: 15px;
  background: white;
  border-radius: 10px;
  border: 0.8px solid black;
  &:hover {
    background-color: #000000d1 !important;
    color: white !important;
  }
}
.hidden {
  display: none;
}
</style>
