<template>
  <div v-editable="blok" class="download-item">
    <a class="filelink" :href="blok.file">
      <div class="title">{{ blok.name }}</div>
      <div class="subtitle">
        {{ filename }}
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ["blok"],
  computed: {
    filename() {
      const tokens = this.blok.file.split("/");
      return tokens[tokens.length - 1];
    },
    extension() {
      const tokens = this.blok.file.split(".");
      return tokens[tokens.length - 1];
    },
  },
  created() {},
};
</script>

<style lang="scss">
.download-item {
  margin-bottom: 1rem;
  .filelink {
    color: inherit;
  }
  .title {
    font-size: 1rem;
    text-transform: uppercase;
    color: $color-orange;
    font-weight: bold;
    margin-bottom: 0.2rem;
  }
  .subtitle {
    font-size: 0.75rem;
  }
}
</style>
