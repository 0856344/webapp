<template>
  <markdown :value="blok.text" class="px-4 py-2 lg:px-8 lg:leading-normal leading-relaxed lg:text-lg text-base"/>
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
