<template>
  <div v-editable="blok" class="link-slideshow">
    <div v-swiper:swiper="swiperOption">
      <div class="swiper-wrapper">
        <div :key="i.id" v-for="(i, c) in link_background" class="swiper-slide">
          <!--<a :href="window+'/'+s.link.cached_url" target="_blank">{{s.link}}</a>-->
          <a
            class="link-slideshow-link"
            :href="window + '/' + blok.items[c].link.cached_url"
            target="_blank"
          >
            <div
              class="link-slideshow-item"
              :style="{ 'background-image': 'url(' + i + ')' }"
            >
              <img
                src="~/assets/img/icons/arrow-right-solid.svg"
                class="decorator"
              />
            </div>
            <div class="link-name">
              <span class="link-name">{{ slug[c] }}</span>
            </div>
          </a>
        </div>
      </div>
      <div class="swiper-button-next" />
      <div class="swiper-button-prev" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
  data() {
    return {
      uuid: null,
      slug: [],
      link_item: [],
      type: null,
    };
  },
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
        if (window.innerWidth < 786) {
          return 0;
        }
      }
      return 30;
    },
    num() {
      if (process.client && window && window.innerWidth) {
        if (window.innerWidth < 786) {
          return 1;
        }
      }
      return 3;
    },
    window() {
      return window.location.origin;
    },
    link_background() {
      return this.link_item;
    },
  },
  created() {
    this.story();
  },
  methods: {
    story() {
      let string;
      let url;
      let item;
      //console.log(this.blok.items)
      for (let i = 0; i < this.blok.items.length; i++) {
        //console.log(this.blok.items[i].link.cached_url)
        // this.slug = this.blok.items[0].link.cached_url.split('/')[0];
        string = this.blok.items[i].link.cached_url.substring(
          this.blok.items[i].link.cached_url.indexOf("/") + 1
        );
        if (this.blok.items[i].link.cached_url.indexOf("machines") !== -1) {
          this.type = "machines";
          //console.log(this.type)
        }
        if (this.blok.items[i].link.cached_url.indexOf("workshops") !== -1) {
          this.type = "workshops";
          //console.log(this.type)
        }
        if (
          this.blok.items[i].link.cached_url.indexOf("workshopdates") !== -1
        ) {
          this.type = "workshopdates";
          //console.log(this.type)
        }
        this.slug.push(string.substring(string.indexOf("/") + 1).toUpperCase());
        //console.log(this.slug)
        this.uuid = this.blok.items[0].link.id;
        if (this.type === "machines") {
          this.$store
            .dispatch(
              "loadMachineItem",
              string.substring(string.indexOf("/") + 1)
            )
            .then((data) => {
              // console.log(data.story)
              string = data.story.content.image;
              url = string.substring(string.indexOf("/") + 1);
              item = url.substring(url.indexOf(".") + 1);
              this.link_item.push("//img2." + item);
              //console.log(this.link_item)
            })
            .catch((err) => {
              console.error(err);
            });
        }
        if (this.type === "workshops") {
          //console.log(string.substring(string.indexOf('/') + 1))
          this.$store
            .dispatch(
              "loadWorkshopItem",
              string.substring(string.indexOf("/") + 1)
            )
            .then((data) => {
              // console.log(data.workshop)
              // console.log('workshop')
              string = data.workshop.content.image;
              url = string.substring(string.indexOf("/") + 1);
              item = url.substring(url.indexOf(".") + 1);
              this.link_item.push("//img2." + item);
              // console.log(this.link_item)
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }
      /* console.log(this.blok.items[0].link.cached_url);
                // this.slug = this.blok.items[0].link.cached_url.split('/')[0];
                string = this.blok.items[0].link.cached_url.substring(this.blok.items[0].link.cached_url.indexOf('/') + 1);
                this.slug = string.substring(string.indexOf('/') + 1);
                console.log(this.slug);
                this.uuid = this.blok.items[0].link.id;
                this.$store.dispatch('loadMachineItem', this.slug).then((data)=> {
                    console.log(data.story);
                    string = data.story.content.image;
                    url = string.substring(string.indexOf('/') + 1);
                    item = url.substring(url.indexOf('.') + 1);
                    this.link_item = "//img2."+item;
                    console.log(this.link_item);
                }).catch((err) => {
                    console.log(err);
                }) */
    },
  },
};
</script>

<style lang="scss">
.link-slideshow {
  color: $color-blue;
  margin: 40px;

  .swiper-container {
    height: 50vh;

    .swiper-slide {
      display: block;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }

    padding-bottom: 60px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: $color-yellow;
    background-size: 12px;
  }

  .swiper-button-next.link {
    background-color: $color-bright-bg;
    height: 25px;
    left: 10px;
    top: 30px;
    width: 25px;
  }
}

.link-slideshow-item {
  height: 100%;
  width: 100%;
  background-size: cover;
}

.link-name {
  margin-top: 20px;
}

.link-icon {
  height: 10%;
  width: 10%;
}

.link-slideshow-link {
  width: 100%;

  .decorator {
    margin-bottom: -7px;
    margin-left: 10px;
    margin-top: 10px;
    width: 20px;
  }
}
</style>
