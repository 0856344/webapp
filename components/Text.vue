<template>
  <div
    v-editable="blok"
    class="text-blok"
  >
    <div class="text">
      <markdown :value="blok.text" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">

.text-blok {
  display: flex;
  .text {
    flex: 1;
    display: flex;
    line-height: 1.5;
    font-size: 1.1rem;
    @include media-breakpoint-down(md) {
      margin: 3% 15% 10%;
      font-size: 0.9em;
      line-height: 1.6;
    }
  }
}
</style>
