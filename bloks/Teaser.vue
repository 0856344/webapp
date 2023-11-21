<template>
  <div v-editable="blok" class="teaser-item">
    <div class="header">
      <h2 class="headline">
        {{ blok.headline }}
      </h2>
      <div class="subline">
        <code class="hr">{{ blok.subline }}</code>
        <sb-link v-if="blok.link" :link="blok.link">
          {{ $t("allCourses") }}
        </sb-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
};
</script>

<style lang="scss">
.teaser-item {
  .header {
    @include media-breakpoint-down(lg) {
      @include margin-page-wide;
    }
    .headline {
      font-size: 3rem;
      @include media-breakpoint-down(sm) {
        font-size: 2em;
      }
      text-transform: uppercase;
      flex: 1;
    }
    .subline {
      color: $color-orange;
      display: flex;
      .hr {
        flex: 1;
      }
      .link {
        font-size: 1.3rem;
        font-family: $font-secondary;
        text-decoration: none;
        color: #000;
      }
    }
  }
}
</style>
