<template>
  <div
      v-editable="blok"
      class="single-image"
  >
    <div class='wrapper'>
      <div class='row'>
        <div class='column'>
          <img class="image" width="100%" :src="blok.image.filename">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss" scoped>
.single-image{
  @include media-breakpoint-up(lg) {
    margin: 50px 0;
  }
}
.row {
  display: flex;
  flex-direction: row; //default
  @include media-breakpoint-down(sm) {
    flex-direction: column;
  }
  @include media-breakpoint-down(md) {
    flex-direction: column;
  }
  min-height: 100px;

  .content {
    height: 100%;
    padding: 5px;
  }

  .column1 {
    flex-basis: 50%;
  }

  .column2 {
    flex-basis: 50%;
  }
}
.image {
  margin: auto;
  display: block;
  max-width: 100%;
  max-height: 100%;
}

</style>
