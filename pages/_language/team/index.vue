<template>
  <section>
    <div class="team-wrapper">
      <img class="image" :src="$resizeImage(story.content.image, '1600x0')" />
      <div class="team">
        <div class="headline">
          {{ $t("the") }}
          <span class="strike"> {{ $t("machines") }}</span>
          <br />
          {{ $t("peopleBehind") }}
        </div>
        <div class="subline">
          <markdown :value="story.content.introduction"></markdown>
        </div>
      </div>
    </div>
    <!--    <div class="tags" :class="(tagsCollapsed ? 'collapsed' : '')">-->
    <!--      <div class="expander" @click="toggleTags()">-->
    <!--      </div>-->
    <!--      <div class="headline">-->
    <!--        {{ $t('departments') }}-->
    <!--      </div>-->
    <!--      <div class="tag-list">-->
    <!--        <div v-for="t in tags" :key="t.key" class="tag">-->
    <!--          <checkbox-->
    <!--              v-model="t.value"-->
    <!--              class="tag"-->
    <!--              theme="white"-->
    <!--          >{{t.name}}</checkbox>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="member-list-wrapper">
      <div v-if="members && members.length > 0" class="member-list">
        <transition-group name="list">
          <team-member-preview
            :key="item.id"
            v-for="item in members"
            :story="item"
            class="list-item"
          ></team-member-preview>
        </transition-group>
      </div>
      <div v-else class="member-list-none"></div>
    </div>
    <div v-for="i in footer" :key="i._uid">
      <component
        v-if="i.component"
        :key="i.component._uid"
        :blok="i"
        :is="i.component"
      ></component>
    </div>
  </section>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview";

export default {
  components: {
    //Checkbox
  },
  mixins: [storyblokLivePreview],
  data() {
    return {
      story: null,
      tagsCollapsed: true,
    };
  },
  created() {
    this.$watch(
      "tags",
      (newVal, oldVal) => {
        this.update();
      },
      { deep: true }
    );
  },
  methods: {
    toggleTags() {
      this.tagsCollapsed = !this.tagsCollapsed;
    },
    update() {
      this.$store.dispatch("findItems", this.filters).then((data) => {
        this.members = data.stories;
      });
    },
  },
  computed: {
    footer() {
      return this.story.content.footer;
    },
    filters() {
      return {
        filter_query: {
          component: {
            in: "team-member",
          },
        },
        with_tag: this.filterTags.join(","),
      };
    },
    filterTags() {
      return this.tags
        .filter((t) => {
          return t.value;
        })
        .map((t) => {
          return t.name;
        });
    },
  },
  async asyncData(context) {
    const tags = await context.store.dispatch("loadTagsTeam");
    const filters = {
      filter_query: {
        component: {
          in: "team-member",
        },
      },
    };
    const team = await context.store
      .dispatch("findItems", filters)
      .then((data) => {
        if (data.stories) {
          return { members: data.stories };
        }
        return { members: [] };
      });
    const page = await context.store
      .dispatch("loadPage", "/team")
      .catch((e) => {
        context.error({
          statusCode: e.response.status,
          message: e.response.statusText,
        });
      });
    return { tags, ...team, ...page };
  },
};
</script>

<style lang="scss">
.team-wrapper {
  padding: 10% 10% 0% 10%;
  position: relative;

  @media (max-width: $mobile-small) {
    padding-top: 100px;
  }

  .image {
    display: block;
    width: 100%;
    height: auto;
    z-index: -1;
    max-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .team {
    display: flex;
    flex-direction: column;
    padding: 40px 40px 0;
    background-color: #f2f3ee;

    @media (max-width: $mobile-small) {
      padding: 20px;
    }

    .headline {
      font-weight: bold;
      margin-bottom: 20px;
      font-size: 3rem;
      text-transform: uppercase;

      .strike {
        text-decoration: line-through;
      }

      @include media-breakpoint-down(sm) {
        font-size: 2rem;
      }
    }

    .subline {
      font-family: $font-mono;
      font-size: 0.9rem;
      margin-bottom: 10px;
      line-height: 1.5;
      @include media-breakpoint-down(sm) {
        font-size: 0.7rem;
      }
    }
  }
}

.tags {
  padding: 8vh 0;
  margin-top: 2%;
  @include media-breakpoint-down(sm) {
    padding: 4vh 0;
  }

  .headline {
    color: #fff;
    font-weight: bold;
    font-size: 1.8rem;
    @include margin-page-wide();
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    @include media-breakpoint-down(sm) {
      font-size: 1.2rem;
      margin-bottom: 10px;
    }
  }

  .tag-list {
    @include margin-page-wide();
    display: grid;
    max-width: 70em;
    grid-template-columns: repeat(3, 1fr);
    @include media-breakpoint-down(sm) {
      grid-template-columns: 1fr 1fr;
      font-size: 0.85em;
    }
    @include media-breakpoint-down(xs) {
      grid-template-columns: 1fr;
    }
    grid-gap: 15px 20px;

    > .tag {
      font-family: $font-mono;
      color: #fff;
      user-select: none;
      cursor: pointer;

      input[type="checkbox"] {
        outline: none;
        -webkit-appearance: none;
        padding: 5px;
        border: 1px solid #fff;
        border-radius: 3px;
        position: relative;
        top: 0;

        &:checked {
          background-color: #fff;
        }
      }
    }
  }

  background-color: $color-blue;
  @include media-breakpoint-down(sm) {
    overflow: hidden;
    position: relative;
    max-height: 1000px;
    transition: all 0.3s linear;
    padding-bottom: 30px;
    .expander {
      cursor: pointer;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 20px;
      transition: all 0.3s linear;

      &:after {
        transition: all 0.3s linear;
        content: "";
        position: absolute;
        left: 50%;
        width: 10px;
        height: 10px;
        bottom: 8px;
        border-bottom: 2px solid #fff;
        border-right: 2px solid #fff;
        margin-left: -13px;
        transform: rotate(225deg);
        transform-origin: center center;
      }
    }
    &.collapsed {
      max-height: 17vh;

      .expander {
        height: 70px;
        background: linear-gradient(rgba(0, 0, 0, 0), $color-blue 80%);

        &:after {
          transform: rotate(45deg);
          bottom: 18px;
        }
      }
    }
  }
}

.member-list-wrapper {
  display: flex;
  margin-top: 3em;
  @include margin-page-wide();

  .member-list {
    > span {
      display: grid;
      @include media-breakpoint-up(sm) {
        grid-template-columns: 1fr 1fr;
      }
      @include media-breakpoint-up(md) {
        grid-template-columns: 1fr 1fr 1fr;
      }

      @include media-breakpoint-up(xl) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
      }
      grid-column-gap: 2vw;
      grid-row-gap: 2vw;
    }

    flex: 3;

    .list-item {
      min-width: 150px;
      padding: 0 30px;
      @include media-breakpoint-up(lg) {
        min-width: 200px;
      }
    }

    .list-enter-active,
    .list-leave-active {
      transition: all 0.5s;
    }

    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: translateX(30px);
    }
  }

  .member-list-none {
    flex: 1;
    text-align: center;
  }
}
</style>
