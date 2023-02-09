<template>
  <div class="section">
    <div style="margin-top: 2em;"><img width="80px" src="~/assets/img/icons/fireworks.svg" class="decorator"></div>
    <h2 style="margin: 0;">{{ $t('congrats') }}</h2>
    <p class="text" style="margin-bottom: 0">
      {{ $t('youMadeTheFirstStepsTowardsBecomingA-GG-Member') }}<br><br>{{ $t('toCompleteOnboardingStartSafetyTraining') }}
    </p>
  </div>
</template>
<script>
export default {
  //middleware: 'authenticated',
  mounted () {
    window.scrollTo(0, 0)
    //this.$store.dispatch('getMemberCourses')
  }
}
</script>
<style lang="scss" scoped>
.section {
  text-align: center;
  margin-top: 1em;
  margin-bottom: 0;
}
</style>
