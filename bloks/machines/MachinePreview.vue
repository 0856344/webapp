<template>
  <div v-if="story">
    <div class="preview-wrapper">
      <div class="machine-preview">
        <nuxt-link class="story" :to="machinelink">
          <div class="display-machine">
            <div
              class="banner"
              :style="{
                'background-image':
                  'url(' + $resizeImage(machine.image, '700x0') + ')',
              }"
            />
            <div class="title">
              {{ machine.title }}
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      story: null,
    };
  },
  computed: {
    machine() {
      return this.story.content;
    },
    machinelink() {
      return "/de/machines/" + this.story.slug;
    },
  },
  created() {
    this.$store.app.$storyapi
      .get(`cdn/stories/${this.id}`, {
        find_by: "uuid",
      })
      .then((res) => {
        this.story = res.data.story;
      })
      .catch((e) => {});
  },
  methods: {
    open() {
      this.$router.push({ path: this.story.full_slug });
    },
  },
};
</script>

<style lang="scss" scoped>
.display-machine {
  @include media-breakpoint-down(sm) {
    background: white;
    padding: 16px;
  }
}

.preview-wrapper {
  height: inherit;
}
.machine-preview:hover {
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.2);
}

.preview-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;

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
</style>
