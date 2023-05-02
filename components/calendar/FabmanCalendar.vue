<template>
    <div v-editable="blok" class="fabman-calendar">
        <p>UNDER CONSTRUCTION</p>
        <machine-calendar :space="this.blok.space"></machine-calendar>
    </div>
</template>

<script>
import MachineCalendar from '@/components/calendar/MachineCalendar.vue'

export default {
  components: { MachineCalendar },
  props: ['blok'],
  created () {
    console.log('My new block created')
  },
  mounted () {
    console.log('blok', this.blok)
    console.log('space', this.blok.space)
    console.log('resource', this.blok.resource)
  }
}
</script>

<style lang="scss" scoped>

</style>
