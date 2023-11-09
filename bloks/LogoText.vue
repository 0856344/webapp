<template>
  <div v-editable="blok" class="logo-text">
    <div class="logo">
      <img :src="blok.image.filename" alt="" />
    </div>
    <div class="text-center">
      {{ blok.text }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
};
</script>

<style lang="scss">
.logo-text {
  width: 100%;
  height: 15vh;
  display: flex;
  justify-content: space-around;
  background: white;
  margin: auto;
  padding: 10px;
  border-bottom: solid 3px #e7e8df;
  .logo {
    display: flex;
    align-items: center;
    width: 20%;
    img {
      object-fit: contain;
      height: 10vh;
    }
  }
  .text-center {
    display: flex;
    align-self: center;
    width: 60%;
  }
  @include media-breakpoint-down(md) {
    flex-flow: column;
    height: inherit;
    padding: 20px;
    .logo {
      display: flex;
      justify-content: center;
      width: 100%;
      padding-bottom: 20px;
    }
    .text-center {
      width: 100%;
    }
  }
}
</style>
