<template>
  <div class="flex justify-center items-center">
    <div class="spinner-ring"></div>
  </div>
</template>

<script>
//TODO - make spinner color customizable by using props
export default {};
</script>

<style lang="scss" scoped>
/** @see https://loading.io/css/ */
.spinner-ring {
  display: inline-block;
  width: 14px;
  height: 14px;
}

.spinner-ring:after {
  margin: 0;
  padding: 0;
  content: ' ';
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid white;
  border-color: white transparent white transparent;
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
