<template>
  <div
    v-editable="blok"
    class="p-4 lg:p-8 text-center text-blue lg:text-3xl text-xl leading-normal"
  >
    <p>{{ blok.text }}</p>
  </div>
</template>

<script>
export default {
  props: ["blok"],
};
</script>
