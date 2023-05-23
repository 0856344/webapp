<template>
  <div
    v-editable="blok"
    class="job-list"
  >
    <job-opening
      v-for="i in blok.items"
      :key="i.uid"
      :blok="i"
    />
  </div>
</template>

<script>
export default {
  props: ['blok'],
  created () {
  }
}
</script>

<style lang="scss">

.job-list {
  margin-top: 6em;
  @include media-breakpoint-down(lg) {
    @include margin-page-wide;
  }
}
</style>
