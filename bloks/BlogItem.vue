<template>
  <div class="blog-item-display">
    <nuxt-link :to="localePath('/de/news/'+blog.slug)" class="link">
      <section class="header">
        <img class="image" :src="blog.content.image">
        <div class="background-square"></div>
        <div class="title-head">
          <code class="title">{{ blog.content.title }}</code>
          <code class="teaser">{{ blog.content.teaser }}</code>
          <p class="date" v-if="blog.content.datetime">{{ blog.content.datetime | date }}</p>
        </div>
      </section>
    </Nuxt-link>
  </div>
</template>
<script>
export default {
  head () {
    return {
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'testTitle' }
      ]
    }
  },
  props: {
    blog: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

.link {
  color: white;
}
.header {
  @media (max-width: 1460px) {
    padding-bottom: 5vh;
  }
}
.date {
  font-family: $font-secondary;
  font-size: 1.3rem;
}
.title {
  font-size: 1.8rem;
  font-family: $font-secondary;
  line-height: 1.4;
  letter-spacing: 1.4px;
  display: flex;
  width: 20vw;
  @include media-breakpoint-down(lg) {
    width: 50vw;
  }
}
.teaser {
  font-size: 1.3rem;
  font-family: $font-secondary;
  line-height: 1.4;
  letter-spacing: 1.4px;
  display: flex;
  width: 20vw;
  @include media-breakpoint-down(lg) {
    width: 50vw;
  }
}
.image {
  width: 20vw;
  height: 15vw;
  @include media-breakpoint-down(lg) {
    width: 50vw;
    height: 40vw;
  }
  /*@media (max-width: 1460px) {
    width: 50vw;
    height: 40vw;
  }*/
}
</style>
