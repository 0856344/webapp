<template>
    <div v-editable="blok" class="spacer">
        <div :style="'margin:' + this.blok.space + 'px 0;'">
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  props: ['blok']
}
</script>
