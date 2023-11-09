<template>
  <!--  @deprecated: Page unused currently-->
  <div>
    <h2>Credits</h2>
    <div class="credits">
      <div class="myCredits">
        <button
          class="input-button-primary creditsButton"
          @click="$router.push('/de/gutscheine?action=redeem')"
        >
          {{ $t("redeemGiftCard") }}
        </button>
      </div>
      <div class="logs"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Credits",
  middleware: "authenticated",
  data: () => ({}),
  async mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.myCredits {
  display: flex;
  flex-flow: row nowrap;
  @include media-breakpoint-down(sm) {
    flex-direction: column;
  }
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
  background-color: black;
  color: white;
  line-height: 1.6;
  font-family: $font-mono;
  font-size: 0.9rem;
  font-weight: bold;
  display: flex;
  padding: 0.8em;
  font-size: 1em;
  & .creditsButton {
    margin: 0;
    @include media-breakpoint-down(sm) {
      margin-top: 1em;
    }
  }
}

.entry:nth-child(odd) {
  background: #fafafa;
}

.entry {
  display: flex;
  flex-flow: row nowrap;
  padding: 0.4em;
  @include media-breakpoint-down(sm) {
    flex-direction: column;
    background-color: #fafafa;
    margin: 1em 0;
    border: 1px solid grey;
    border-radius: 0.3em;
    position: relative;
    & .type {
      font-size: 1.1em;
      padding: 0.4em 0;
    }
    & .value {
      padding-bottom: 0.4em;
    }
    & .icon {
      position: absolute;
      top: 1em;
      right: 1em;
      font-size: 1.3em;
    }
  }
  & .date {
    color: grey;
    width: 10em;
  }
  & .green {
    color: green;
  }
  & .red {
    color: #c00;
  }
  & .type {
    width: 8em;
  }
  & .value {
    width: 5em;
  }
  & .info {
    display: flex;
    flex-flow: row nowrap;
    color: grey;
  }
  & .link {
    margin-right: 1em;
  }
  & .icon {
    display: flex;
    align-items: center;
    color: grey;
  }
}
.entry:hover .icon {
  color: $color-blue-alt;
}
.pointer {
  cursor: pointer;
}
.link:hover {
  cursor: pointer;
}
</style>
