<template>
  <div v-editable="blok" class="job-teaser">
    <h2 class="teaser">
      {{ blok.teaser }}
    </h2>
    <sb-link class="link" :link="blok.link">
      {{ blok.button_text }}
    </sb-link>
  </div>
</template>

<script>
export default {
  props: ["blok"],
};
</script>

<style lang="scss">
.job-teaser {
  display: flex;
  align-items: center;
  flex-direction: column;
  .teaser {
    display: block;
    font-family: $font-primary;
    text-transform: uppercase;
    font-weight: bold;
    margin: 40px 0;
    max-width: 270px;
    transform: rotate(-3deg);
  }
  .link {
    margin: 40px 0;
    font-family: $font-secondary;
    text-decoration: none;
    color: $color-blue-alt;
  }
}
</style>
