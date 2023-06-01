<template>
    <div v-editable="blok" class="member-page" @touchstart="touch">
        <a ref="hidden" href="#" display="none"/>
        <div class="header">
            <div class="image" @mouseover="imgHover = true" @mouseleave="imgHover = false">
                <img
                        v-if="!showAltImg"
                        class="picture"
                        :src="$resizeImage(blok.image, '700x700')"
                        :alt="blok.name + ', ' + blok.title"
                >
                <img
                        v-else
                        class="picture"
                        :src="$resizeImage(blok.image_alt, '700x700')"
                        :alt="blok.name + ', ' + blok.title"
                >
            </div>
            <div class="info">
                <div class="short-info">
                    <div class="name-contact">
                        <div class="name">{{ blok.name }}</div>
                    </div>
                    <div class="title-contact-options">
                        <div class="title">{{ blok.title }}</div>
                        <div class="contact-options">
                            <a v-if="blok.email" class="option-email" :href="'mailto:'+blok.email">
                                <img class="icon" src="@/assets/img/icons/envelope.svg" alt="">
                                <div class="text">{{ blok.email }}</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="future-slogan">
                <div class="first">
                    {{ $t('theFuture') }}
                </div>
                <div class="second">
                    {{ $t('belongs') }}{{ blok.future }}<span v-if="!blok.future"> {{ $t('toUsAll') }}</span>
                </div>
            </div>
            <div class="description">
                <markdown :value="blok.description"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['blok'],
  data () {
    return {
      imgHover: false
    }
  },
  computed: {
    showAltImg () {
      return !!this.imgHover
    }
  },
  methods: {
    touch (e) {
      if (e.target.localName !== 'img') {
        this.$refs.hidden.focus()
      }
    }
  }
}
</script>

<style lang="scss">
ol {
  list-style: auto;
  margin: 10px 0 10px 40px;

  li {
    margin: 10px 0 10px 0;
  }
}

.member-page {
  @include margin-page-wide();
  min-height: 150px;

  .header {
    display: flex;

    .image {
      position: relative;
      flex-grow: 1;
      width: 46%;
      margin-right: 2%;
      margin-top: 6em;
      text-align: right;

      .image-first {
        z-index: 98;
      }

      .picture {
        width: 100%;
        max-width: 70%;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      width: 50%;
      margin-left: 2%;
      margin-top: 2rem;

      .short-info {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: flex-start;

        .name-contact {
          padding-bottom: 1rem;
          border-bottom: .4rem solid black;
          margin-top: 1rem;
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
          justify-content: space-between;

          .name {
            font-family: $font-secondary;
            font-size: 2.5rem;
            text-transform: uppercase;
            line-height: 1.2;
          }
        }

        .title-contact-options {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .contact-options {
            font-size: .9rem;
            margin-bottom: .8rem;
            display: flex;
            flex-direction: column;

            .option-email {
              display: flex;
              flex-direction: row-reverse;
              align-items: center;
              color: inherit;
              text-decoration: none;

              .icon {
                width: 18px;
                margin-left: .5em;
              }

              .text {
              }
            }
          }
        }

        .title {
          font-family: $font-mono;
          font-size: 1rem;
          margin-bottom: 2em;
          margin-right: 3em;
        }
      }
    }
  }

  .body {
    padding: 100px 0;

    .future-slogan {
      transform: rotate(-5deg);
      font-size: 2rem;
      @include media-breakpoint-down(sm) {
        font-size: 1.4rem;
      }
      width: 40%;
      min-width: 15em;
      margin-left: 12%;
      margin-bottom: 9%;

      .first {
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: .2em;
      }

      .second {
        font-family: $font-secondary;
      }
    }

    .description {
      margin: 0 20% 0 30%;
    }
  }

  @include media-breakpoint-down(md) {
    .header {
      .info {
        .short-info {
          .name-contact {
            flex-direction: column-reverse;

            .name {
              align-self: flex-start;
              font-size: 2.5em;
            }
          }

          .title-contact-options {
            flex-direction: column;

            .title {
              margin-bottom: 1em;
            }

            .contact-options {
              flex-direction: initial;
            }
          }
        }
      }
    }
  }

  @include media-breakpoint-down(sm) {
    .header {
      flex-direction: column;

      .info {
        width: 100%;
        margin: 0;

        .short-info {
          .name-contact {
            .name {
            }
          }
        }
      }

      .image {
        width: 400px;
        max-width: 100%;
        display: flex;
        justify-content: center;
        align-self: center;
        margin-bottom: 2em;
      }
    }
    .body {
      padding: 50px 0;

      .future-slogan {
        margin-left: 2%;
        margin-bottom: 20%;
      }

      .description {
        margin: 0;
      }
    }

    @include media-breakpoint-down(xs) {
      .header {
        .info {
          .short-info {
            .name-contact {
              .name {
                font-size: 2em;
              }
            }
          }
        }
      }
      .image {
        align-items: flex-start !important;

        .picture {
          max-width: 60% !important;
          height: auto !important;
        }
      }
    }
  }
}
</style>
