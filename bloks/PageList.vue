<template>
  <div v-editable="blok" class="page-list">
    <page-card
      v-for="i in blok.items"
      :key="i.uid"
      :blok="i"
      class="page-card"
      :class="{ small: length }"
    />
  </div>
</template>

<script>
export default {
  props: ["blok"],
  created() {},
  computed: {
    length() {
      return this.blok.items.length > 2;
    },
  },
};
</script>

<style lang="scss">
.page-list {
  display: flex;
  justify-content: center;
  padding: 30px;
  margin: 6% 0 1% 0;
  @media screen and (max-width: 799px) {
    flex-direction: column;
    align-items: center;
    margin: 1% 0%;
  }
  .page-card.small {
    width: 330px;
  }
  .page-card {
    margin: 0 2%;
    border-radius: 15px;
    height: 230px;
    display: flex;
    background: white;
    width: 370px;
    box-shadow: 10px 5px 5px #00000024;
    flex-flow: column;
    overflow: hidden;
    @include media-breakpoint-down(md) {
      height: 200px;
      width: 300px;
    }
    @include media-breakpoint-down(sm) {
      margin: 3% 0;
    }
  }
}
</style>
