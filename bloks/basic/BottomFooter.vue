<template>
  <footer class="footer">
    <div class="pre-footer">
      <div class="pre-footer-top">
        <div class="logo">
          <img src="~/assets/img/icons/gg-logo.svg" alt />
        </div>
      </div>
      <div class="pre-footer-bottom">
        <div class="col text">
          {{ $t("innovationFactory") }}
        </div>
        <div class="col logos">
          <marquee :duration="Number(marqueeDuration)">
            <div v-for="logo in logos" :key="logo._uid" class="logo">
              <img :src="$resizeImage(logo.image, `${logoWidth}x0`)" />
            </div>
          </marquee>
        </div>
      </div>
    </div>
    <div class="background-footer">
      <div class="background-footer-content">
        <div class="newsletter-footer">
          <div>
            <div id="mc_embed_signup">
              <form
                id="mc-embedded-subscribe-form"
                action="https://grandgarage.us20.list-manage.com/subscribe/post?u=ab921bf052a64b20bb1f16123&amp;id=8006406cc5"
                method="post"
                name="mc-embedded-subscribe-form"
                class="validate"
                target="_blank"
                novalidate
              >
                <h4>{{ $t("stayInTouch") }}</h4>
                <div class="newsletter-subscribe">
                  <input
                    id="mce-EMAIL"
                    type="email"
                    value=""
                    name="EMAIL"
                    class="required email"
                    :placeholder="[[$t('yourE-mailAddress')]]"
                  />
                  <div
                    style="position: absolute; left: -5000px"
                    aria-hidden="true"
                  >
                    <input
                      type="text"
                      name="b_ab921bf052a64b20bb1f16123_8006406cc5"
                      tabindex="-1"
                      value=""
                    />
                  </div>
                  <button type="submit">
                    {{ $t("signUp") }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="bottom-footer">
          <div class="footer-navigation">
            <div
              v-for="(navitem, index) in $store.state.settings.footer_navi"
              :key="index"
              class="nav-item"
            >
              <sb-link :link="navitem.link">
                {{ navitem.name }}
              </sb-link>
            </div>
          </div>
          <div class="spacer" />
          <div
            v-for="item in $store.state.settings.footer_info"
            :key="item.id"
            class="info-item"
          >
            <div class="social-icons">
              <a
                href="https://www.instagram.com/grandgarage_eu/"
                class="social-icon"
                target="_blank"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="instagram"
                  class="svg-inline--fa fa-instagram fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                  />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/grandgaragelinz/"
                class="social-icon"
                target="_blank"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="facebook"
                  class="svg-inline--fa fa-facebook fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M448 56.7v398.5c0 13.7-11.1 24.7-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9 33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7C11.1 480 0 468.9 0 455.3V56.7C0 43.1 11.1 32 24.7 32h398.5c13.7 0 24.8 11.1 24.8 24.7z"
                  />
                </svg>
              </a>
            </div>
            <h4>{{ item.headline }}</h4>
            <markdown :value="item.content" />
          </div>
        </div>
      </div>
      <div class="background-footer-image" />
    </div>
  </footer>
</template>

<script charset="utf-8">
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      subscribed: false,
      form: {
        email: "",
      },
      logoWidth: 200,
    };
  },
  computed: {
    logos() {
      return this.$store.state.settings.footer_logos
      // Removed shuffle
      //return this.shuffle(this.$store.state.settings.footer_logos);
    },
    marqueeDuration() {
      // velocity is 100px/s
      return (this.logos.length * this.logoWidth) / 100;
    },
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    shuffle(arra1) {
      if (!arra1) return [];
      let ctr = null;
      if (arra1.length != null) {
        ctr = arra1.length;
      }
      let temp;
      let index;

      while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
      }
      return arra1;
    },
    handleSubmit() {
      if (this.form.email === "") return;
      this.loading = true;
      const axiosConfig = {
        header: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      axios
        .post(
          "/",
          this.encode({
            "form-name": "newsletter",
            ...this.form,
          }),
          axiosConfig
        )
        .then(() => {
          this.loading = false;
          this.subscribed = true;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.footer {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  .pre-footer {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='270px' height='900px'><path fill='white' d='M 101.424,0.5699981 0,48.061998 V 1000 H 270 V 46.754998 L 101.424,0.5699981'></path></svg>");
    background-size: cover;
    background-position: top right;
    background-repeat: no-repeat;
    padding-top: 10vh;
    .icon-bg {
      overflow: hidden;
      z-index: 0;
      fill: #fff;
      position: absolute;
      width: 80%;
      right: 0;
    }
    .pre-footer-top {
      z-index: 1;
      display: flex;
      justify-content: center;
      @include media-breakpoint-up(md) {
        padding: 7vh 0 6vh;
        .logo {
          width: 25%;
          min-width: 300px;
        }
      }
      @include media-breakpoint-down(sm) {
        padding: 5vh 0 2vh;
        .logo {
          width: 50%;
        }
      }
      img {
        max-width: 100%;
        display: block;
      }
    }
    .pre-footer-bottom {
      display: flex;
      @include media-breakpoint-down(sm) {
        flex-direction: column;
      }
      z-index: 1;
      margin-bottom: 10px;

      .col {
        flex: 1;
        margin-top: 3vh;
        margin-bottom: 3vh;
        @include media-breakpoint-up(md) {
          width: 50%;
        }
        &.text {
          text-transform: uppercase;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          @include media-breakpoint-up(md) {
            max-width: 21em;
            padding: 0 10px 0 40px;
            text-align: left;
          }
          @include media-breakpoint-down(sm) {
            margin-bottom: 3em;
          }
          line-height: 1.2em;
        }
        &.logos {
          height: 40px;
          display: flex;
          position: relative;
          overflow: hidden;
          &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            height: 40px;
            z-index: 1;
            @include media-breakpoint-down(sm) {
              width: 100vw;
              background: linear-gradient(
                to right,
                rgba(255, 255, 255, 1),
                rgba(255, 255, 255, 0),
                rgba(255, 255, 255, 0),
                rgba(255, 255, 255, 1)
              );
            }
            @include media-breakpoint-up(md) {
              width: 50%;
              background: linear-gradient(
                to right,
                rgba(255, 255, 255, 1),
                rgba(255, 255, 255, 0)
              );
            }
            pointer-events: none;
          }
          .marquee-text-content {
            height: 100%;
            &:hover > .marquee-text-text {
              animation-play-state: paused;
            }
            .marquee-text-text {
              height: 40px;
              display: inline-flex;
              float: none;
            }
          }
          .logo {
            margin-right: 50px;
            display: flex;
            img {
              display: block;
              max-width: 100%;
              max-height: 40px;
              width: auto;
              height: auto;
              object-fit: contain;
            }
          }
        }
      }
    }
  }
  .background-footer {
    padding: 50px 20px 20px 20px;
    color: #fff;
    overflow: hidden;
    background-color: #000;
    position: relative;
    .background-footer-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      opacity: 0.3;
      background-image: url(~assets/img/footer-bg.jpg);
      background-size: cover;
      background-position: center;
      height: 100%;
      z-index: 0;
    }
    .background-footer-content {
      padding: 20px;
      @include media-breakpoint-down(xs) {
        padding: 0;
      }
      position: relative;
      z-index: 1;
      .newsletter-footer {
        .hidden {
          display: none;
        }
        .newsletter-msg {
          text-align: center;
        }
        h4 {
          max-width: 30%;
          letter-spacing: 0.2rem;
          text-transform: uppercase;
          font-size: 3rem;
        }
        .newsletter-subscribe {
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          display: flex;
          margin: 2rem 0 4rem 0;
          input {
            padding: 10px 0;
            font-size: 1rem;
            font-family: $font-secondary;
            outline: none;
            background: none;
            color: #fff;
            border: none;
            flex: 1;
            &::placeholder {
              color: #fff;
            }
            .arrow {
              display: inline-block;
              position: relative;
              width: 4em;
              @include media-breakpoint-down(sm) {
                width: 55%;
              }
              border-top: 0.1em solid #000;
              margin: 0.25em 1em;
              transition: transform 0.15s ease-out;
              &:after {
                content: "";
                position: absolute;
                right: -0.1em;
                top: -0.05em;
                border-top: 0.1em solid #000;
                border-right: 0.1em solid #000;
                width: 0.5em;
                height: 0.5em;
                transform-origin: right top;
                transform: rotate(45deg);
              }
            }
            &:hover {
              .arrow {
                transform: translateX(0.5em);
              }
            }
          }
          button {
            cursor: pointer;
            font-family: $font-secondary;
            font-size: 1.3rem;
            color: #fff;
            background: none;
            border: none;
            outline: none;
          }
        }
      }
      .bottom-footer {
        margin: 3rem 0;
        display: flex;
        @include media-breakpoint-down(sm) {
          flex-direction: column;
        }
        .footer-navigation {
          .nav-item {
            font-size: 1rem;
            padding: 15px;
            padding-left: 0;
            a {
              color: #fff;
              text-decoration: none;
              text-transform: uppercase;
              font-weight: bold;
            }
          }
        }
        .spacer {
          flex: 1;
        }
        .info-item {
          .social-icons {
            fill: #fff;
            a.social-icon {
              margin: 0 0.2em;
              display: inline-block;
              width: 2em;
              &:visited {
                fill: #fff;
              }
              &:hover {
                fill: #eee;
              }
            }
          }
          h4 {
            text-transform: uppercase;
          }
          p {
            font-family: $font-secondary;
          }
        }
      }
    }
  }
}
</style>
