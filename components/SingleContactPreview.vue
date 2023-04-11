<template>
  <div v-if="story">
    <div class="preview-wrapper">
      <div v-if="(maker != null && maker.length !=0)" class="maker-preview">
        <div class="member-list-item">
          <div class="imageMember">
            <img
                v-if="maker.image"
                class="pictureMember"
                :src="$resizeImage(maker.image, '250x250')"
                alt=""
            >
            <img
                v-if="maker.image_alt"
                :src="$resizeImage(maker.image_alt, '250x250')"
                alt=""
                class="pictureMember image-alt"
            >
          </div>
          <div class="body">
            <div class="name">
              {{ maker.name }}
            </div>
            <div class="title">
              {{maker.title}}
            </div>
          </div>
        </div>
        <div class="maker-text">
          LOREM IPSUM DOLOR SIT AMET LOREM IPSUM DOLOR SIT AMET LOREM IPSUM DOLOR
        </div>
<!--        <nuxt-link class="story" :to="makerlink">
          <div class="display-maker">
            <div class="banner" :style="{ 'background-image': 'url(' + $resizeImage(maker.image, '250x250') + ')' }"/>
          </div>
        </nuxt-link>
        <div class="maker-description">
          <div class="name">
            {{ maker.name }}
          </div>
          <div class="info">
            {{ maker.title }}
          </div>
          <a class="info" :href="'mailto:'+maker.email">
            {{ maker.email }}
          </a>
        </div>-->
      </div>
    </div>
  </div>
<!--  <div v-else>
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
  </div>-->
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
  props: ['id'],
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

a {
  text-decoration: none;
  color: #000;
  &:active,
  &:focus {
    color: #000;
  }
}

.member-list-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  width: 30%;
  @include media-breakpoint-down(sm) {
    width: 100%;
  }
  .imageMember {
    position: relative;
    flex: 1;
    display: block;
    width: 100%;
    &:hover {
      .image-alt {
        display: inline;
        padding-top: 1.4em;
      }
    }
    .image-alt {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 99;
    }
    .pictureMember {
      width: 100%;
    }
  }
  .body {
    flex: 2;
    padding: 20px 0;
    .name {
      font-family: $font-secondary;
      font-size: 1.2rem;
      margin-bottom: .4em;
    }
    .title {
      font-size: 0.9rem;
      color: $color-blue;
      text-transform: uppercase;
      margin-bottom: .8rem;
      letter-spacing: 0.05em;
      font-weight: 400;
      word-wrap: break-word;
    }
  }
}
.maker-description{
  display: flex;
  justify-content: center;
  flex-flow: column;
}
.preview-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  .maker-preview {
    width: 700px;
    display: flex;
    height: auto;
    flex-flow:row;
    justify-content: space-between;
    .maker-text{
      display: flex;
      width: 60%;
      align-self: center;
    }
    @include media-breakpoint-down(sm) {
      margin-left: 5%;
      width: 300px;
      flex-flow: column;
      .maker-text{
        width: 100%;
      }
    }
    .story {
      display: block;
      cursor: pointer;
      text-decoration: none;
      color: #000;
      margin-right: 50px;
      width: 250px;
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
