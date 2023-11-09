<template>
  <div v-editable="blok" class="about-teaser">
    <div class="teaser-content">
      <svg
        xmlns:osb="http://www.openswatchbook.org/uri/2009/osb"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:cc="http://creativecommons.org/ns#"
        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlns:svg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        class="start-down-arrow"
        version="1.1"
        viewBox="0 0 100 100"
        height="100"
        width="100"
        onclick="window.scrollTo({top: document.getElementById('start').getBoundingClientRect().top - document.body.getBoundingClientRect().top - 80, left: 0, behavior: 'smooth'})"
      >
        <g transform="translate(0,-270.54165)">
          <path
            d="m 50,270.54165 a 50,50 0 0 0 -50,50 50,50 0 0 0 50,50 50,50 0 0 0 50,-50 50,50 0 0 0 -50,-50 z m -2.576172,13.44531 h 5.160156 v 60.22071 l 13.59961,-13.36329 3.615234,3.67969 -19.984375,19.63867 -19.611328,-19.61132 3.646484,-3.64844 13.574219,13.57422 z"
            style="
              opacity: 1;
              vector-effect: none;
              fill: #eae222;
              fill-opacity: 1;
              fill-rule: nonzero;
              paint-order: normal;
            "
          />
        </g>
      </svg>
      <div id="start" class="col-start">
        <h2 v-if="blok.headline" class="headline">
          <svg
            class="circle"
            xmlns="http://www.w3.org/2000/svg"
            width="10mm"
            height="10mm"
            viewBox="0 0 10 10"
          >
            <circle cx="5" cy="5" r="4.758" fill="none" stroke-width=".5" />
          </svg>
          <markdown :value="blok.headline" />
        </h2>
      </div>
      <div class="col-end">
        <p v-if="blok.text" class="text">
          <markdown :value="blok.text" />
        </p>
      </div>
      <div class="video" v-if="blok.video">
        <iframe
          width="900"
          height="515"
          :src="blok.video"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
};
</script>

<style lang="scss">
.about-teaser {
  color: #000;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;

  .teaser-content {
    max-width: 100%;
    position: relative;
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    @include media-breakpoint-down(md) {
      background-size: 0.8em;
      background-position: 70% -10px;
    }
    @include media-breakpoint-down(xs) {
      background-position: 65% -10px;
    }

    .col-start {
      display: flex;
      align-items: flex-start;
      margin: 50px 70px 0;

      .headline {
        font-size: 1.4em;
        @include media-breakpoint-up(lg) {
          width: 700px;
          font-size: 2.7em;
        }
        position: relative;
        margin: 0 4%;
        letter-spacing: 2px;
        line-height: 1.5;
        font-weight: 600;
        font-family: $font-secondary;

        p {
          margin: 0;
        }

        .circle {
          position: absolute;
          stroke: $color-yellow;
          left: -75px;
          top: -84px;
          width: 160px;
          height: 160px;
          @include media-breakpoint-down(md) {
            width: 140px;
            height: 140px;
          }
          @include media-breakpoint-down(xs) {
            width: 100px;
            height: 100px;
            top: -65px;
            left: -57px;
          }
          z-index: -1;
        }
      }
    }

    .col-end {
      flex: 1;
      display: flex;
      align-self: center;

      .text {
        @include media-breakpoint-up(lg) {
          width: 900px;
          margin: 2% 0 2% 0;
        }
        @include media-breakpoint-down(md) {
          margin: 3% 15% 10%;
          font-size: 0.9em;
          line-height: 1.6;
        }
        margin-top: 0;
        font-weight: normal;
        font-family: $font-primary;
        line-height: 1.6;
        font-size: 1.1em;
        letter-spacing: 0.03em;
      }
    }

    /*
    .link {
      font-family: Helvetia, Arial;
      text-decoration: none;
      color: #00F;
      text-transform: uppercase;
      font-weight: bold;
      border: none;
      background: none;
      float: right;
      font-size: 1rem;
      padding: 5px 10px;
      cursor: pointer;
      &:hover,
      &:focus {
        outline: 1px solid #00F;
      }
    }
    */
  }

  .start-down-arrow {
    width: 9rem;
    @include media-breakpoint-down(md) {
      width: 6rem;
      margin-top: -4%;
    }
    @include media-breakpoint-down(xs) {
      width: 4rem;
      margin-top: -9%;
    }
    max-width: 10rem;
    height: 8rem;
    max-height: 9rem;
    position: absolute;
    right: 10%;
    margin-top: -2%;
    cursor: pointer;
  }

  .video {
    width: inherit;
    display: flex;
    align-self: center;

    & * {
      @include media-breakpoint-down(md) {
        height: 32vh;
        width: 69vw;
        margin-bottom: 10%;
      }
      @include media-breakpoint-down(xs) {
        height: 25vh;
        width: 100%;
        margin-bottom: 10%;
      }
    }
  }
}
</style>
