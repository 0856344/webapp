<template>
  <div
    class="machine-status"
    :style="{ 'background-color': color, 'font-size': fontSize }"
  >
    <div
      v-if="name"
      class="machine-name"
    >
      {{ name }}
    </div>
    <div
      v-if="resource"
      class="resource"
    >
      <div v-if="resource.state === 'active'">
        <div v-if="resource.offline">
          {{ $t( "offline" ) }}
        </div>
        <div v-else-if="resource.inUse">
          {{ $t( "inUse" ) }}
        </div>
        <div v-else>
          {{ $t( "available" ) }}
        </div>
      </div>
<!--      TODO Wartungsnotiz wieder einblenden-->
<!--      <div-->
<!--        v-else-if="resource.state === 'locked'"-->
<!--        :title="resource.maintenanceNotes"-->
<!--      >-->
        <div
          v-else-if="resource.state === 'locked'"
      >
        {{ $t( "outOfOrder" ) }}
      </div>
      <div v-else>
        {{ resource.state }}
      </div>
    </div>
    <div v-else>
      <loading-spinner color="#333" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'name'],
  data () {
    return {
      resource: null
    }
  },
  computed: {
    color () {
      if (!this.resource) {
        return '#FFF'
      }
      if (this.resource.state === 'locked') {
        return '#ebe223'
      }
      if (this.resource.offline) {
        return '#666'
      }
      if (this.resource.inUse) {
        return '#ff6f00'
      }
      if (this.resource.state === 'active') {
        return '#0069aa'
      }
      return '#FFF'
    },
    fontSize () {
      return this.resource && this.resource.inUse ? '0.9em' : '1em'
    }
  },
  async created () {
    this.resource = await this.$store.dispatch('getResource', this.id)
  }
}
</script>

<style lang="scss">

.machine-status {
  padding: 10px;
  border-bottom: 1px solid #f2f3ee;
  .machine-name {
    margin-bottom: 5px;
    font-weight: bold;
  }
  .resource {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 0.9em;
    color: #FFF;
    height: 2em;
    div {
      display: inline-block;
      text-transform: uppercase;
    }
  }
}
</style>
