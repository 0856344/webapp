<template>
  <div class="flex justify-center items-center">
    <div class="spinner-ring"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
/** @see https://loading.io/css/ */
.spinner-ring {
  display: inline-block;
  width: 24px;
  height: 24px;
}

.spinner-ring:after {
  margin: 0;
  padding: 0;
  content: " ";
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid $color-black;
  border-color: $color-black transparent $color-black transparent;
  animation: spinner-ring 1.2s linear infinite;
}

@keyframes spinner-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
