
<template>
  <div class="covidInfobox">
    <div class="boxContainer">
      <div class="box">
        <div class="title">
          {{ $t( "covidInfoTitle" ) }}
        </div>
        <div class="text">
          {{ $t( "covidInfoText" ) }}
        <NuxtLink to="/de/covid">{{ $t('here') }}</NuxtLink><br><br>

          {{ $t( "workShopCostRefund" ) }}<br><br>

          {{ $t( "weAreLookingForward") }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.covidInfobox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  font-family: $font-mono;
  & .boxContainer {
    & .box {
      display: flex;
      flex-direction: column;
      background-color: $color-yellow;
      width: 100vw;
      min-height: 12.5em;
      padding: 4em 5em;
      margin: 2em;
      & .title {
        font-size: 1.5em;
        font-weight: bolder;
      }
      & .text {
        margin-top: 1.5em;
        margin-right: 12em;
        line-height: 1.3em;
        @include media-breakpoint-down(sm) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
