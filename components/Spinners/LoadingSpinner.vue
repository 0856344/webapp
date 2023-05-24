<template>
  <div class="loading">
    <font-awesome-icon
      class="icon"
      :color="color"
      icon="circle-notch"
    />
  </div>
</template>

<script>
export default {
  props: {
    color: {
      required: false,
      default: 'black'
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  font-size: 1.5em;
  & .icon {
    animation: rotation 1s infinite linear;
  }
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
