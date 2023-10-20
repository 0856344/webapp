<template>
  <div
    v-editable="news"
    class="blogFeed-detail"
  >
    <div class="left-content">
      <h2
        v-if="news.title"
        class="headline"
      >
        {{ news.title }}
      </h2>
    </div>
    <div class="right-content">
      <div
        v-if="news.text"
        class="teaser"
      >
        {{ news.text }}
      </div>
      <!--<markdown v-if="blok.facts" :value="blok.facts" class="info-text"></markdown>
            <markdown v-if="blok.info" :value="blok.info" class="info-text"></markdown>-->
    </div>
    <div
      v-if="news.image"
      class="body"
    >
      <image-slideshow :blok="news.image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogFeedDetail',
  props: {
    // news: Array,
  },
  computed: {
    /* date() {
                return moment(this.news.datetime).locale('de-at').format('LL');
            },
            link() {
                if (this.news.link && this.news.link.url) {
                    return this.news.link.url;
                } else {
                    return '#'
                }
            } */
  }
}
</script>

<style lang="scss" scoped>

    .blogFeed-detail {
        color: #000;
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        @include margin-page-wide();
        @include media-breakpoint-up(md) {
            margin: 0 100px;
        }
        .left-content {
            .headline {
                position: relative;
                @include media-breakpoint-up(md) {
                    max-width: 50%;
                    font-size: 2.8rem;
                }
                @include media-breakpoint-down(sm) {
                    margin: 3vh 5%;
                }
                line-height: 1.5;
                font-family: $font-secondary;
            }
        }
        .right-content {
            flex-direction: column;
            position: relative;
            display: flex;
            align-items: flex-start;
            @include media-breakpoint-up(md) {
                margin-left: 25%;
            }
            .workshop-dates {
                width: 100%;
                @include media-breakpoint-down(sm) {
                    margin: 3vh 5%;
                    width: 90%;
                }
            }
            .teaser, .info-text {
                font-weight: normal;
                font-family: $font-primary;
                line-height: 1.8;
                font-size: 1.1rem;
                @include media-breakpoint-down(sm) {
                    line-height: 1.4;
                    font-size: 1rem;
                    margin: 0 0 0 5%
                }
            }
            .teaser {
                font-weight: bold;
            }
            .link {
                background-color: $color-orange;
                margin: 2% 0 0 5%;
                text-transform: uppercase;
                @include media-breakpoint-up(md) {
                    margin-left: 25%;
                }
                color: #fff;
                padding: .7em .8em;
                font-weight: 800;
            }
        }
    }
</style>
