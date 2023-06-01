<template>
  <div
    v-editable="blok"
    class="feature"
  >
    <h1>{{ blok.name }}</h1>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
.feature {
  flex: 1;
  text-align: center;
}
</style>
