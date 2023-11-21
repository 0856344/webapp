<template>
  <section class="util__container">
    <component v-if="story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component"></component>
  </section>
</template>
<script>
export default {
  data() {
    return { story: { content: {} } };
  },
  asyncData(context) {
    return context.store.dispatch("loadPage", "/");
  },
};
</script>
