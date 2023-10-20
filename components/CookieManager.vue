<template>
  <transition name="fade">
    <div
      class="cookie-manager"
      v-if="this.$route.path != '/de/datenschutzerklaerung'"
    >
      <div class="boxContainer">
        <div class="box">
          <div class="title">
            {{ $t("manageCookies") }}
          </div>
          <div class="text">
            {{ $t("cookiesDescription")
            }}<NuxtLink to="/de/datenschutzerklaerung">{{
              $t("dataPrivacyPolicy")
            }}</NuxtLink
            >{{ $t("dataPrivacyRead") }}.<br /><br /><br />
            <div class="select-buttons">
              <label>
                <input type="checkbox" name="" v-model="necessaryCookie" />
                <div class="icon-box"></div>
                <div class="cookie-name">{{ $t("necessaryCookies") }}</div>
              </label>
              <label>
                <input type="checkbox" name="" v-model="analyticsCookie" />
                <div class="icon-box"></div>
                <div class="cookie-name">{{ $t("analyticsCookies") }}</div>
              </label>
            </div>
            <br /><br />
            <div>
              {{ $t("adjustCookiePreferences") }}
            </div>
            <br />
            <div class="confirm-buttons">
              <Button class="input-button-primary" @click="selectAll">
                {{ $t("selectAll") }}</Button
              >
              <Button
                :disabled="!necessaryCookie"
                class="input-button-primary"
                @click="setCookiePreferences"
              >
                {{ $t("save") }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CookieManager",
  data: () => ({
    necessaryCookie: true,
    analyticsCookie: true,
  }),
  methods: {
    enableTracking() {
      this.$ga.enable();
      this.$ga.event("category", "action", "label", 123);
    },
    selectAll() {
      this.necessaryCookie = true;
      this.analyticsCookie = true;
    },
    setCookiePreferences() {
      this.$store.commit("setNecessaryCookie", this.necessaryCookie);
      this.$store.commit("setAnalyticsCookie", this.analyticsCookie);
      localStorage.setItem("hasAcceptedNecessaryCookie", this.necessaryCookie);
      localStorage.setItem("hasAcceptedAnalyticsCookie", this.analyticsCookie);
      if (this.analyticsCookie) {
        this.enableTracking();
      }
      this.close();
    },
    close() {
      this.$emit("close");
      localStorage.setItem("hasSeenPopup", "true");
    },
  },
};
</script>

<style lang="scss" scoped>
.select-buttons {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  margin-left: 20%;
}
.select-buttons label {
  padding: 10px;
  cursor: pointer;
  display: flex;
  width: 23vw;
}

.select-buttons label input[type="checkbox"] {
  display: none;
}

.select-buttons label .icon-box {
  position: relative;
  display: flex;
  width: 60px;
  height: 35px;
  padding: 3px;
  flex-direction: column;
  align-items: center;
  background-color: #353746;
  color: #fff;
  border-radius: 3px;
  font-size: 21px;
  transition: 0.5s;
  user-select: none;
  margin-right: 10%;
}
.cookie-name {
  display: flex;
  align-items: center;
}
.select-buttons label input[type="checkbox"]:checked ~ .icon-box {
  background: $color-secondary;
  background-image: url(assets/img/icons/check.svg);
  background-size: 20px;
  background-position: center;
  color: #fff;
  background-repeat: no-repeat;
}

.select-buttons label .icon-box span {
  margin: 5px;
  font-size: 18px;
}

.select-buttons .btn {
  width: 130px;
  height: 40px;
  position: absolute;
  left: 550px;
  font-size: 16px;
  border: 0;
  outline: none;
  transition: 0.5s cubic-bezier(0.755, 0.05, 0.855, 0.06);
}

.cookie-manager {
  background: repeating-linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.3) 70px,
    rgba(0, 0, 0, 0.8) 70px,
    rgba(0, 0, 0, 0.8) 140px
  );
  z-index: 1001;
  width: 100vw !important;
  height: 100vh !important;
  display: flex;
  position: absolute;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-family: "Roboto Mono", monospace;
  .checkbox {
    height: 3vh;
  }
  & .boxContainer {
    & .box {
      display: flex;
      flex-direction: column;
      background-color: #191919;
      position: relative;
      z-index: 1000000000;
      color: white;
      min-height: 12.5em;
      padding: 4em 5em;
      margin: 2em;
      width: 40vw;
      border: 2px solid #ccccccb0;
      border-radius: 25px;
      & .title {
        font-size: 1.9em;
        font-weight: bolder;
        text-transform: uppercase;
        align-self: center;
      }
      & .text {
        margin-top: 1.5em;
        line-height: 1.3em;
        @include media-breakpoint-down(sm) {
          margin-right: 0;
        }
      }
      @media (max-width: 1500px) {
        width: 60vw;
        height: 89vh;
      }
      @include media-breakpoint-down(lg) {
        margin: auto;
        width: auto;
        padding: 2em 2em;
        height: auto;
        margin-top: 5vw;
        margin-left: 8%;
        margin-right: 8%;
        .title {
          font-size: 1.5em;
        }
        .select-buttons {
          margin-left: 18%;
          margin-top: 5%;
        }
        .select-buttons label {
          width: 100%;
        }
      }
      @include media-breakpoint-down(xs) {
        margin-top: 85vw;
        height: auto;
        margin-left: 2%;
        margin-right: 2%;
        .title {
          font-size: 1.3em;
        }
        .select-buttons {
          margin: 0%;
        }
      }
    }

    .confirm-buttons {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin-top: 6%;

      .input-button-primary {
        width: 12vw;
        height: 7vh;
        border-radius: 3px;
        font-size: 1.5rem;
        @media (max-width: 1500px) {
          width: 18vw;
          margin-top: auto;
        }
        @include media-breakpoint-down(lg) {
          width: 30vw;
          height: 5vh;
        }
        @include media-breakpoint-down(xs) {
          width: 33vw;
          height: 7.9vh;
          font-size: 1.1em;
        }
      }
    }
  }
}
</style>
