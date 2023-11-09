<template>
  <div class="section">
    <div>
      <h2>{{ $t("trainings") }}</h2>
      <loading-spinner v-if="!courses" color="#333" />
      <div v-if="courses" class="courseContainer">
        <Course v-for="course of courses" :key="course.id" :course="course" />
      </div>
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
      // return this.$store.state.courses.sort((a, b) => {
      //   const ma = this.memberCourses.filter(m => m.course_id === a.id)[0]
      //   const mb = this.memberCourses.filter(m => m.course_id === b.id)[0]
      //   return ma.is_valid - mb.is_valid
      // })
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
