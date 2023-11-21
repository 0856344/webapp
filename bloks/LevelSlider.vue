<template>
  <div class="level-slider">
    <div class="level-container">
      <div
        v-for="(level, index) in blok.levels"
        :key="index"
        @click="setLevel(index)"
      >
        <level-item
          :key="level._uid"
          :blok="level"
          :number="blok.levels.length - 2 - index"
          :active="index === activeLevel"
        />
      </div>
    </div>

    <div class="image-container">
      <img
        v-for="(level, index) in blok.levels"
        v-show="index === activeLevel"
        :key="level._uid"
        class="image"
        :src="$resizeImage(level.image, '1800x0')"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],

  data() {
    return {
      activeLevel: 0,
      imageStyle: "",
    };
  },

  methods: {
    setLevel(val) {
      const number = this.blok.levels.length - 2 - val;
      if (number === -1) {
        return;
      }
      this.activeLevel = val;
    },
  },
};
</script>

<style lang="scss">
.level-slider {
  @include media-breakpoint-down(lg) {
    @include margin-page-wide;
  }
  border: 6px solid #000;
  overflow: hidden;

  .level-container {
    padding: 20px 0;
    border-bottom: 2px dashed #000;
  }

  .image-container {
    background-color: #fff;
    overflow: hidden;

    .image {
      max-width: 100%;
      max-height: 100%;
    }
  }
}

@media (min-width: $mobile-large) {
  .level-slider {
    max-height: 75vh;
    display: flex;
    border-right: 6px solid #000;

    .level-container {
      width: max-content;
      border-right: 2px dashed #000;
      border-bottom: none;
    }
  }
}
</style>
