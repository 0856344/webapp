<template>
  <div>
    <div>
      <div class="flex items-center mb-1">
        <h2 class="m-0 mr-1 text-2xl">{{ $t("trainings") }}</h2>
      </div>
      <div v-if="courses" class="courseContainer">
        <Course v-for="course of courses" :key="course.id" :course="course" />
      </div>
      <div v-else>Keine Kurse gefunden</div>
    </div>
  </div>
</template>

<script>
import Course from "@/bloks/Course.vue";

export default {
  components: {
    Course,
  },
  middleware: "authenticated",
  data() {
    return {};
  },
  computed: {
    memberCourses() {
      return this.$store.state.memberCourses;
    },
    courses() {
      return this.$store.state.courses;
    },
    user() {
      return this.$store.state.user;
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss">
.section {
  display: flex;
  flex-direction: column;
}

.courseContainer {
  display: flex;
  flex-wrap: wrap;
}

.link-with-arrow {
  .link-text {
    a {
      text-transform: uppercase;
      color: $color-blue;
    }

    margin: 1em 0 0.5em;
    display: flex;
    align-items: center;
    min-width: 200px;

    .link-arrow {
      border-top: $color-blue 1px solid;
      width: 1em;
      position: relative;
      margin-right: 0.3em;

      &:before {
        position: absolute;
        right: 0;
        content: "";
        border-top: $color-blue 1px solid;
        border-right: $color-blue 1px solid;
        transform: rotateZ(45deg);
        transform-origin: top right;
        height: 0.3em;
        width: 0.3em;
        margin-top: -0.5px;
      }
    }
  }
}
</style>
