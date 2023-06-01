<template>
  <div
    v-if="training"
    class="training-item"
  >
    <div class="body">
      <div class="content">
        {{ training.title }}
      </div>
    </div>
    <div class="footer">
      {{ date }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['userTraining'],
  computed: {
    training () {
      return this.$store.getters.getTrainingById(this.userTraining.trainingCourse)
    },
    date () {
      return new Date(this.userTraining.date).toLocaleDateString('de-at')
    }
  }
}
</script>

<style lang="scss">

.training-item {
  margin-bottom: 5px;
  background-color: #FFF;
  margin-right: 1em;
  margin-bottom: 1em;
  .body {
    padding: 10px 0;
    display: flex;
    .content {
      flex: 1;
    }
  }
  .footer {
    font-size: 0.8em;
    padding: 5px 0;
    color: #333;
  }
}
</style>
