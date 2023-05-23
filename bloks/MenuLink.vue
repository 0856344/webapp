<template>
  <div class="menuLink">
    <NuxtLink
      :class="{ 'nuxt-link-exact-active': isActive }"
      :to="to"
    >
      <font-awesome-icon
        v-if="icon"
        :icon="icon"
      />
      <slot />
    </NuxtLink>
  </div>
</template>
<script>
export default {
  name: 'MenuLink',
  props: {
    to: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.menuLink {
  display: flex;
  flex-flow: row nowrap;
  text-align: left;
  & :first-child {
    margin-right: 0.5em;
    & :first-child {
      width: 1.5em;
    }
  }
}
</style>
