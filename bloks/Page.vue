<template>
  <div class="page">
    <component
      :is="blok.component"
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
    ></component>
    <div v-if="this.$route.path === '/'" class="BlogBestOf">
      <BlogBestOf />
    </div>
  </div>
</template>

<script>
import BlogBestOf from "./BlogBestOf.vue";
import { getMetaTagsForPage } from "@/services/MetaDataService";
export default {
  components: {
    BlogBestOf,
  },
  props: ["blok"],
  head() {
    return getMetaTagsForPage(this.blok);
  },
};
</script>

<style lang="scss"></style>
