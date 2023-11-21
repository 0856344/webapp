<template>
  <div class="section">
    <div style="margin: 2em 0">
      <img
        width="80px"
        src="~/assets/img/icons/thumbs-up.svg"
        class="decorator"
      />
    </div>
    <h2 style="margin: 0">{{ $t("purchaseCompleted") }}</h2>
    <p class="text">
      {{ $t("receiptAndConfirmationViaMail") }}
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
