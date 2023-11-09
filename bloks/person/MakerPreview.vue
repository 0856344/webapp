<template>
  <div v-if="story">
    <div class="preview-wrapper">
      <div v-if="maker != null && maker.length != 0" class="maker-preview">
        <nuxt-link class="story" :to="makerlink">
          <div class="display-maker">
            <div
              class="banner"
              :style="{
                'background-image':
                  'url(' + $resizeImage(maker.image, '250x250') + ')',
              }"
            />
            <div class="name">
              {{ maker.name }}
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="preview-wrapper">
      <div v-if="member" class="maker-preview">
        <div class="story">
          <div class="display-maker">
            <div
              class="banner"
              :style="{
                'background-image':
                  'url(' + $resizeImage(member.image, '250x250') + ')',
              }"
            />
            <div class="name">
              {{ member.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    truncate: function (text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    },
  },
  props: ["id"],
  data() {
    return {
      story: null,
    };
  },
  computed: {
    maker() {
      return this.story.content;
    },
    member() {
      return this.id;
    },
    makerlink() {
      return "/de/team/" + this.story.slug;
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
.display-maker {
  @include media-breakpoint-down(sm) {
    background: white;
    padding: 16px;
  }
}

.preview-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  .maker-preview {
    padding: 10px;
    width: 300px;
    height: auto;
    @include media-breakpoint-down(sm) {
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

      .name {
        margin: 1em 0 0.2em 0;
        font-weight: normal;
        font-size: 1.5rem;
        font-family: $font-secondary;
        @include media-breakpoint-down(sm) {
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>
