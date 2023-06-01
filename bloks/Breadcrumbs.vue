<template>
  <div class="breadcrumbs">
    <div class="content">
      <div class="item">
        {{ $t('grandGarage') }}
      </div>
      <div
        v-for="(item, index) in pathItems"
        :key="index"
        class="item"
      >
        {{ item }}
      </div>
      <div class="item last">
        {{ lastItem }}
      </div>
    </div>
  </div>
</template>

<script charset="utf-8">
export default {
  computed: {
    items () {
      const path = this.$store.state.route.fullPath.split('?')[0]
      const items = path
        .replace('-', ' ')
        .split('/')
        .slice(2)
      if (path.endsWith('/')) {
        items.pop()
      }
      return items
    },
    pathItems () {
      const items = this.items.slice(0)
      items.pop()
      return items
    },
    lastItem () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.items.pop()
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang="scss">

.breadcrumbs {
  z-index: 900;
  top: 0;
  position: fixed;
  background-color: $color-bright-bg;
  height: 100vh;
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media(max-width: $mobile-small) {
    // width: 30px;
    display: none;
  }

  .content {
    white-space: nowrap;
    transform: rotate(-90deg);

    .item {
      font-size: 12px;
      text-transform: uppercase;
      font-weight: bold;
      display: inline-block;
      margin-right: 20px;

      &.last {
        color: $color-blue;
      }

      a {
        text-decoration: none;
        color: #000;

        &:hover {
          color: $color-blue;
        }
      }
    }
  }
}
</style>
