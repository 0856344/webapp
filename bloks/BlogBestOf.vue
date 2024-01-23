<template>
  <div class="blog-best-of">
    <div class="bg-black mt-10% p-8 mt-20 text-white relative z-20">
      <div class="flex flex-row justify-between items-center mb-8 ps-4 md:ps-8">
        <h1 class="text-4xl sm:text-5xl font-mono leading-snug tracking-wide text-white">{{ $t("blog") }}</h1>
        <nuxt-link class="link-to flex items-center" :to="localePath('/de/news')">
          <div class="arrow"></div>
          {{ $t("toBlog") }}
        </nuxt-link>
      </div>
      <div class="flex flex-wrap justify-around p-0 md:p-8">
        <BlogItem
            :blog="news"
            v-for="news of newsToDisplay"
            :key="news.id"
            class="item md:w-1/2"
        />
      </div>
    </div>
  </div>
</template>


<script>
import BlogItem from "./BlogItem.vue";
export default {
  components: {
    BlogItem,
  },
  data: () => ({
    news: null,
  }),
  async mounted() {
    const filters = {
      filter_query: {
        component: {
          in: "news-overview",
        },
      },
    };
    this.news = await this.$store.dispatch("findNews", filters).then((data) => {
      return data;
    });
  },
  computed: {
    newsToDisplay() {
      if (!this.news) return;
      return this.news.stories.slice(0, 2);
    },
  },
};
</script>

<style lang="scss" scoped>
.arrow {
  @apply inline-block relative w-16 border-t border-white mt-1 mx-4 transition-transform ease-out;
}
.arrow:after {
  content: '';
  @apply block absolute border-t border-r w-2 h-2 transform rotate-45;
  right: -0.1em;
  top: -0.25em;
}
.link-to:hover .arrow {
  @apply translate-x-2;
}
</style>
