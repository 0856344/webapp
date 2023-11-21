<template>
  <div v-editable="blok">
    <!-- TODO -->
    <div class="fabman-calendar">
      <booking-calendar
        :space="this.blok.space"
        :resource="4049"
      ></booking-calendar>
    </div>
  </div>
</template>

<script>
import BookingCalendar from '@/components/calendar/BookingCalendar.vue';

export default {
  components: { BookingCalendar },
  props: ['blok'],
};
</script>

<style lang="scss" scoped>
.fabman-calendar {
  display: flex;
  justify-content: center;
  margin: 50px 0;
  background-color: white;

  .booking-calendar {
    width: 80%;
    @include media-breakpoint-down(sm) {
      width: 100%;
      margin-left: 4%;
      margin-right: 4%;
    }
  }
}
</style>
