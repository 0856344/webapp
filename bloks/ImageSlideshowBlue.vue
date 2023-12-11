<template>
  <div v-editable="blok" class="image-slideshow-blue">
    <markdown :value="blok.text" class="text" />
    <div v-if="blok.subtext" class="subtext">
      <markdown :value="blok.subtext" />
    </div>
    <div v-swiper:swiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="s in blok.items"
          :key="s._uid"
          class="swiper-slide"
          :style="{
            'background-image': 'url(' + $resizeImage(s.image, '300x300') + ')',
          }"
        />
      </div>
      <div v-if="!length" class="swiper-button-next" />
      <div v-if="!length" class="swiper-button-prev" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
  computed: {
    swiperOption() {
      return {
        slidesPerView: this.num,
        spaceBetween: this.spaceBetween,
        autoplay: {
          delay: 5000,
          disableOnInteraction: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      };
    },
    spaceBetween() {
      if (process.client && window && window.innerWidth) {
        if (window.innerWidth < 500) {
          return 0;
        }
      }
      return 30;
    },
    num() {
      if (process.client && window && window.innerWidth) {
        if (window.innerWidth < 500) {
          return 1;
        } else if (window.innerWidth < 900) {
          return 2;
        }
      }
      return 3;
    },
    length() {
      return this.blok.items.length < 4;
    },
  },
};
</script>

<style lang="scss" scoped>
.image-slideshow-blue {
  position: relative; // needed for z-index (blue dashed stripe)
  padding: 30px;
  background-color: $color-blue-intro;
  color: #fff;
  .text {
    padding: 1rem 0 0;
    font-size: 1.8rem;
    @include media-breakpoint-down(md) {
      font-size: 1.4rem;
      padding: 0;
      margin-bottom: 0;
    }
    font-family: $font-secondary;
    line-height: 1.4;
    letter-spacing: 1.4px;
    font-weight: bold;
    margin-bottom: -1rem;
  }
  .subtext {
    padding: 1rem 1rem 0 5rem;
    font-size: 1.2rem;
    @include media-breakpoint-down(md) {
      font-size: 1rem;
      padding: 2vh 4vw;
    }
    font-family: $font-primary;
    line-height: 1.4;
    letter-spacing: 1.4px;
    p {
      margin: 0;
    }
  }
  .swiper-container {
    margin-top: 3%;
    width: 100%;
    height: 22em;
    padding-bottom: 60px;
    .swiper-slide {
      display: block;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      @include media-breakpoint-down(xs) {
        margin: 0 auto;
        display: block;
      }
    }
    @include media-breakpoint-down(sm) {
      height: 10em;
      padding-bottom: 0;
    }
    @include media-breakpoint-down(md) {
      height: 18em;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: $color-yellow;
    background-size: 12px;
    top: 50%;
    @include media-breakpoint-down(md) {
      width: 40px;
      height: 40px;
      background-size: 10px;
      margin-left: -0px;
      margin-right: -0px;
    }
    @include media-breakpoint-down(xs) {
      width: 35px;
      height: 35px;
      background-size: 8px;
      margin-left: 0;
      margin-right: 0;
    }
  }
}
</style>
