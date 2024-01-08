<template>
  <div v-editable="blok" class="press-overview">
    <div class="headline">
      <div class="title">
        {{ blok.Title }}
      </div>
    </div>
    <br />
    <div class="press-text">
      <div class="teaser">
        <markdown :value="blok.Teaser" />
      </div>
      <br />
      <div class="text">
        <markdown :value="blok.Text" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
};
</script>
<style lang="scss" scoped>
.press-overview {
  margin-top: 1%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  .headline {
    background: white;
  }
  .title {
    font-size: 3rem;
    padding: 20px;
    font-family: Chakra Petch;
  }
  .teaser {
    line-height: 1.8;
    font-weight: bold;
  }
  .text {
    line-height: 1.8;
  }
  @include media-breakpoint-down(md) {
    .title {
      font-size: 3rem;
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      @include media-breakpoint-down(xs) {
        font-size: 2rem;
      }
    }
    .press-text {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
