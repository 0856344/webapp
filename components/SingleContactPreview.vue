<template>
    <div v-if="story">
        <div class="preview-wrapper flex">
            <div v-if="(maker != null && maker.length !=0)" class="maker-preview">
                <nuxt-link class="story" :to="makerlink">
                    <div class="display-maker">
                        <div class="banner" :style="{ 'background-image': 'url(' + $resizeImage(maker.image, '250x250') + ')' }"/>
                    </div>
                </nuxt-link>
                <div class="name">
                    {{ maker.name }}
                </div>
                <div class="info">
                    {{ maker.title }}
                </div>
                <a class="info" :href="'mailto:'+maker.email">
                    {{ maker.email }}
                </a>
            </div>
            <div class="w-1/2 px-8" style="display: flex;align-items: center;justify-content: center;">
                <markdown :value="single_member_text" />
            </div>
        </div>
    </div>
    <div v-else>
        <div class="preview-wrapper">
            <div v-if="member" class="maker-preview">
                <div class="story">
                    <div class="display-maker">
                        <div v-if="image" class="banner" :style="{ 'background-image': 'url(' + $resizeImage(member.image, '250x250') + ')' }"/>
                    </div>
                </div>
                <div class="name">
                    {{ member.title }}
                </div>
                <markdown class="info" :value="member.text" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
  filters: {
    truncate: function (text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix
      } else {
        return text
      }
    }
  },
  props: ['id', 'single_member_text'],
  data () {
    return {
      story: null
    }
  },
  computed: {
    maker () {
      return this.story.content
    },
    makerlink () {
      return '/de/team/' + this.story.slug
    },
    member () {
      return this.id
    },
    image () {
      return this.id.image
    }
  },
  created () {
    //console.log('single_text', this.single_member_text)
    this.$store.app.$storyapi.get(`cdn/stories/${this.id}`, {
      find_by: 'uuid'
    }).then((res) => {
      this.story = res.data.story
    }).catch((e) => {
    })
  }
}
</script>

<style lang="scss" scoped>

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
    .story {
      display: block;
      cursor: pointer;
      text-decoration: none;
      color: #000;
      .banner {
        height: 250px;
        background-size: cover;
        background-position: center;
        @include media-breakpoint-down(sm) {
          height: 200px;
        }
      }
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
  .info {
    margin: 1em 0 0.2em 0;
    font-weight: normal;
    font-size: 0.8rem;
    font-family: $font-secondary;
    @include media-breakpoint-down(sm) {
      font-size: 0.7rem;
    }
  }
}
</style>
