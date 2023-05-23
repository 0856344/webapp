<template>
  <div
    v-editable="blok"
    class="image-slideshow"
  >
    <div
      v-if="blok.text"
      class="text"
    >
      {{ blok.text }}
    </div>
    <div v-swiper:swiper="swiperOption">
      <div
        class="swiper-wrapper"
        :class="{ center : length }"
      >
        <div
          v-for="s in blok.items"
          :key="s._uid"
          class="swiper-slide"
          :style="{ 'background-image': 'url(' + $resizeImage(s.image, '500x500') + ')' }"
        />
      </div>
      <div
        v-if="!length"
        class="swiper-button-next"
      />
      <div
        v-if="!length"
        class="swiper-button-prev"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    swiperOption () {
      return {
        slidesPerView: this.num,
        spaceBetween: this.spaceBetween,
        autoplay: {
          delay: 5000,
          disableOnInteraction: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    },
    spaceBetween () {
      if (process.client && window && window.innerWidth) {
        if (window.innerWidth < 500) {
          return 0
        }
      }
      return 30
    },
    num () {
      if (process.client && window && window.innerWidth) {
        if (window.innerWidth < 500) {
          return 1
        } else if (window.innerWidth < 900) {
          return 2
        }
      }
      return 3
    },
    length () {
      return this.blok.items.length < 4
    }
  }
}
</script>

<style lang="scss">
.swiper-wrapper {
   align-items: center;
}

.image-slideshow {
  color: $color-blue;
  margin-top: 5rem;
  @include media-breakpoint-down(md){
    margin-top: 2rem;
  }
  .text {
    @include margin-page-middle();
    font-size: 1.8rem;
    font-family: $font-secondary;
    line-height: 1.4;
    letter-spacing: 1.4px;
    @include media-breakpoint-up(xs){
      padding: 2rem 0;
    }
  }
  .swiper-container {
    height: 25em;
    .swiper-slide {
      display: block;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      @include media-breakpoint-down(xs){
        height: 180px !important;
        margin-left: auto;
        margin-right: auto;
        display: block;
        width: 100% !important;
      }
    }
    @include media-breakpoint-down(md){
      height: 15em;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: $color-yellow;
    background-size: 12px;
  }
}
</style>
