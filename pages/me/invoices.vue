<template>
  <div>
    <section>
      <h2>Offene Buchungen</h2>
      <loading-spinner
        v-if="!activities"
        color="#333"
      />
      <div
        v-if="activities"
      >
        <div v-if="activities.length === 0"><p>Keine Buchungen vorhanden.</p></div>
        <div class="table" v-if="activities.length > 0">
          <div class="table-header">
            <div class="header-items">
              <div class="header-item activity-date">Datum</div>
              <div class="header-item activity-amount">Betrag</div>
              <div class="header-item activity-description">Buchung</div>
            </div>
          </div>
          <div class="table-content">
            <div
                v-for="activity of activities"
                :key="activity.id"
                class="table-row">
              <div class="table-data">{{ new Date(activity.date).toLocaleDateString('de-AT') }}</div>
              <div class="table-data activity-amount" :style="{color: activity.price > 0 ? 'red' : 'green'}">{{Number(activity.price * (-1)).toFixed(2).replace('.', ',')}} €</div>
              <div class="table-data activity-description">{{activity.description}}</div>

            </div>
          </div>
          <div class="table-content">
            <div class="table-row end">
              <div class="table-data result">{{totalResult > 0 ? 'Kosten:' : 'Guthaben:'}}</div>
              <div class="table-data total" :style="{color: totalResult > 0 ? 'red' : 'green'}">{{(Number(totalResult * (-1)).toFixed(2).replace('.', ','))}} €</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="invoice">
      <h2>Rechnungen</h2>
      <loading-spinner
          v-if="!invoices"
          color="#333"
      />
      <div
          v-if="invoices"
      >
        <div v-if="invoices.length === 0"><p>Keine Rechnungen vorhanden.</p></div>
        <div class="table" v-if="invoices.length > 0">
          <div class="table-header">
            <div class="header-items">
              <div class="header-item invoice-date">Datum</div>
              <div class="header-item invoice-number">Rechnung</div>
              <div class="header-item invoice-amount">Betrag</div>
              <div class="header-item invoice-status">Status</div>
            </div>
          </div>
          <div class="table-content">
            <div
                v-for="invoice of invoices"
                :key="invoice.id"
                class="table-row">
              <div class="table-data invoice-date">{{ new Date(invoice.date).toLocaleDateString('de-AT') }}</div>
              <div class="table-data invoice-number">{{invoice.number}}</div>
              <div class="table-data invoice-amount">{{invoice.total.replace('.', ',')}} €</div>
              <div class="table-data invoice-status">
                <span :class="[['paid'].includes(invoice.state) ? 'bubble grey' : 'noStatus']">Bezahlt</span>
                <span :class="[['unpaid'].includes(invoice.state) ? 'bubble yellow' : 'noStatus']">Offen</span>
                <span :class="[['cancelled'].includes(invoice.state) ? 'bubble red' : 'noStatus']">Storno</span>
              </div>
              <div
                  class="table-data icon"
                  @click="getPdf(invoice)"
              >
                <font-awesome-icon icon="download"/>
              </div>
            </div>
          </div>
        </div>
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
      invoices: null,
      activities: null,
      highlightedId: null
    }
  },
  async mounted () {
    this.invoices = await this.$store.dispatch('getInvoices')
    this.getQuery(this.$route.query)
    this.activities = await this.$store.dispatch('getActivities')
  },
  computed: {
    totalResult () {
      let total = 0
      for (const item in this.activities) {
        total += parseFloat(this.activities[item].price)
      }
      return total
    }
  },
  methods: {
    getQuery (to) {
      if (Object.prototype.hasOwnProperty.call(to, 'id')) {
        this.highlightedId = to.id
      }
    },
    async getPdf (invoice) {
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
          console.log(error.response.status, error.response.msg)
          this.$sentry.captureException(new Error(error))
          this.$toast.show('Die Rechnung konnte nicht geladen werden', {
            className: 'badToast'
          })
        })
    }
  }

}
</script>
<style lang="scss" scoped>
.invoice {
  margin: 10% 0;
}
.table {
  margin: 0;
  .table-header {
    display: flex;
    background-color: black;
    color: white;
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
    text-transform: uppercase;
    line-height: 1.25rem;
    letter-spacing: 0.05em;
    font-weight: 600;

    .header-items {
      display: flex;
      flex-grow: 1;

      .header-item {
        width: 22.5%;
        padding-left: 1rem;
        padding-right: 1rem;
      }
      .activity-description {
        width: 50%;
      }
      .invoice-status {
        margin-left: 2%;
      }
    }
  }

  .table-content {
    list-style: none;
    background-color: white;
    color: black;
    font-size: 0.9rem;
    line-height: 1.25rem;
    letter-spacing: 0.05em;
    font-weight: 500;

    .table-row {
      display: flex;
      flex-grow: 1;
      padding: 0.75rem 1.25rem;
      border-width: thin;
      border-style: solid;
      border-color: #e2e8f0;

      .table-data {
        width: 22.5%;
        padding-left: 1rem;
        padding-right: 1rem;
      }
      .activity-description {
        width: 50%;
      }
      .result {
        width: 77.5%;
        text-align: right;
      }
      .total {
        width: 17.5%;
        text-align: right;
      }
      .bubble {
        color: white;
        position: absolute;
        width: 90px;
        height: 25px;
        border-radius: 100px;
        text-align: center;
        font-weight: 600;
        padding-top: 2px;
        margin-bottom: 10px;
      }
      .grey {
        background: grey;
      }
      .red {
        background: red;
      }
      .yellow {
        background: #ECAB6D;
      }
      .noStatus {
        display: none;
      }
      .icon {
        display: flex;
        align-items: center;
        color: grey;
        width: 10%;
      }
      .icon:hover {
        cursor: pointer;
        color: black;
      }
    }
    .end {
      border-top-style: solid;
      border-top-color: black;
      border-top-width: medium;
    }
  }
  .activity-amount {
    text-align: right;
    order: 999;
  }
}
//Mobile
@include media-breakpoint-down(xs) {
  .table {
    margin-left: -8%;
    margin-right: -8%;
    .table-header {
      padding: 0.75rem 0;
      font-size: 0.8rem;
      line-height: 1.25rem;

      .header-items {
        display: flex;
        flex-grow: 1;
        flex-wrap: wrap;

        .header-item {
          width: 50%;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        .activity-amount {
          text-align: right;
        }

        .activity-description {
          width: 100%;
          order: 999;
        }
        .invoice-date {
          order: 1;
        }
        .invoice-amount {
          order: 2;
          text-align: right;
        }
        .invoice-number {
          order: 3;
        }
        .invoice-status {
          order: 4;
          text-align: right;
          margin-left: 0;
        }
      }
    }

    .table-content {
      font-size: 0.8rem;
      font-weight: 500;
      .table-row {
        padding: 0.75rem 0;
        display: flex;
        flex-wrap: wrap;
        .table-data {
          width: 50%;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        .activity-description {
          width: 100%;
          order: 999;
        }
        .activity-amount {
          text-align: right;
        }
        .invoice-date {
          order: 1;
        }
        .invoice-amount {
          order: 2;
          text-align: right;
        }
        .invoice-number {
          order: 3;
        }
        .invoice-status {
          order: 4;
          text-align: right;
        }
        .result {
          width: 78%;
          text-align: right;
        }
        .total {
          width: 22%;
          text-align: right;
        }
        .bubble {
          width: 60px;
          position: relative;
          padding: 2px 5px;
        }
        .icon {
          display: flex;
          align-items: end;
          color: grey;
          width: 7%;
          order: 5;
        }
      }
    }
  }
}
</style>
