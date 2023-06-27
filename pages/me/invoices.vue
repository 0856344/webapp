<template>
    <div>
        <section>
            <div class="flex items-center mb-1">
                <h2 class="m-0 mr-1 text-2xl">Offene Buchungen</h2>
                <loading-spinner-inline v-if="loadingActivities"/>
            </div>
            <div v-if="activities">
                <table v-if="activities.length > 0" class="member-portal-table table-auto">
                    <thead>
                    <tr>
                        <th class="activity-date">Datum</th>
                        <th class="activity-amount">Betrag</th>
                        <th class="activity-description">Buchung</th>
                        <th class="activity-status"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="activity of activities" :key="activity.id">
                        <td class="activity-date">{{ new Date(activity.date).toLocaleDateString('de-AT') }}</td>
                        <td class="activity-amount" :style="{color: activity.price > 0 ? 'red' : 'green'}">
                            {{ Number(activity.price * (-1)).toFixed(2).replace('.', ',') }} €
                        </td>
                        <td class="activity-description">{{ activity.description }}</td>
                        <td class="activity-status"></td>
                    </tr>
                    <tr class="activity-total">
                        <td></td>
                        <td></td>
                        <td class="result"><b>{{ totalResult > 0 ? 'Gesamt:' : 'Guthaben:' }}</b></td>
                        <td class="total" :style="{color: totalResult > 0 ? 'red' : 'green'}">
                            {{ (Number(totalResult * (-1)).toFixed(2).replace('.', ',')) }} €
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div v-else><p>Keine Buchungen vorhanden.</p></div>
            </div>
        </section>

        <section class="invoice">
            <div class="flex items-center mb-1">
                <h2 class="m-0 mr-1 text-2xl">Rechnungen</h2>
                <loading-spinner-inline v-if="loadingInvoices"/>
            </div>
            <div v-if="invoices">
                <table v-if="invoices.length > 0" class="member-portal-table table-auto">
                    <thead>
                    <tr>
                        <th class="invoice-date">Datum</th>
                        <th class="invoice-number">Rechnung</th>
                        <th class="invoice-amount">Betrag</th>
                        <th class="invoice-status">Status</th>
                        <th class="invoice-download"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="invoice of invoices" :key="invoice.id">
                        <td class="invoice-date">{{ new Date(invoice.date).toLocaleDateString('de-AT') }}</td>
                        <td class="invoice-number">{{ invoice.number }}</td>
                        <td class="invoice-amount">{{ invoice.total.replace('.', ',') }} €</td>
                        <td class="invoice-status">
                            <div v-if="invoice.state" class="bubble" :class="getInvoiceStateClass(invoice)">
                                {{ getInvoiceStateText(invoice) }}
                            </div>
                        </td>
                        <td @click="getPdf(invoice)" class="invoice-download">
                            <div class="text-center">
                                <loading-spinner v-if="loadingPdf" color="#333"
                                                 class="pdf-loading-spinner flex text-center justify-center items-center"/>
                                <font-awesome-icon v-else icon="download" class="clickable-icon"/>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div v-else><p>Keine Rechnungen vorhanden.</p></div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
  name: 'Invoices',
  middleware: 'authenticated',
  data () {
    return {
      loadingInvoices: false,
      loadingActivities: false,
      loadingPdf: false,
      invoices: null,
      activities: null,
      highlightedId: null
    }
  },
  async mounted () {
    this.getQuery(this.$route.query)

    // Load invoices
    this.loadingInvoices = true
    await this.$store.dispatch('getInvoices')
      .then((res) => {
        this.invoices = res
      })
      .catch((error) => {
        console.error('Error! Could not load invoices', error)
      })
      .finally(() => {
        this.loadingInvoices = false
      })

    // Load activities
    this.loadingActivities = true
    await this.$store.dispatch('getActivities')
      .then((res) => {
        this.activities = res
      })
      .catch((error) => {
        console.error('Error! Could not load activities', error)
      })
      .finally(() => {
        this.loadingActivities = false
      })
  },
  computed: {
    isLoading () {
      return this.loadingInvoices || this.loadingActivities || this.loadingPdf
    },
    totalResult () {
      let total = 0
      for (const item in this.activities) {
        total += parseFloat(this.activities[item].price)
      }
      return total
    }
  },
  methods: {
    getInvoiceStateClass (invoice) {
      switch (invoice.state) {
        case 'paid':
          return 'grey'
        case 'unpaid':
          return 'yellow'
        case 'cancelled':
          return 'red'
        default:
          return 'bubble grey'
      }
    },
    getInvoiceStateText (invoice) {
      switch (invoice.state) {
        case 'paid':
          return 'Bezahlt'
        case 'unpaid':
          return 'Offen'
        case 'cancelled':
          return 'Storno'
        default:
          return ''
      }
    },
    getQuery (to) {
      if (Object.prototype.hasOwnProperty.call(to, 'id')) {
        this.highlightedId = to.id
      }
    },
    async getPdf (invoice) {
      this.loadingPdf = true
      await this.$store.dispatch('getPDF', invoice.id)
        .then((res) => {
          const binary = atob(res.pdf.replace(/\s/g, ''))
          const len = binary.length
          const buffer = new ArrayBuffer(len)
          const view = new Uint8Array(buffer)
          for (let i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i)
          }
          const blob = new Blob([view], { type: 'application/pdf' })
          const link = document.createElement('a')
          link.target = '_blank'
          link.download = `Rechnung_${invoice.number}.pdf`
          link.href = URL.createObjectURL(blob)
          link.click()
        })
        .catch((error) => {
          console.error(error.response.status, error.response.msg)
          this.$sentry.captureException(new Error(error))
          this.$toast.show('Die Rechnung konnte nicht geladen werden', {
            className: 'badToast'
          })
        })
        .finally(() => {
          this.loadingPdf = false
        })
    }
  }

}
</script>
<style lang="scss" scoped>
.invoice {
  margin: 10% 0;
}
.activity-total {
    border-top: 2px solid #333;

    @include media-breakpoint-down(sm) {

    }

}
</style>
