<template>
  <div v-editable="blok" class="about-info">
    <div v-if="blok.headline" class="headline">
      {{ blok.headline }}
    </div>
    <div class="col">
      <div class="col-start">
        <div class="list">
          <markdown :value="blok.list" />
        </div>
      </div>
      <div class="col-end">
        <div class="content">
          <markdown :value="blok.content" />
          <a v-if="blok.contentLink" :href="blok.contentLink" target="_blank">
            {{ blok.contentLinkName }}
          </a>
        </div>
        <div class="image-wrapper">
          <img class="image" :src="$resizeImage(blok.image, '950x0')" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
};
</script>

<style lang="scss">
.about-info {
  @include media-breakpoint-down(md) {
    display: flex;
    padding-top: 5vh;
    flex-direction: column;
  }
  @include media-breakpoint-up(lg) {
    margin: 0;
  }
  position: relative;
  margin: 0 0 0 12%;
  .headline {
    display: flex;
    color: $color-blue;
    font-weight: bold;
    @include media-breakpoint-up(lg) {
      padding: 10% 4% 0%;
      font-size: 2.3em;
      width: 45%;
    }
    @include media-breakpoint-down(md) {
      padding: 0 3.4vw 2vh;
      font-size: 1.6em;
      margin-right: 5%;
    }
    line-height: 1.2;
    letter-spacing: 0.03em;
    font-variant-ligatures: no-common-ligatures;
  }
  .col {
    @include media-breakpoint-up(lg) {
      display: flex;
      align-items: center;
      position: relative;
    }
    .col-start {
      flex: 1;
      z-index: 2;

      .list {
        background: #fff;
        padding: 5%;
        margin: 20% 3% 0 30%;
        color: $color-blue;
        font-size: 1.1em;
        @include media-breakpoint-down(md) {
          font-size: 1.1em;
          margin: 0 0 0 5%;
          padding: 2%;
          width: 100%;
        }
        letter-spacing: 0.02em;
        font-variant-ligatures: no-common-ligatures;
        line-height: 1.2;
        width: 70%;

        ul {
          li {
            margin-bottom: 1.3em;
            margin-left: 7%;
          }
        }
      }
    }

    .col-end {
      z-index: 1;
      flex: 1;

      .content {
        position: relative;
        z-index: 1;
        padding: 0 18% 0 0;
        margin-top: 7vh;
        @include media-breakpoint-up(lg) {
          margin: 0 0 15% 15%;
        }
        font-size: 1.1em;
        @include media-breakpoint-down(md) {
          font-size: 1em;
          margin-bottom: 5%;
          padding: 0 9% 0 0;
        }
        letter-spacing: 0.03em;
        line-height: 1.6;
      }
    }

    .image-wrapper {
      @include media-breakpoint-up(lg) {
        .image {
          position: relative;
          display: block;
          width: 120%;
          margin-left: -20%;
        }
      }
      @include media-breakpoint-down(md) {
        text-align: right;
        .image {
          max-height: 50vh;
          max-width: 100%;
          align-self: flex-end;
          margin-bottom: -2px;
        }
      }
    }
  }
}
</style>
