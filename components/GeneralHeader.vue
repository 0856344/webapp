<template>
  <div
      v-editable="blok"
      class="general-header"
  >
    <div
        class="header-image"
        :style="{ 'background-image': 'url(' + $resizeImage(blok.image, '1600x0') + ')' }"
    >
      <div class="general-header-box">
        <div class="testing">
          <div v-if="blok.boxText" class="text-center">
            {{blok.boxText}}
          </div>
          <button v-if="blok.ButtonText" class="input-button-primary">
            BUTTON
          </button>
        </div>
        <!--        <div class="box" style="&#45;&#45;c:repeating-linear-gradient(45deg,#ffffff 0 5px,rgb(255,255,255) 5px 10px);&#45;&#45;w:calc(30% - 10px);&#45;&#45;b:4px;&#45;&#45;r:10px">
                  {{blok.boxText}}
                  <button class="input-button-secondary">
                    BUTTON
                  </button>
                </div>-->
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
  .testing {
    display: flex;
    flex-flow: column;
    justify-content: center;
    height: 80%;
    width: 80%;
    align-self: center;
    display: flex;
    justify-content: center;
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
  .testing:hover {
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

.box {
  flex-flow: column;
  padding: 20px;
  align-self: center;
  color:white;
  --b: 5px;   /* thickness of the border */
  --c: red;   /* color of the border */
  --w: 20px;  /* width of border */
  --r: 25px;  /* radius */

  /* space for the border */
  position:relative;
  /*Irrelevant code*/
  width:85%;
  height:85%;
  box-sizing:border-box;
  margin:5px;
  display:inline-flex;
  font-size:1em;
  justify-content:center;
  align-items:center;
  text-align:center;
}
.box::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--c,red);
  padding: var(--b);
  border-radius: var(--r);
  -webkit-mask:
      linear-gradient(  0deg,#000 calc(2*var(--b)),#0000 0) 50% var(--b)/calc(100% - 2*var(--w)) 100% repeat-y,
      linear-gradient(-90deg,#000 calc(2*var(--b)),#0000 0) var(--b) 50%/100% calc(100% - 2*var(--w)) repeat-x,
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
}
.general-header-box{
  color:white;
  background: rgba(39, 46, 68, 0.71);
  height: 20vh;
  width: 20vw;
  display: flex;
  justify-content: center;
  @include media-breakpoint-down(lg) {
    width: 45vw;
  }
  @include media-breakpoint-down(md) {
   width: 50vw;
  }
  @include media-breakpoint-down(sm) {
    font-size: 15px;
    width: 70vw;
    height: 20vh;
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
    display: flex;
    justify-content: flex-end;
    flex-flow: wrap-reverse;
    padding: 20px;
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
      height: 30vh;
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
