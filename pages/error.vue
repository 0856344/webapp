<template>
  <div class="section">
    <h2>{{ $t("purchaseFailed") }}</h2>
    <p class="text">
      {{ $t("purchaseFailedOrWasAborted") }} <br />
      {{ $t("thereIsNoPurchase") }}
      {{ $t("youCanFindOurContactInformation") }}&nbsp;<nuxt-link
        to="/de/kontakt"
        >{{ $t("here") }}</nuxt-link
      >.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {},
  created() {},
  methods: {},
};
</script>

<style lang="scss">
.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5%;
  text-align: center;
}
</style>
