<template>
  <div
      v-if="course && memberCourse"
      ref="trainingItem"
      :class="['training-item', { clickable: !memberCourse.is_valid }]"
      @click="takeQuiz">
    <div v-if="isLoading" class="spinnerContainer">
      <loading-spinner color="white"/>
    </div>
    <div class="body">
      <div class="content">
        <div class="top">
          <span class="course-heading"><b>{{ course.name }}</b></span>
        </div>
        <div class="bottom">
          <div class="status" v-if="!(this.memberCourse.is_valid)">
          <div class="left">
            <font-awesome-icon v-if="this.memberCourse.is_valid" class="green" icon="check-circle"/>
          </div>
        </div>
<!--          <div v-if="!this.memberCourse" class="course-info">
            <button class="input-button-primary" @click="startCourse">
              Kurs starten
            </button>
          </div>--><div v-if="this.memberCourse.is_valid" class="success">
          <font-awesome-icon icon="check-circle"/>
          <div>{{ $t('completed') }}</div>
        </div>
          <div v-else>
            <div class="startButton">
              <div>{{ $t('startQuiz') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['course'],
  data: () => ({
    isLoading: false
  }),
  computed: {
    memberCourse () {
      return this.$store.getters.getMemberCourseById(this.course.id)
    }
  },
  mounted () {
    // TODO check if I have permission
    this.getImage()
  },

  methods: {
    async getImage () {
      const quiz = await this.$store.dispatch('getQuiz', this.course.id)
      for (const question of quiz.quiz_questions) {
        if (question.imagePath.toLowerCase().endsWith('jpeg') || question.imagePath.toLowerCase().endsWith('png')) {
          if (this.$refs.trainingItem) {
            this.$refs.trainingItem.style.backgroundImage = `url(${question.imagePath})`
          }
          return
        }
      }
    },
    takeQuiz () {
      if (this.memberCourse.is_valid) {
        return
      }
      this.isLoading = true
      this.$router.push({ path: `/course?id=${this.course.id}` })
    },
    startCourse () {
      this.$store.dispatch('startCourse', { course_id: this.course.id }).then((memberCourse) => {
        this.$store.dispatch('getMemberCourses').then(() => {
          this.takeQuiz()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.training-item {
  background-repeat: no-repeat;
  background-size: cover;
  width: 20em;
  height: 24em;
  position: relative;
  border: 1px solid black;

  .spinnerContainer {
    position: absolute;
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .body {
    // display: flex;
    .content {
      flex: 1;
      text-align: center;
    }
    .status {
      display: flex;
      flex-flow: row nowrap;
      font-family: $font-mono;
      /*border-top: 1px solid black;*/
      padding: 1em;
      justify-content: center;
      & .grey {
        color: grey;
      }
    }
    .green {
      color: darkgreen;
    }
  .bottomText {
    width: 100%;
    background: black;
    color: white;
    height: 7.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    font-family: $font-mono;
  }

  .startButton {
    @extend .bottomText;
  }

  .course-info {
    @extend .bottomText;
    background: white;
    color: black;
    padding: 1em;
    font-size: 1rem;
    border-top: 1px solid black;
  }

  .course-heading {
    background: white;
    font-size: 1.5em;
    font-family: $font-mono;
  }

  .success {
    @extend .bottomText;
    color: darkgreen;
    background: white;
    height: 100%;
    margin-top: 2em;

    & :first-child {
      font-size: 1.7em;
      margin-right: -0.3em;
      margin-right: 0.3em;
    }
  }
}

.top {
  padding: 1em;
  line-height: 1.8em;
}

  .bottom {
    background: white;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    bottom: 0;
    height: 8.4em;
    width: 100%;
  }

  .input-button-primary {
    cursor: pointer;
    background-color: #ff6f00;
    color: #FFF;
    border: 1px solid #ff8c33;
    padding: 7px 12px 8px;
    line-height: 1;
    outline: none;
    align-self: center;
    margin-top: 20px;
    /*@include media-breakpoint-up(sm) {
      position: absolute;
      left: 48%;
      right: 45%;
    }
    @include media-breakpoint-down(sm) {
      position: absolute;
      left: 38%;
      right: 33%;
    }*/
  }

  .input-button-primary:disabled {
    cursor: default;
    background-color: grey;
    border: 1px solid darkgrey;
  }

  .input-button-primary:hover {
    color: black;
  }

  .input-button-back {
    @extend .input-button-primary;
  }

  .input-button-payment {
    @extend .input-button-primary;
    font-weight: bold;
    // background-color: #ff4400;
  }

}

.clickable {
  cursor: pointer;
}

.training-item:hover .startButton {
  border-top: 1px solid white;
  background: $color-orange;
}

</style>
