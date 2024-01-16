<template>
  <div class="flex flex-wrap justify-around">
    <div class="card max-w-lg m-4 lg:mx-20">
      <nuxt-link :to="localePath('/de/news/' + blog.slug)" class="block">
        <img class="w-full h-48 object-cover" :src="blog.content.image" />
        <div class="text-white font-sans-secondary">
          <h2 class="text-2xl md:text-3xl font-semibold mb-2">{{ blog.content.title }}</h2>
          <p class="text-lg md:text-xl mt-2" >{{ blog.content.teaser }}</p>
          <p class="text-sm md:text-lg mt-2" v-if="blog.content.datetime">
            {{ blog.content.datetime | date }}
          </p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>



<script>
export default {
  head() {
    return {
      meta: [{ hid: "og:title", property: "og:title", content: "testTitle" }],
    };
  },
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
};
</script>

