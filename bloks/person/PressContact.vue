<template>
  <div class="press-contact">
    <div class="contact-details">
      <h2 class="your-contact">
        {{ $t("yourContact") }}
      </h2>
      <div class="contact-information">
        <div class="contact-text">
          <h2 class="teaser">
            {{ person.title }}
          </h2>
          <h4 class="position">
            {{ person.position }}
          </h4>
          <h4>
            <markdown :value="person.company_details" />
          </h4>
          <h4 class="contact-email">
            {{ person.contact }}
          </h4>
        </div>
        <div
          class="contact-image"
          :style="{
            'background-image':
              'url(' + $resizeImage(person.Image, '600x600') + ')',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["story"],
  computed: {
    person() {
      return this.story;
    },
  },
};
</script>

<style lang="scss">
.background {
  background-color: white;
}
.press-header {
  font-size: 3rem;
  display: flex;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  text-transform: uppercase;
  background-color: #fff;
  padding: 0px 75px;
  margin-bottom: 10vh;
}
.press-contact {
  .contact-image {
    height: inherit;
    background-size: contain;
    background-repeat: no-repeat;
    width: 24%;
  }
  justify-content: center;
  .contact-information {
    margin-top: -4%;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }
  .contact-details {
    max-width: 1000px;
    .your-contact {
      font-size: 3rem;
      font-family: Chakra Petch;
      line-height: 1.1;
    }
    display: flex;
    align-self: center;
    flex-flow: column;
    margin-left: auto;
    margin-right: auto;
  }

  @include media-breakpoint-down(sm) {
    .contact-information {
      flex-flow: column;
      margin-top: -10%;
    }
    .contact-details {
      .your-contact {
        font-size: 2.5rem;
      }
    }
    .contact-image {
      height: 20vh;
      width: auto;
    }
  }
}

@include media-breakpoint-down(md) {
  .press-contact {
    .contact-information {
      flex-flow: column;

      .contact-image {
        height: 20vh;
      }
    }

    .contact-details {
      margin-left: 10%;
      margin-right: 10%;
    }
  }
}
</style>
