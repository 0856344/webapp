<template>
  <div v-editable="blok" class="corporate-content">
    <div class="header">
      <div class="headline">
        {{ blok.headline }}
      </div>
      <div class="subline">
        {{ blok.subline }}
      </div>
    </div>
    <div class="texter">
      <div class="text">
        <markdown :value="blok.text" />
      </div>
      <div class="img">
        <img :src="blok.image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
  methods: {},
};
</script>

<style lang="scss">
.corporate-content {
  display: flex;
  flex-direction: column;
  margin-left: 4%;
  margin-right: 4%;
  .header {
    padding: 10vh 0;
    .headline {
      font-weight: bold;
      font-size: 10vh;
    }
    .subline {
      color: $color-red;
      font-size: 5vh;
    }
  }
  .texter {
    display: flex;
    flex-direction: row;
    .text {
      font-family: $font-secondary;
      flex: 3;
    }
    .img {
      padding-left: 100px;
      flex: 2;
      img {
        width: 60%;
        height: auto;
      }
    }
  }
}
</style>
