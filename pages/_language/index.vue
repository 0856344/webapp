<template>
  <section class="">
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

export default {
  mixins: [storyblokLivePreview],
  asyncData(context) {
    return context.store.dispatch("loadPage", "/").catch((e) => {
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
