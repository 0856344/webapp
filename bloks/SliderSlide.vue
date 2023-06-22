<template>
    <div class="snap-center shrink-0 flex justify-center lg:contents" v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    id () {
      return this.$vnode.key || 'noid'
    }
  }
}
</script>
