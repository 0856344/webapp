<template>
  <div v-editable="blok" class="min-h-max" v-bind:class="[ blok.no_margin_on_desktop ? '' : 'lg:my-12' ]">
    <img class="image" width="100%" :src="blok.image.filename">
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>
