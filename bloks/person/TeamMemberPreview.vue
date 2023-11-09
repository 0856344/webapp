<template>
  <div>
    <nuxt-link v-if="story" :to="'/' + story.full_slug">
      <div class="member-list-item">
        <div class="imageMember">
          <img
            v-if="member.image"
            class="pictureMember"
            :src="$resizeImage(member.image, '450x450')"
            alt=""
          />
          <img
            v-if="member.image_alt"
            :src="$resizeImage(member.image_alt, '450x450')"
            alt=""
            class="pictureMember image-alt"
          />
        </div>
        <div class="body">
          <div class="name">
            {{ member.name }}
          </div>
          <div class="title">
            {{ member.title }}
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["story"],
  async mounted() {
    window.scrollTo(0, 0);
  },
  computed: {
    member() {
      return this.story.content;
    },
    tags() {
      return this.story.tag_list;
    },
  },
  methods: {},
};
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
  .imageMember {
    position: relative;
    flex: 1;
    padding-top: 1.4em;
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
      margin-bottom: 0.4em;
    }
    .title {
      font-size: 0.9rem;
      color: $color-blue;
      text-transform: uppercase;
      margin-bottom: 0.8rem;
      letter-spacing: 0.05em;
      font-weight: 400;
      word-wrap: break-word;
    }
  }
}
</style>
