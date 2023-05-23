
<template>
  <div class="image-slideshow-blue">
    <div class="subtext">
    </div>
    <div v-swiper:swiper="swiperOption">
      <div class="swiper-wrapper">
          <div
              v-for="s in imageGallery"
              :key="s._uid"
              class="swiper-slide"
              :style="{ backgroundImage: 'url(' + $resizeImage(s.image, '300x300') + ')'}">
            <div class="text-image-slider">
              {{s.text}}
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
  props: ['story'],
  computed: {
    imageGallery () {
      return this.story
    },
    image () {
      return 'assets/img/icons/download-icon.svg'
    },
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
        if (window.innerWidth < 600) {
          return 0
        }
      }
      return 30
    },
    num () {
      if (process.client && window && window.innerWidth) {
        if (window.innerWidth < 600) {
          return 1.5
        }
      }
      return 3
    }
  },
  methods: {
    myPath: function (to) {
      window.open(to)
    }
  }
}
</script>

<style lang="scss" scoped>
.image-slideshow-blue{
  background: black !important;
}
.text-image-slider{
  margin-top: 200px;
  display: flex;
  justify-content: center;
  font-size: 1.3rem;
  @include media-breakpoint-up(lg) {
    margin-top: 400px;
  }
}
</style>
