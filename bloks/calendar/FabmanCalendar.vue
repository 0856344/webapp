<template>
    <div v-editable="blok">
        <!-- TODO -->
        <div class="fabman-calendar">
            <machine-calendar :space="this.blok.space" :resource="4049"></machine-calendar>
        </div>
    </div>
</template>

<script>
import MachineCalendar from '@/bloks/calendar/MachineCalendar.vue'

export default {
  components: { MachineCalendar },
  props: ['blok']
}
</script>

<style lang="scss" scoped>
.fabman-calendar {
  display: flex;
  justify-content: center;
  margin: 50px 0;
  background-color: white;
}
</style>
