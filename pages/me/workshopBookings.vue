<template>
  <div>
    <h2>{{ $t('myWorkshops') }}</h2>
    <div
      v-if="bookings.length"
      class="workshops"
    >
      <div
        v-for="workshopDate in bookings"
        :key="workshopDate.content.workshop.uuid"
        class="workshop-item"
      >
        <workshop-preview
          :id="workshopDate.content.workshop.uuid"
          :key="workshopDate.content.workshop.uuid"
          class="preview"
        />
<!--        <button class="input-button-primary" @click="storno(workshopDate)">-->
<!--          Stornieren-->
<!--        </button>-->
        <workshop-dates
          :dates="[workshopDate]"
          class="workshop-dates"
          :hide-register="true"
          :no-metadata="true"
        />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Invoices',
  middleware: 'authenticated',
  data () {
    return {
      bookings: []
    }
  },
  computed: {},
  mounted () {
    this.$store.dispatch('getBookedWorkshops').then(data => {
      data.forEach(uuid => {
        this.$store.dispatch('loadStoryByUUid', uuid).then(data => {
          if (data.story.content.workshop !== null) {
            this.bookings.push(data.story)
          }
        })
      })
    })
  },
  methods: {
    // This function is for the commented out storno-button. That gives user the possibility to cancel their workshops
    storno (workshopDate) {
      const data = {
        workshop_date_id: workshopDate.uuid
      }
      if (confirm('Workshop ' + workshopDate.content.workshop.name + ' wirklich stornieren?')) {
        this.$store.dispatch('workshopStorno', data)
          .then((data) => {
            //console.log('status', status)
            if (data.status >= 200 && data.status < 300) {
              this.$toast.show('Der Workshop wurde erfolgreich storniert!', {
                className: 'goodToast'
              })
            }
          }).catch((error) => {
            console.log(error.response.status, error.response.data.error)
            this.$sentry.captureException(new Error(error))
            this.$toast.show(error.response.data.msg, {
              className: 'badToast'
            })
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.workshops {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.workshop-item {
  max-width: 100%;
  flex-direction: column;
  position: relative;
  background-color: #fafafa;
  margin: 1em 0;
  border: 1px solid grey;
  border-radius: 0.3em;
  box-shadow: 10px 5px 5px rgba(0,0,0,0.14118);
}
.workshop-dates {
  padding: 0 1em 1em 1em;
}
</style>
