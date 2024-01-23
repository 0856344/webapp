<template>
  <div class="image-slideshow-blue">
    <div class="subtext"></div>
    <div v-swiper:swiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="s in imageGallery"
          :key="s._uid"
          class="swiper-slide"
          :style="{
            backgroundImage: 'url(' + $resizeImage(s.image, '300x300') + ')',
          }"
        >
          <div class="text-image-slider">
            {{ s.text }}
          </div>
        </div>
      </div>
      <div class="swiper-button-next" />
      <div class="swiper-button-prev" />
    </div>
  </div>
</template>
<script>
export default {
  props: ["story"],
  computed: {
    imageGallery() {
      return this.story;
    },
    image() {
      return "assets/img/icons/download-icon.svg";
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
      return this.story.length < 4;
    },
  },
  methods: {
    myPath: function (to) {
      window.open(to);
    },
  },
};
</script>

<style lang="scss" scoped>
.image-slideshow-blue {
  position: relative; // needed for z-index (blue dashed stripe)
  padding: 30px;
  background-color: black;
  color: #fff;
  .text {
    padding: 3rem 5rem 0 5rem;
    font-size: 1.8rem;
    @include media-breakpoint-down(md) {
      font-size: 1.2rem;
      //padding: 2vh 4vw;
    }
    font-family: $font-secondary;
    line-height: 1.4;
    letter-spacing: 1.4px;
    font-weight: bold;

    p {
      margin: 0;
    }
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
    height: 24em;
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
      height: 13em;
      padding: 0;
      width: 100%;
      margin: 0 auto;
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
      margin: 0;
    }
    @include media-breakpoint-down(xs) {
      width: 35px;
      height: 35px;
      background-size: 8px;
      margin: 0;
    }
  }
}
.text-image-slider {
  margin-top: 200px;
  display: flex;
  justify-content: center;
  font-size: 1.3rem;
  @include media-breakpoint-up(lg) {
    margin-top: 400px;
  }
}
</style>
