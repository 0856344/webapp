<template>
  <div v-editable="blok" class="workshop-best-of">
    <section class="header">
      <h2 class="headline">
        {{ blok.headline }}
      </h2>
      <div class="subline">
        <sb-link :link="blok.link">
          <div class="arrow" />
          {{ $t("allCourses") }}
        </sb-link>
      </div>
    </section>
    <div class="gg-grid">
      <workshop-preview
        v-for="w in blok.workshops"
        :id="w"
        :key="w"
        class="col"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
};
</script>

<style lang="scss" scoped>
.workshop-best-of {
  background-color: $color-bright-bg;
  position: relative;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 6% 0 2% 7%;
  }
  .headline {
    margin: 0;
    margin-bottom: 30px;
    max-width: 40%;
    font-size: 3rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    flex: 1;
    font-family: $font-mono;
    @include media-breakpoint-down(sm) {
      max-width: 50%;
      font-size: 2rem;
    }
  }
  .subline {
    color: $color-orange;
    display: flex;
    @include media-breakpoint-up(md) {
      margin-right: 8%;
    }
    @include media-breakpoint-down(sm) {
      flex-direction: column;
      .link {
        margin-top: 2em;
        margin-left: -1em;
      }
    }
    .hr {
      flex: 1;
    }
    .link {
      font-size: 1.3rem;
      font-family: $font-secondary;
      text-decoration: none;
      color: #000;
      .arrow {
        display: inline-block;
        position: relative;
        width: 4em;
        @include media-breakpoint-down(sm) {
          width: 55%;
        }
        border-top: 0.1em solid #000;
        margin: 0.25em 1em;
        transition: transform 0.15s ease-out;
        &:after {
          content: "";
          position: absolute;
          right: -0.1em;
          top: -0.05em;
          border-top: 0.1em solid #000;
          border-right: 0.1em solid #000;
          width: 0.5em;
          height: 0.5em;
          transform-origin: right top;
          transform: rotate(45deg);
        }
      }
      &:hover {
        .arrow {
          transform: translateX(0.5em);
        }
      }
    }
  }

  .gg-grid {
    padding: 0 5% 0 5%;
    @include media-breakpoint-down(sm) {
      padding: 0 10% 0 3%;
    }
    .col {
      display: inline-block;
      width: 50%;
      @include media-breakpoint-down(sm) {
        width: 100%;
      }
      line-height: 1.3;
    }
  }
}
</style>
