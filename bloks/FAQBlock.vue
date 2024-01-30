<template>
  <div v-editable="blok" class="faq-block">
<!--    <div class="downloads">-->
<!--      <div class="headline">-->
<!--        {{ $t("downloads") }}-->
<!--      </div>-->
<!--      <div class="download-list">-->
<!--        <download-item v-for="i in blok.downloads" :key="i.uid" :blok="i" />-->
<!--      </div>-->
<!--    </div>-->
    <div class="faqs">
      <h3><span id="general"></span>{{ $t("general") }}</h3>
      <faq-item v-for="i in generalQuestions" :key="i.uid" :blok="i" />
      <br />
      <h3><span id="membership"></span>{{ $t("membership") }}</h3>
      <faq-item v-for="i in memberQuestions" :key="i.uid" :blok="i" />
      <br />
      <h3 v-if="workshopQuestions.length > 0">
        <span id="workshop_giftCard"></span>{{ $t("workshop") }}
      </h3>
      <faq-item v-for="i in workshopQuestions" :key="i.uid" :blok="i" />
      <br />
      <h3 v-if="giftCardQuestions.length > 0">
        <span id="workshop_giftCard"></span>{{ $t("giftCard") }}
      </h3>
      <faq-item v-for="i in giftCardQuestions" :key="i.uid" :blok="i" />
      <br />
      <h3 v-if="creditsQuestions.length > 0">
        <span id="credits"></span> {{ $t("credits") }}
      </h3>
      <faq-item v-for="i in creditsQuestions" :key="i.uid" :blok="i" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
  computed: {
    memberQuestions() {
      //return this.filterFaqs('general')
      return this.filterFaqs("member");
    },
    generalQuestions() {
      return this.filterFaqs("general");
    },
    workshopQuestions() {
      return this.filterFaqs("workshop");
    },
    giftCardQuestions() {
      return this.filterFaqs("giftCard");
    },
    creditsQuestions() {
      return this.filterFaqs("credits");
    },
  },
  methods: {
    filterFaqs(category) {
      return this.blok.faqs.filter((item) => {
        return item.category === category ? item : "";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  position: relative;
  padding: 20px;
  background: white;
  margin-left: 20px;
}

h3 span {
  position: absolute;
  top: -100px;
}

.faq-block {
  display: flex;
  @include media-breakpoint-down(sm) {
    flex-direction: column-reverse;
  }
  align-items: flex-start;
  @include media-breakpoint-down(lg) {
    @include margin-page-wide;
  }

  .downloads {
    padding: 25px;
    flex: 1;

    .headline {
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 0.8em;
    }

    background-color: #fff;

    .download-list {
    }
  }

  .faqs {
    flex: 4;
    margin-bottom: 3vh;
  }
}
</style>
