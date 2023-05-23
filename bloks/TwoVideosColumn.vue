<template>
  <div
    v-editable="blok"
    class="two-videos-column"
    style="margin: 50px 0;"
  >
      <h2
          v-if="blok.headline"
          class="headline"
      >
        <markdown :value="blok.headline" />
      </h2>
      <p
          v-if="blok.text"
          class="text"
      >
        <markdown :value="blok.text" />
      </p>
    <div class='wrapper'>
      <div class='row'>
        <div class='column column1'>
          <div v-if="blok.video_1">
            <div class="video">
              <iframe :src="blok.video_1"
                      width="100%"
                      height="480"
                      title="Video 1"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen/>
            </div>
          </div>
        </div>
        <div class='column column2'>
          <div v-if="blok.video_2">
            <div class="video">
              <iframe :src="blok.video_2"
                      width="100%"
                      height="480"
                      title="Video 2"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen/>
            </div>
          </div>
        </div>
      </div>
      <div class='row'>
        <div class='column'>
          <img class="image" width="100%" :src="blok.image">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss" scoped>

.headline {
  font-size: 1.6em;
  @include media-breakpoint-up(lg) {
    width: 700px;
    font-size: 2.7em;
  }
  position: relative;
  margin-left: 7%;
  letter-spacing: 2px;
  line-height: 1.5;
  font-weight: 600;
  font-family: $font-secondary;

  p {
    margin: 0;
  }
}

.text {
  @include media-breakpoint-up(lg) {
    width: 900px;
    margin: 0 0 2% 12%;
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
  letter-spacing: .03em;
}
.row {
  display: flex;
  flex-direction: row; //_default
  @include media-breakpoint-down(sm) {
    flex-direction: column;
  }
  @include media-breakpoint-down(md) {
    flex-direction: column;
  }
  min-height: 100px;

  .content {
    height: 100%;
    padding: 5px;
  }

  .column1 {
    flex-basis: 50%;
  }

  .column2 {
    flex-basis: 50%;
  }
}
.image {
  margin: auto;
  display: block;
  max-width: 100%;
  max-height: 100%;
}
.column {
  padding: 0.3em;
  flex: 1;
}
</style>
