<template>
  <div
        v-if="value"
        v-html="renderedMarkdown"
    />
</template>

<script>
import { marked } from 'marked'

export default {
  props: ['value'],
  computed: {
    renderedMarkdown () {
      console.log(this.value)
      return marked(this.value)
    }
  }
}
</script>

<style lang="scss">
</style>
