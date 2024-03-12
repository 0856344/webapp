<template>
  <div class="machine-header">
    <div
      class="header-image"
      :style="{
        'background-image':
          'url(' + $resizeImage(machine.headerImage, '1600x0') + ')',
      }"
    />
    <div v-if="machine.title" class="header-title">
      <div class="machine-tags">
        <span :key="tag.id" v-for="(tag, index) in tags">
          {{ tag }}<span v-if="index + 1 < tags.length">, </span>
        </span>
      </div>
      <div class="title">
        {{ machine.title }}
      </div>
      <machine-status
        v-if="hasFabmanId && singleMachine && hasUser && hasBridge"
        :id="machine.machine_status_items[0].fabmanId"
        class="status"
      />
    </div>
  </div>
</template>

<script>
import MachineStatus from '@/bloks/machines/MachineStatus.vue';

export default {
  components: {
    MachineStatus,
  },
  props: ['story'],
  computed: {
    machine() {
      return this.story.content;
    },
    tags() {
      return this.story.tag_list;
    },
    hasUser() {
      return !!this.$store.state.member;
    },
    hasFabmanId() {
      // Check if the property path exists and its value is not null or empty
      return this.machine?.machine_status_items?.[0]?.fabmanId && this.machine.machine_status_items[0].fabmanId
    },
    singleMachine() {
      return (
        this.machine &&
        this.machine.machine_status_items &&
        this.machine.machine_status_items.length === 1
      );
    },
    hasBridge() {
      return this.machine.machine_status_items[0].hasBridge;
    },
  },
};
</script>

<style lang="scss">
.machine-header {
  @include media-breakpoint-up(md) {
    @include margin-page-wide;
  }
  height: calc(50vh - 89px);
  position: relative;
  margin-bottom: 10vh;
  .header-image {
    height: 100%;
    background-size: cover;
    background-position: center;
  }
  @include media-breakpoint-down(sm) {
    height: auto;
    .header-image {
      height: 20vh;
    }
  }
  .header-title {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #fff;
    padding: 4vh;
    min-width: 50%;
    @include media-breakpoint-up(md) {
      max-width: 70%;
    }
    @include media-breakpoint-down(sm) {
      position: relative;
      padding: 5%;
    }
    .machine-tags {
      color: $color-blue;
      text-transform: uppercase;
      margin-bottom: 0.8rem;
      letter-spacing: 0.05em;
      font-weight: 400;
    }
    .title {
      margin: 0 0 0.8rem;
      font-size: 1.5rem;
      @include media-breakpoint-up(md) {
        font-size: 2.5rem;
      }
      font-family: 'Chakra Petch';
      font-weight: bold;
    }
    .subtitle {
      font-size: 0.9rem;
      letter-spacing: 0.05em;
    }
    .status {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
