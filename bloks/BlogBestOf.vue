<template>
  <div>
    <div class="blog-best-of">
      <div class="headline">
        <h1 class="headline-title">{{ $t("blog") }}</h1>
        <nuxt-link class="blog-link" :to="localePath('/de/news')">
          <div class="arrow"></div>
          {{ $t("toBlog") }}
        </nuxt-link>
      </div>
      <div class="blogItems">
        <BlogItem
          :blog="news"
          v-for="news of newsToDisplay"
          :key="news.id"
          class="item"
        />
      </div>
    </div>
    <!--    <link rel="stylesheet" type="text/css" href="https://pretix.eu/ggTest/oceanEye/widget/v1.css">-->
    <!--    <script type="text/javascript" src="https://pretix.eu/widget/v1.de-informal.js" async></script>-->
    <!--    <noscript>-->
    <!--      <div class="pretix-widget">-->
    <!--        <div class="pretix-widget-info-message">-->
    <!--          JavaScript is disabled in your browser. To access our ticket shop without JavaScript, please <a target="_blank" rel="noopener" href="https://pretix.eu/ggTest/yfqc3/">click here</a>.-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </noscript>-->
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
.blog-best-of {
  background: black;
  margin-top: 10%;
  padding: 30px;
  color: #fff;
  z-index: 2;
  position: relative;
  .headline {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 4vw;
  }
  .headline-title {
    font-size: 3rem;
    @include media-breakpoint-down(sm) {
      font-size: 2rem;
    }
    font-family: $font-mono;
    line-height: 1.4;
    letter-spacing: 1.4px;
    color: #ffffff;
  }
  .blog-link {
    @include media-breakpoint-up(md) {
      margin-right: 12%;
    }
  }
  .blogItems {
    display: flex;
    @include media-breakpoint-down(lg) {
      flex-direction: column;
      align-items: center;
    }
    flex-direction: row;
    justify-content: space-around;
    padding: 0 5em;
  }
}
.arrow {
  display: inline-block;
  position: relative;
  width: 4em;
  @include media-breakpoint-down(sm) {
    width: 55%;
  }
  border-top: 0.1em solid #ffffff;
  margin: 0.25em 1em;
  transition: transform 0.15s ease-out;
  &:after {
    content: "";
    position: absolute;
    right: -0.1em;
    top: -0.05em;
    border-top: 0.1em solid #ffffff;
    border-right: 0.1em solid #ffffff;
    width: 0.5em;
    height: 0.5em;
    transform-origin: right top;
    transform: rotate(45deg);
  }
}
.link {
  color: white;
  display: block;
  padding-right: 7vw;
  font-size: 1.3rem;
}
.link:hover {
  .arrow {
    transform: translateX(0.5em);
  }
}
</style>
