<template>
    <div v-editable="blok">
        <div v-if="machine" class="preview-wrapper">
            <div class="machine-preview">
                <nuxt-link class="story" :to="machinelink">
                    <div class="display-machine">
                        <div class="banner"
                             :style="{ 'background-image': 'url(' + $resizeImage(machine.metadata.image, '700x0') + ')' }"/>
                        <div class="title">
                            {{ machine.name }}
                        </div>
                        <markdown class="machine-tags" :value="this.machine.description"/>
                        <div class="flex flex-col">
                            <p class="text-sm"><font-awesome-icon icon="coins"/> {{ costsText }}</p>
                            <p class="text-sm mt-0"><i>{{noCreditsLeftText}}</i></p>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  props: ['blok'],
  data () {
    return {
      machine: null
    }
  },
  async mounted () {
    this.machine = await this.$store.dispatch('getResource', 3777)
    console.log('fabman-machine', this.machine)
  },
  computed: {
    machineId () {
      return this.blok.machine
    },
    machinelink () {
      return '/de/machines/' + this.machine.metadata.technical_name
    },
    costsText () {
      const costs = (Number(this.machine.pricePerTimeBusy * 10).toFixed(0))
      const pricePerTime = this.machine.pricePerTimeBusySeconds / 60
      return costs + ' Credits pro ' + pricePerTime + ' Minute(n)'
    },
    noCreditsLeftText () {
      return 'Ohne Credits ' + this.machine.pricePerTimeBusy + '€ pro ' + this.machine.pricePerTimeBusySeconds / 60 + ' Minute(n)'
    }
  }
}
</script>

<style lang="scss" scoped>

.description {
  font-size: .9rem;
  line-height: 2.2;
}

.text {
  flex: 1.5;
  @include media-breakpoint-down(md) {
    flex: 1;
  }
  display: flex;
  line-height: 1.5;
  font-size: 0.9rem;
  @include media-breakpoint-down(sm) {
    line-height: 1.4;
  }
}

.title {
  font-family: $font-secondary;
  font-size: 1.2rem;
  margin-bottom: .4em;
  overflow-wrap: break-word;
}

.machine-tags {
  font-size: 0.9rem;
  color: $color-blue;
  text-transform: uppercase;
  margin-bottom: .8rem;
  letter-spacing: 0.05em;
  font-weight: 400;
  word-wrap: break-word;
}

.subtitle {
  margin: 0 0 1em 0;
}

.teaser {
  font-family: $font-mono;
  line-height: 2.2;
  font-size: 0.9rem;
}

.cta {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9rem;
  font-family: $font-secondary;
  letter-spacing: 0.05rem;
  padding: 25px 0;

  a {
    color: $color-blue;
    text-decoration: none;
  }
}

.machine-card {
  padding: 0 50px;
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

.preview-wrapper:hover {
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, .2);
}

.preview-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;

  .machine-preview:hover {
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, .2) !important;
  }

  .machine-preview {
    padding: 10px;
    width: 280px;
    height: 450px;
    background-color: white;
    margin: 10px;
    word-wrap: break-word;
    border-radius: 10px;
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
