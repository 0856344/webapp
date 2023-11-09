<template>
  <div v-editable="blok">
    <div v-if="blok.title" class="title">{{ blok.title }}</div>
    <div class="gg-grid">
      <component
        v-for="story in blok.columns"
        :is="story.component"
        :key="story._uid"
        :blok="story"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 2rem;
  margin-left: 120px;
  font-weight: bold;
}
.gg-grid {
  display: flex;
  @include margin-page-wide();
  @include media-breakpoint-down(md) {
    flex-direction: column;
  }
  justify-content: center;
}
</style>
