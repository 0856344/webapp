<template>
  <div v-editable="blok" v-if="workshopInformation" class="workshop-info">
    <div class="left-content">
      <h2 v-if="subtitle" class="headline">
        {{ subtitle }}
      </h2>
    </div>
    <div class="right-content">
      <markdown :value="this.workShopInfo" class="info-text" />
      <div v-if="futureEvents && futureEvents.length > 0">
        <pretix-calendar :calendar="blok.pretix_shortform" />
      </div>
      <div v-else class="w-full flex align-middle justify-center">
        <div
          class="w-4/5 lg:w-1/2 rounded-md bg-white shadow-sm shadow-blue-700 m-4 py-1 px-2 text-center flex flex-col"
        >
          <p
            class="lg:text-xl text-lg font-bold font-mono text-white bg-blue my-2"
          >
            Danke für dein Interesse an diesem Workshop!
          </p>
          <p class="text-lg lg:leading-relaxed leading-tight m-0 mb-2">
            Derzeit ist kein Termin geplant. Melde dich bei unserem
            <a href="mailto:frontdesk@grandgarage.eu">Frontdesk</a> um auf dem
            Laufenden zu bleiben.
          </p>
        </div>
      </div>
    </div>
    <div>
      <component
        v-for="i in blok.contentBloks"
        :blok="i"
        :is="i.component"
        :key="i.uid"
      />
      <component
        v-for="i in blok.contentBloks"
        :blok="i"
        :is="i.component"
        :key="i.uid"
      />
    </div>
  </div>
</template>

<script>
import { getMetaTagsForPage } from "@/services/MetaDataService";

export default {
  props: ["blok", "workshopInformation"],
  data() {
    return {
      futureEvents: [],
    };
  },
  created() {
    this.$store
      .dispatch("getFutureEvents", this.blok.pretix_shortform)
      .then((res) => {
        this.futureEvents = res;
      });
    return {
      futureEvents: [],
    };
  },
  computed: {
    subtitle() {
      return this.workshopInformation.split("\n")[0].slice(4);
    },
    workShopInfo() {
      return this.workshopInformation.split("\n").splice(1).join("\n");
    },
    linktitle() {
      return this.blok.linktitle;
    },
    images() {
      return {
        items: this.blok.images,
      };
    },
  },
  head() {
    return getMetaTagsForPage(this.blok);
  },
};
</script>

<style lang="scss" scoped>
.workshop-info {
  color: #000;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  @include media-breakpoint-down(lg) {
    @include margin-page-wide;
  }

  .left-content {
    .headline {
      position: relative;
      @include media-breakpoint-up(md) {
        max-width: 50%;
        font-size: 2.2rem;
      }
      @include media-breakpoint-down(sm) {
        margin: 3vh 5%;
      }
      line-height: 1.5;
      font-family: $font-secondary;
    }
  }

  .right-content {
    flex-direction: column;
    position: relative;
    display: flex;
    align-items: flex-start;
    margin: 0 9%;
    @include media-breakpoint-down(lg) {
      margin: 0;
    }

    .workshop-dates {
      width: 100%;
      @include media-breakpoint-down(sm) {
        margin: 3vh 5%;
        width: 90%;
      }
    }

    .teaser,
    .info-text {
      .teaser,
      .info-text {
        font-weight: normal;
        font-family: $font-primary;
        line-height: 1.8;
        font-size: 1.1rem;
        @include media-breakpoint-down(sm) {
          line-height: 1.7;
          font-size: 1rem;
          margin: 0 0 0 5%;
          margin: 0 0 0 5%;
        }
      }

      .teaser {
        font-weight: bold;
      }

      .link {
        background-color: $color-orange;
        margin: 2% 0 0 5%;
        text-transform: uppercase;
        @include media-breakpoint-up(md) {
          margin-left: 25%;
        }
        color: #fff;
        padding: 0.7em 0.8em;
        padding: 0.7em 0.8em;
        font-weight: 800;
      }
    }
  }
}
</style>
