<template>
    <div v-editable="blok">
        <div class="machine-card">
            <div class="machine" v-if="machines != null && machines.length != 0">
                <div class="name"> {{ this.blok.title }}</div>
                <div class="display-machines">
                    <machine-preview
                      v-for="machine in machines"
                      :id="machine"
                      :key="machine"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  props: ['blok'],
  created () {
    console.log('Machine card created')
  },
  mounted () {
    console.log('blok', this.blok)
    this.machines = this.blok.machines
    console.log('this.machines', this.machines)
  },
  data () {
    return {
      machines: []
    }
  },
  computed: {
    machine () {
      return this.story.content
    },
    machinelink () {
      return '/de/machines/' + this.story.slug
    }
  }
}
</script>

<style lang="scss" scoped>
.machine-card {
    background-color: white;
}
.display-machines {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-top: 2vh;
    @include media-breakpoint-down(md) {
        grid-template-columns: 1fr 1fr;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
    @include media-breakpoint-down(sm) {
        grid-template-columns: 1fr;
        flex-flow: column;
        margin-bottom: 1vh;
    }
}
.display-machine {
  @include media-breakpoint-down(sm) {
    background: white;
    padding: 16px;
  }
}

.preview-wrapper {
  height: inherit;
}

.preview-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;

  .machine-preview {
    padding: 10px;
    width: 300px;
    height: 500px;
    @include media-breakpoint-down(sm) {
      height: auto;
      margin-left: 5%;
    }

    .loading {
    }

    .loading,
    .story {
      display: block;
      padding: 10px;
      cursor: pointer;
      text-decoration: none;
      color: #000;

      &:hover {
        background-color: lighten($color-bright-bg, 3);
      }

      .banner {
        height: 250px;
        background-size: cover;
        background-position: center;
        @include media-breakpoint-down(sm) {
          height: 200px;
        }
      }

      .title {
        margin: 1em 0 0.2em 0;
        font-weight: normal;
        font-size: 1.5rem;
        font-family: $font-secondary;
        @include media-breakpoint-down(sm) {
          font-size: 1.2rem;
        }
      }

      .teaser {
        font-size: 1rem;
        font-family: $font-mono;
      }
    }
  }
}
.name {
    font-size: 2.5rem;
    font-weight: bold;
    padding-top: 1vh;
    padding-left: 0;
    font-family: $font-secondary;
    margin-top: 5vh;
    @include media-breakpoint-down(md) {
        display: flex;
        justify-content: center;
    }
    @include media-breakpoint-down(sm) {
        font-size: 1.9rem;
    }
    @include media-breakpoint-down(xs) {
        font-size: 1.4rem;
    }
}
</style>
