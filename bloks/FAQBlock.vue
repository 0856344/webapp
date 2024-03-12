<template>
  <div v-editable="blok" class="faq-block">
    <div class="faqs">
      <h3><span id="general"></span>{{ $t("general") }}</h3>
      <faq-item v-for="i in generalQuestions" :key="i.uid" :blok="i" :anchor="generateAnchor(i.question)" ref="faqItems"/>
      <br />
      <h3><span id="membership"></span>{{ $t("membership") }}</h3>
      <faq-item v-for="i in memberQuestions" :key="i.uid" :blok="i" :anchor="generateAnchor(i.question)" ref="faqItems" @c="scrollToElement($t('i.question'))"/>
      <br />
      <h3 v-if="workshopQuestions.length > 0">
        <span id="workshop_giftCard"></span>{{ $t("workshop") }}
      </h3>
      <faq-item v-for="i in workshopQuestions" :key="i.uid" :blok="i" :anchor="generateAnchor(i.question)" ref="faqItems"/>
      <br />
      <h3 v-if="giftCardQuestions.length > 0">
        <span id="workshop_giftCard"></span>{{ $t("giftCard") }}
      </h3>
      <faq-item v-for="i in giftCardQuestions" :key="i.uid" :blok="i" :anchor="generateAnchor(i.question)" ref="faqItems"/>
      <br />
      <h3 v-if="creditsQuestions.length > 0">
        <span id="credits"></span> {{ $t("credits") }}
      </h3>
      <faq-item v-for="i in creditsQuestions" :key="i.uid" :blok="i" :anchor="generateAnchor(i.question)" ref="faqItems"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
  mounted() {
      // Checks whether a hash is present in the URL
      if (window?.location?.hash) {
        const hash = window.location.hash.substring(1); // Removes the '#'
        this.scrollToElement(hash);
      }
  },
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
    generateAnchor(title) {
      return title
        .replace(/\u00e4/g, "ae") // ä
        .replace(/\u00c4/g, "ae") // Ä
        .replace(/\u00fc/g, "ue") // ü
        .replace(/\u00dc/g, "ue") // Ü
        .replace(/\u00d6/g, "ue") // Ö
        .replace(/\u00f6/g, "ue") // ö
        .replace(/\u00df/g, "ss") // ß
        .replace(/[^\w\s]/g, '') // Remove non-word characters (excluding spaces)
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .toLowerCase();
    },
    scrollToElement(anchor) {
      // Introduce a delay to ensure the DOM has fully loaded
      setTimeout(() => {
        const element = document.getElementById(anchor);

        if (element) {
          const viewportHeight = window.innerHeight;
          const elementTop = element.getBoundingClientRect().top + window.scrollY;
          const elementHeight = element.offsetHeight;
          const centerPosition = elementTop - ((viewportHeight / 2) - (elementHeight / 2));

          window.scrollTo({
            top: centerPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
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
  scroll-margin-top: 80px;
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
