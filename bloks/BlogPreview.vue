<template>
  <div v-if="story">
    <div class="preview-wrapper">
      <div class="workshop-preview">
        <nuxt-link class="story" :to="story.full_slug">
          <div class="banner" :style="{ 'background-image': 'url(' + $resizeImage(news.image, '700x0') + ')' }"></div>
          <div class="title">{{news.title}}</div>
          <div v-if="news.text" class="subtitle">{{news.text}}</div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogPreview'
}
</script>

<style scoped>

</style>
