<template>
  <div :class="active ? 'level-item active' : 'level-item'">
    <!-- .level-indicator content must be loaded from storyblok language -->
    <h3 class="level-indicator">
      {{ $t('level') }}
    </h3>
    <h1 class="number">
      {{ number }}
    </h1>
    <div class="text">
      <h2 class="title">
        {{ blok.title }}
      </h2>

    </div>
    <div
      v-if="blok.areas"
      class="areas"
    >
      <h3
        v-for="(area, index) in blok.areas.split(',')"
        :key="index"
        class="area"
      >
        {{ area }}
        <br>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok', 'number', 'active']
}
</script>

<style lang="scss">

.level-item {
  display: flex;
  user-select: none;
  cursor: default;
  padding-right: 10px;
  margin-right: 10px;
  transition: all 100ms;
  min-height: 150px;

  .number {
    text-align: right;
    width: 80px;
    font-size: 80px;
    margin: 0;
    margin-top: auto;
  }

  .level-indicator {
    padding-bottom: 5px;
    padding-left: 5px;
    font-size: 14px;
    border-bottom: 1px solid #000;
    margin: 0;
    margin-top: auto;
    margin-right: 20px;
  }

  .areas {
    margin-top: 25px;

    .area {
      font-size: 12px;
      margin: 0 0 4px 10px;
    }
  }

  .text {
    margin-left: 15px;

    .title {
      font-size: 18px;
      margin-top: 5px;
      margin-bottom: 0;
    }

    .arrow {
      width: 180px;
    }
  }
  &.active {
    box-shadow: 10px 0 0 $color-blue;
    &:hover {
      box-shadow: 10px 0 0 $color-blue;
    }
  }
  &:hover {
    box-shadow: 10px 0 0 $color-yellow;
    cursor: pointer;
  }
}

@media (max-width: 460px) {
  .level-item {
    .text {
      display: none;
    }
  }
}
</style>
