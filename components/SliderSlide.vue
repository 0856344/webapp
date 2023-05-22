<template>
    <div class="snap-center shrink-0 flex justify-center" v-bind:id="id">
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
