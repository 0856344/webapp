<template>
  <div
    v-editable="blok"
    class="header"
  >
    <div
      class="header-image"
      :style="{ 'background-image': 'url(' + $resizeImage(blok.image, '1600x0') + ')' }"
    />
    <div
      v-if="blok.title"
      class="header-title"
    >
      <h1>{{ blok.title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss" scoped>

.header {
  @include media-breakpoint-down(lg) {
    @include margin-page-wide;
  }
  height: calc(50vh - 89px);
  position: relative;
  .header-image {
    height: 100%;
    background-size: cover;
    background-position: center;
  }
  .header-title {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #FFF;
    padding: 4vh;
    min-width: 50%;
    @include media-breakpoint-up(md) {
      max-width: 70%;
    }
    h1 {
      margin: 0;
      font-size: 3rem;
      font-family: $font-secondary;
      font-weight: bold;
    }
  }

  @include media-breakpoint-down(sm) {
    height: auto;
    .header-image {
      height: 33vh;
    }
    .header-title {
      position: relative;
      padding: 5%;
      h1 {
        font-size: 2rem;
      }

    }
  }
}
</style>
