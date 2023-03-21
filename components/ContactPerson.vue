<template>
    <div
        class="contact-person"
    >
      <div class="teaser-content">
        <div
            id="start"
            class="col-start"
        >
          <h2
              v-if="blok.headline"
              class="headline"
          >
            {{blok.headline}}
          </h2>
        </div>
        <div class="col-end">
          <p
              v-if="blok.description"
              class="text"
          >
            <markdown :value="blok.description" />
          </p>
        </div>
        <div  class="contact-block">
          <div class="info">
            <markdown :value="blok.info" />
          </div>
          <div class="contact-details">
            <contact-preview
                v-for="p in person"
                :id="p"
                :key="p"
            />
            <contact-preview
                v-for="p in member"
                :id="p"
                :key="p._uid"
            />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    person () {
      return this.blok.contact
    },
    member () {
      if (this.blok.member != null) {
        return this.blok.member
      }
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-person {
  color: #000;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  margin: 2rem 0 6rem 0;

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
          width: 600px;
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
        letter-spacing: .03em;
      }
    }
  }
}
.contact-block{
  display: flex;
  background-color: white;
  padding: 30px;
  flex-flow: column;
  align-items: center;
  .info {
    font-family: $font-mono;
    line-height: 1.4;
    letter-spacing: 1.4px;
    font-size: 1.4em;
    color: $color-blue;
    margin: 2% 0;
    text-align: center;
  }
  .contact-details {
    display: flex;
    flex-direction: row;
  }
}
@include media-breakpoint-down(md) {
  .contact-person {
    margin: 2rem 0 2rem 0;

    .contact-block {
      .info {
        line-height: 1.2;
        font-size: 1.1em;

      }

      .contact-details {
        flex-flow: column;

        .contact-image {
          height: 20vh;
        }
      }
    }
  }
}
@include media-breakpoint-down(xs) {
  .contact-block {
      .info {
        line-height: 1.2;
        font-size: 0.9em;

      }
    }
  }
</style>
