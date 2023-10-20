<template>
  <div>
    <h2>{{ $t("myActivities") }}</h2>
    <div class="resources">
      <span v-if="machines.length < 1" class="resource-header">
        {{ $t("machineUsageOverview") }}
      </span>

      <!--      <div class="info-row">
                    <div class="info-block">
                        <div class="col log-info">
                            <span class="heading">Datum</span>
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="col log-info">
                            <span class="heading">Item</span>
                        </div>
                    </div>

                    &lt;!&ndash;<div class="info-block">
                        <div class="col info">
                            <span class="heading">Preis</span>
                        </div>
                    </div>&ndash;&gt;
                </div>
                <div class="info-row">
                    <div class="info-block">
                        <span class="resource-header">{{a.date | date }}</span>
                    </div>
                    <div class="info-block">
                        <span class="resource-header">{{a.item }}</span>
                    </div>
                    &lt;!&ndash;<div class="info-block">
                        <span class="resource-header">{{a.cost}} €</span>
                    </div>&ndash;&gt;
                </div>
            </div>
        </div>
        <h2>Meine Maschinen Nutzung</h2>-->

      <div :key="m" v-for="(m, z) in machines" class="resource-info">
        <div class="info-row">
          <span class="resource-header">{{ m.name }}</span>
        </div>
        <div class="info-row">
          <div class="info-block left">
            <div class="col log-info">
              <span class="heading">{{ $t("date") }} - {{ $t("time") }}</span>
            </div>
          </div>
          <div v-if="!empty" class="info-block">
            <div class="col log-info">
              <span class="heading">{{ $t("usage") }}</span>
            </div>
          </div>
          <div class="info-block right">
            <div class="col log-info">
              <span class="heading">{{ $t("totalDuration") }}</span>
            </div>
          </div>
          <!--<div class="info-block">
                        <div class="col info">
                            <span class="heading">Preis</span>
                        </div>
                    </div>-->
        </div>
        <!--<div v-for="c in count">
                    <div v-for="i in m.items" class="info-row" v-if="count_[i] <= (range * 10)"> -->
        <div :key="c" v-for="(i, c) in m.items" class="info-row">
          <span v-if="c <= range * 10">
            <div class="info-block left">
              <div class="col log-info">
                <span
                  >{{ i.created_at | date }} - {{ i.created_at | time }}</span
                >
              </div>
            </div>
          </span>
          <div v-if="!empty" class="info-block">
            <div class="col log-info">
              <span>{{ i.active_seconds }} {{ $t("seconds") }}</span>
            </div>
          </div>
          <div class="info-block right">
            <div class="col log-info">
              <span>{{
                i.all_seconds >= 120 || 60 > i.all_seconds
                  ? Math.round(i.all_seconds / 60) + " Minuten"
                  : Math.round(i.all_seconds / 60) + " Minute"
              }}</span>
              <!--<span>{{ i.all_seconds < 60 ? 'Sekunde' : 'Sekunden'}}</span>-->
            </div>
            <!--<div class="col info">
                                Status: <span v-bind:class="{ paid: status_id == 4 || status_id == 5}">{{status}}</span>
                            </div>
                            <div class="col info">
                                <span>Datum: {{date | date}}</span>
                            </div>-->
          </div>
          <!--<div class="info-block">
                            <div class="col info">
                                <span>0€</span>
                            </div>
                        </div>
                        -->
          <p>{{ c }}</p>
        </div>
        <!--</div>-->
        <button v-if="m.items.length >= 10" class="more" @click="more(z)">
          {{ $t("more") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Log",
  middleware: "authenticated",
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    time: 0,
  },
  data() {
    return {
      empty: false,
      resource_name: "Maschine",
      resource_names: [],
      items: [],
      machines: [],
      machine_items: [],
      activities: [],
      activity_item: {},
      count: 10,
      count_: [],
      showMore: [],
      range: 1,
    };
  },
  computed: {},
  created() {
    this.getLogs();
    this.getActivity();
  },
  methods: {
    getLogs() {
      const machineType = [
        "B-TEC ud-800",
        "CoastOne C9",
        "Datron MLCube",
        "Femi 192/M",
        "Formlabs Form 2 #1",
        "Formlabs Form 2 #2",
        "Frontdesk",
        "Heratherm OGS60",
        "Heratherm OGS750",
        "Kaffeemühlen",
        "KUKA KR 5-2 arc HW",
        "Lasercutter LED-Test",
        "Markforged Mark Two",
        "Metabo BAS261",
        "Pilous ARG 235 plus",
        "Profi Press 30 TON",
        "Prusa MK3S #1",
        "Prusa MK3S #2 + MMU2/S",
        "Prusa MK3S #3",
        "Sapi Elch 130",
        "Scantool 75X",
        "Schröder MHSU 2000",
        "Trotec Speedy 360 flexx",
        "Trotec Speedy 400",
        "Ultimaker 3 Dual Extrusion #1",
        "Ultimaker 3 Dual Extrusion #2",
        "Ultimaker 3 Dual Extrusion #3",
        "Ultimaker S5 #1",
        "Ultimaker S5 #2",
        "Universal Robotics UR 5e",
        "Voest Alpine DA 250",
        "Wagner Einhängekabine ID",
        "Walther Pilot Typ 708",
        "WEMO TB2024",
      ];
      let machineName = "";
      this.$store
        .dispatch("getRecourseLogs")
        .then((data) => {
          // console.log(data.data);
          for (let i = 0; i < machineType.length; i++) {
            if (data.data[machineType[i]]) {
              this.resource_name = machineType[i]; // array mit namen
              this.resource_names.push(machineType[i]);
              machineName = machineType[i];
              this.machines.push({
                name: machineName,
                items: data.data[machineName],
              });
            }
          }
          for (let j = 0; j < this.machines.length; j++) {
            // console.log(this.machines[j].items.length);
            for (let k = 0; k < this.machines[j].items.length; k++) {
              console.log(this.machines[j].items[k]);
            }
          }
          /* for (let j=0; j < this.machines.length; j++){
                        // console.log(this.machines[j].items.length)
                        if(j < this.count){
                            console.log('in ' + j);
                            console.log(this.machines[j].items);
                            for(let k = 0; k < this.machines[j].items.length; k++){
                                if(k <= this.count) {
                                    this.showMore.push(this.machines[j].items)
                                }
                            }
                        }
                    } */

          /* console.log(this.resource_names);
                    for (let j=0; j < this.resource_names.length; j++){
                        console.log(data.data[this.resource_names[j]]);
                        this.machine_items.push(data.data[this.resource_names[j]]);
                    } */
          /* for (let j=0; j < data.data[this.resource_name].length; j++){
                        this.items[j] = data.data[this.resource_name][j];
                        // this.items[j].date = data.data[this.resource_name][j].created_at;
                    } */

          console.log(this.showMore);
          this.machineType();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    machineType() {
      for (let i = 0; i < this.machines.length; i++) {
        // console.log(this.machines);
        for (let j = 0; j < this.machines[i].items.length; j++) {
          if (
            this.machines[i].items[j].active_seconds ===
            this.machines[i].items[j].all_seconds
          ) {
            this.empty = true;
          }
        }
      }
      console.log(this.empty);
    },
    getActivity() {
      this.$store
        .dispatch("getCurrentActivities")
        .then((data) => {
          console.log("activity: ");
          console.log(data.data);
          for (let i = 0; i < data.data.length; i++) {
            this.activity_item = {
              date: data.data[i].service_date,
              cost: data.data[i].cost_brutto,
              item: data.data[i].product.internal_name,
            };
            this.activities.push(this.activity_item);
          }
          console.log(this.activities);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    more(z) {
      console.log(z);
      /* this.showMore[z] = this.range;
                console.log(this.showMore); */
      this.range = this.range + 1;
      console.log(this.range);
    },
    getCount(i) {
      return this.count;
    },
  },
};
</script>

<style lang="scss" scoped>
.resources {
  // display: flex;
  margin-top: 20px;
  width: 100%;
  @include media-breakpoint-down(sm) {
    display: block;
  }

  .resource-info {
    background-color: #fff;
    border: 1px solid $color-orange;
    border-radius: 5px;
    margin: 10px 10px;
    padding: 40px 30px;
    position: relative;
    width: 45%;
    @include media-breakpoint-up(sm) {
      float: left;
    }
    @include media-breakpoint-down(sm) {
      margin: 10px 0px;
      width: 100%;
    }

    .info-row {
      font-family: $font-mono;
      font-size: 0.9rem;
      font-weight: bold;
      margin: -8px;
      display: flex;
      line-height: 1.6;

      .info-block {
        flex-direction: row;
        display: flex;

        .log-info {
          margin-top: 10px;
          width: 75%;

          .heading {
            font-weight: 500;
          }
        }

        .col {
          padding: 8px;
        }
      }

      .info-block.left {
        flex: 2;
      }

      .info-block.right {
        flex: 1;
      }
    }

    .more {
      background-color: #ff6f00;
      border: 1px solid #ff8c33;
      color: #fff;
      cursor: pointer;
      left: 45%;
      line-height: 1;
      outline: none;
      padding: 7px 12px 8px;
      position: absolute;
      right: 50%;
      margin-top: 5px;
      @include media-breakpoint-down(sm) {
        left: 40%;
      }
    }
  }

  span.resource-header {
    color: #ff6f00;
    font-size: large;
    font-weight: 700;
  }
}

.activities {
  width: 100%;
  margin-top: 20px;

  .resource-info {
    margin-top: 4px;
    padding: 10px;
    background-color: #fff;

    .info-row {
      @include media-breakpoint-down(md) {
        flex-direction: column;
      }
      line-height: 1.6;
      font-family: $font-mono;
      font-size: 0.9rem;
      font-weight: bold;
      margin: -8px;
      display: flex;

      .info-block {
        flex: 1;
        flex-direction: row;
        display: flex;

        .log-info {
          margin-top: 10px;
          width: 75%;

          .heading {
            font-weight: 500;
          }
        }

        .col {
          padding: 8px;
        }
      }

      .info-block.left {
        flex: 2;
      }

      .info-block.right {
        flex: 1;
      }
    }
  }

  span.activity-header {
    color: #ff6f00;
    font-size: large;
    font-weight: 700;
  }
}
</style>
