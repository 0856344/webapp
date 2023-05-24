<template>
    <div>
        <div class="flex justify-center items-center">
            <div class="spinner-ring"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'BigLoadingSpinner'
}
</script>

<style scoped lang="scss">
/** @see https://loading.io/css/ */
.spinner-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.spinner-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid $color-primary;
  border-color: $color-primary transparent $color-primary transparent;
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
