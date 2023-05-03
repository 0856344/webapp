<template>
    <div v-editable="blok" class="fabman-calendar">
        <!-- TODO -->
        <machine-calendar :space="this.blok.space" :resource="4049"></machine-calendar>
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
.fabman-calendar {
    display: flex;
    justify-content: center;
    margin: 50px 0;
}
</style>
