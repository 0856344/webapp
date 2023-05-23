<template>
  <section class="oceaneye-overview">
    <div
        v-editable="blok"
        class="pretix-oceaneye"
    >
      <link rel="stylesheet" type="text/css" href="https://buchung.grandgarage.eu/oceanEye/widget/v1.css">
      <script type="text/javascript" src="https://buchung.grandgarage.eu/widget/v1.de-informal.js" async></script>
      <div class="container">
        <div
            class="col-start"
        >
          <h2
              v-if="blok.headline"
              class="headline"
          >
            <markdown :value="blok.headline" />
          </h2>
        </div>
        <div class="col-end">
          <p
              v-if="blok.text"
              class="text"
          >
            <markdown :value="blok.text" />
          </p>
        </div>
      </div>
      <div class="pretix-content">
        <div>
          <pretix-widget name="pretix" event="https://buchung.grandgarage.eu/oceanEye/"></pretix-widget>
        </div>
        <noscript>
          <div class="pretix-widget">
            <div class="pretix-widget-info-message">
              JavaScript ist in Ihrem Browser deaktiviert. Um unseren Ticket-Shop ohne JavaScript aufzurufen, klicken Sie bitte <a target="_blank" rel="noopener" href="https://buchung.grandgarage.eu/oceanEye/">hier</a>.
            </div>
          </div>
        </noscript>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
.oceaneye-overview {
  background-color: white;
  margin-bottom: 5%;
}
.container {
  max-width: 1255px;
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
        font-size: 1.8em;
      }
      position: relative;
      margin: 2% 4%;
      letter-spacing: 2px;
      line-height: 1.5;
      font-weight: 600;
      font-family: $font-secondary;

      p {
        margin: 0;
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
        margin: 0 0 2% 0;
      }
      @include media-breakpoint-down(md) {
        margin: 3% 15% 2%;
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
  }
}
.pretix-content {
  display: flex;
  justify-content: center;
  .pretix-widget-wrapper{
    a {
      color: $color-secondary;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    button {
      background-color: $color-secondary;
      border-color: $color-secondary;
    }
    button:hover {
      background-color: black;
      border-color: black;
    }
    .pretix-widget-event-week-table {
      margin-top: 3%;
    }
    .pretix-widget-event-availability-green {
      background-color: $color-primary !important;
    }
    .pretix-widget-event-availability-red {
      background-color: $color-secondary !important;
    }
    .pretix-widget-event-availability-reserved {
      background-color: $color-yellow !important;
    }
    width: 70vw;
    max-width: 1000px;
    background: white;
    .pretix-widget {
      border: none;
      .pretix-widget-event-week-col:first-child {
        @media screen and (min-width: 1145px) {
          margin-left: 50px !important;
        }
      }
    }
    .pretix-widget-event-calendar-events {
      margin: 3% 0;
      @media screen and (min-width: 1145px) {
        margin-top: 15%;
      }
    }
    .pretix-widget-event-calendar-previous-month{
      padding: 10px;
    }
    .pretix-widget-event-calendar-next-month{
      padding: 10px;
    }
    .pretix-widget .pretix-widget-loading svg {
      top: Min(40%);
      position: center;
    }
  }
}
</style>
