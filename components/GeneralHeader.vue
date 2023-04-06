<template>
  <div
      v-editable="blok"
      class="general-header"
  >
    <div
        class="header-image"
        :style="{ 'background-image': 'url(' + $resizeImage(blok.image, '1600x0') + ')' }"
    >
      <div v-if="blok.ButtonText" class="general-header-box">
        <div class="inner-box">
          <div v-if="blok.boxText" class="text-center">
            {{blok.boxText}}
          </div>
          <button v-if="blok.ButtonText" class="input-button-primary">
            BUTTON
          </button>
        </div>
      </div>
    </div>
    <div
        v-if="blok.title"
        class="header-title"
    >
      <h4>{{ blok.title }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
.general-header{
  .inner-box {
    display: flex;
    flex-flow: column;
    justify-content: center;
    height: fit-content;
    width: 80%;
    align-self: center;
    --b: 4px;  /* border thickness*/
    --s: 50px; /* size of the corner*/
    --g: 10px; /* the gap*/
    --c: #ffffff;

    padding: calc(var(--b) + var(--g));
    background-image:
        conic-gradient(from  90deg at top    var(--b) left  var(--b),#0000 25%,var(--c) 0),
        conic-gradient(from -90deg at bottom var(--b) right var(--b),#0000 25%,var(--c) 0);
    background-position:
        var(--_p,0%) var(--_p,0%),
        calc(100% - var(--_p,0%)) calc(100% - var(--_p,0%));
    background-size: var(--s) var(--s);
    background-repeat: no-repeat;
    cursor: pointer;
    transition:
        background-position .3s var(--_i,.3s),
        background-size .3s calc(.3s - var(--_i,.3s));
  }
  img.alt {
    background-image:
        conic-gradient(from 180deg at top    var(--b) right var(--b),#0000 25%,var(--c) 0),
        conic-gradient(from   0deg at bottom var(--b) left  var(--b),#0000 25%,var(--c) 0);
    background-position:
        calc(100% - var(--_p,0%)) var(--_p,0%),
        var(--_p,0%) calc(100% - var(--_p,0%));
  }
  .inner-box:hover {
    background-size: calc(100% - var(--g)) calc(100% - var(--g));
    --_p: calc(var(--g)/2);
    --_i: 0s;
  }
  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    grid-auto-flow: column;
    gap: 20px;
    place-content: center;
    place-items: center;
    background: #99B2B7;
  }
}

.general-header-box{
  color:white;
  background: rgba(39, 46, 68, 0.71);
  height: fit-content;
  width: 20vw;
  display: flex;
  justify-content: center;
  .text-center{
    margin-bottom: 2vh;
  }
  @include media-breakpoint-down(lg) {
    width: 45vw;
  }
  @include media-breakpoint-down(md) {
   width: 50vw;
  }
  @include media-breakpoint-down(sm) {
    font-size: 15px;
    width: 70vw;
  }
  .input-button-primary{
    margin: 0;
  }
}
.general-header {
  @include media-breakpoint-down(lg) {
    @include margin-page-wide;
  }
  height: calc(50vh - 89px);
  position: relative;
  z-index: 10;
  .header-image {
    height: 100%;
    background-size: cover;
    background-position: center;
  }
  .header-title {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #FFF;
    padding: 4vh;
    min-width: 50%;
    h4 {
      margin: 0;
      font-size: 3rem;
      font-family: $font-secondary;
      font-weight: bold;
    }
  }

  @include media-breakpoint-down(sm) {
    height: auto;
    .header-image {
      height: 20vh;
    }
    .header-title {
      position: relative;
      padding: 5%;
      h4 {
        font-size: 2rem;
      }

    }
  }
}
</style>
