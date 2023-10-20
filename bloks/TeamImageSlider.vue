<template>
  <div class="team-image-slider">
    <div class="text">
      {{ footer.text }}
    </div>
    <div v-swiper:swiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="s in footer.items"
          :key="s._uid"
          class="swiper-slide"
          :style="{
            'background-image': 'url(' + $resizeImage(s.image, '700x0') + ')',
          }"
        />
      </div>
      <div class="swiper-button-next" />
      <div class="swiper-button-prev" />
    </div>
    <markdown :value="footer.reference" class="reference" />
  </div>
</template>

<script>
export default {
  props: ["blok"],
  computed: {
    footer() {
      return this.blok;
    },
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
        if (window.innerWidth < 786) {
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
  },
};
</script>

<style lang="scss" scoped>
.swiper-wrapper.center {
  @include media-breakpoint-up(sm) {
    justify-content: center;
  }
}

.team-image-slider {
  color: $color-blue;
  position: relative; // needed for z-index (blue dashed stripe)
  .text {
    @include margin-page-wide;
    padding: 5rem 0 0;
    @include media-breakpoint-down(sm) {
      padding: 5rem 0 1rem;
    }
    font-size: 1.8rem;
    font-family: $font-secondary;
    line-height: 1.4;
    letter-spacing: 1.4px;
    margin-bottom: 30px;
  }
  .swiper-container {
    height: 40vh;
    width: 100%;
    @include media-breakpoint-down(sm) {
      height: 30vh;
    }
    .swiper-slide {
      display: block;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      width: 100%;
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
    }
    @include media-breakpoint-down(xs) {
      width: 35px;
      height: 35px;
      background-size: 8px;
      margin-right: 20px;
      margin-left: 20px;
    }
  }
  .reference {
    @include margin-page-wide;
    font-family: $font-mono;
    font-size: 1.4rem;
    @include media-breakpoint-down(sm) {
      font-size: 1.2rem;
    }
    color: black;
    margin-top: 30px;
  }
}
</style>
