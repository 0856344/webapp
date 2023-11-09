<template>
  <section class="util__container">
    <component
      :is="story.content.component"
      v-if="story && story.content && story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    />
  </section>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview";
//import Snowflakes from 'magic-snowflakes'
//const snowflakes = new Snowflakes({ color: '#fdfdfd', count: 50 })

export default {
  created() {
    // snowflakes.start()
  },
  mixins: [storyblokLivePreview],
  asyncData(context) {
    const path = "/" + context.route.params.pathMatch;
    return context.store.dispatch("loadPage", path).catch((e) => {
      context.error({
        statusCode: e.response.status,
        message: e.response.statusText,
      });
    });
  },
  data() {
    return {
      story: null,
    };
  },
};
</script>
