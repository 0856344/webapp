<template>
  <nuxt-link :to="'/' + blok.full_slug">
    <div class="workshop-list-item" :class="{ slim: slim }">
      <div class="image">
        <img :src="$resizeImage(blok.content.image, '400x280')" alt="">
      </div>
      <div class="body">
        <div class="category">
          <div v-if="content.category === 'Einschulungen'">
            <span>{{ $t('instructions') }}</span>
          </div>
          <div v-if="content.category === 'Event'">
            <span>{{ $t('event') }}</span>
          </div>
          <div v-if="content.category === 'meetup'">
            <span>{{ $t('meetup') }}</span>
          </div>
          <div v-if="content.category === 'Workshops'">
            <span>{{ $t('workshops') }}</span>
          </div>
          <div v-if="content.category === '#frauenundtechnik'">
            <span>{{ $t('frauenundtechnik') }}</span>
          </div>
          <div v-if="content.category === 'for_kids'">
            <span>{{ $t('kidsWorkshop') }}</span>
          </div>
          <div v-if="content.category === 'makemas'">
            <span>{{ $t('makemas') }}</span>
          </div>
        </div>
        <div class="title">
          {{ content.title }}
        </div>
        <div v-if="!slim" class="teaser">
          <markdown :value="teaserText" class="info-text"/>
        </div>
        <div class="trainer">
          {{ content.trainer }}
        </div>
        <div v-if="content.members_only" class="member">
          <icon name="user"/>
          <span>{{ $t('membersOnly') }}</span>
        </div>
        <div class="workshop-dates" :key="this.eventDates.length">
          <div v-for="event in eventDates" :key="event.id" class="workshop-date">
            <div v-if="!slim || i === 0" class="info-row">
              <div>
                <div v-for="date in event.dates" :key="date.id" class="info-block">
                    <div class="col info"><icon name="calendar" />{{ date.data }}</div>
                    <div class="col info"><icon name="clock" />{{date.startTime }} bis {{ date.endTime }} Uhr</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="icon">
          <icon :name="blok.content.category"/>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import moment from 'moment'

export default {
  props: ['blok', 'slim', 'pretix'],
  mounted () {
    this.formatEventDates()
  },
  data () {
    return {
      events: null,
      pretixInfoArray: this.pretix,
      eventDates: [],
      teaser: '',
      nextEvent: {}
    }
  },
  computed: {
    isCatalog () {
      if (this.$route.path === '/de/workshops/catalog') {
        return true
      }
      return false
    },
    teaserText () {
      if (this.pretixInfoArray[this.pretixInfoArray.length - 1].frontpage_text['de-informal']) {
        let text = this.pretixInfoArray[this.pretixInfoArray.length - 1].frontpage_text['de-informal'].split('\n').splice(1).join('\n')
        // use teaser text to Hard Facts (which is markdown H5 #####)
        if (text.includes('HARD FACTS')) {
          text = text.substring(0, text.indexOf('HARD FACTS'))
        }

        return text
      }
      return ''
    },
    content () {
      return this.blok.content
    },
    linktext () {
      return 'Mehr Infos'
    }
  },
  methods: {
    formatEventDates () {
      this.pretix.forEach((item) => {
        if (item.date_from !== null && moment(item.date_from).isAfter(moment())) {
          const startDate = moment(item.date_from)
          const endDate = moment(item.date_to)
          const eventList = []
          eventList.push({
            data: startDate.locale('de').format('L'),
            startTime: startDate.format('HH:mm'),
            endTime: endDate.format('HH:mm')
          })
          this.eventDates.push({
            dates: eventList
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.workshop-list-item {
  max-height: 700px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: #000;
  display: flex;
  margin-bottom: 25px;
  justify-content: center;
  flex-flow: wrap;
  overflow:hidden;
  &.slim {
    margin-bottom: 0;

    .image {
      max-width: 10%;
    }

    .body {
      padding: 0.9em;
    }
  }

  /* @include media-breakpoint-down(sm) {
    flex-direction: column;
  } */

  .image {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    @include media-breakpoint-down(sm) {
      overflow: hidden;
    }

    img {
      width: inherit;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      @include media-breakpoint-down(xs) {
        width: 100%;
      }
      max-width: 100%;
    }
  }

  br {
    display: block;
    margin: 4px;
  }

  .body {
    position: relative;
    flex: 2;
    display: flex;
    flex-direction: column;
    background-color: #FFF;
    padding: 1.8rem;
    width: 100%;

    .icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 120px;

      svg {
        fill: #EEE;
      }
    }

    .title {
      position: relative;
      z-index: 1;
      font-family: $font-secondary;
      font-size: 1.8rem;
      margin-bottom: .4rem;
      @include media-breakpoint-down(md) {
        font-size: 1.1em;
        font-weight: bold;
        margin-top: 4px;
      }
    }

    .category {
      position: relative;
      z-index: 1;
      font-family: $font-mono;
      font-size: 0.9rem;
      letter-spacing: .1em;
      margin-bottom: .3rem;
      text-transform: uppercase;
      color: $color-orange;

      svg {
        fill: $color-orange;
        height: 1em;
        width: 1em;
      }
    }

    .teaser {
      position: relative;
      z-index: 1;
      flex: 1;
      font-family: $font-mono;
      line-height: 1.6;
      font-size: 0.9rem;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      hyphens: auto;
      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }

    .trainer, .member {
      line-height: 1.6;
      font-family: $font-mono;
      font-size: 0.9rem;
      font-weight: bold;
      margin: .4em 0;
    }

    .linktext {
      text-transform: uppercase;
      color: $color-blue;
      margin: 1em 0 .5em;
      display: flex;
      align-items: center;

      .link-arrow {
        border-top: $color-blue 1px solid;
        width: 1em;
        position: relative;
        margin-right: .3em;

        &:before {
          position: absolute;
          right: 0;
          content: "";
          border-top: $color-blue 1px solid;
          border-right: $color-blue 1px solid;
          transform: rotateZ(45deg);
          transform-origin: top right;
          height: .3em;
          width: .3em;
          margin-top: -.5px;
        }
      }
    }
  }

  &:hover {
    .image {
      img {
        transform: scale(1.03);
        transition: transform 400ms cubic-bezier(0.4, 0, 0.25, 1) 0ms, opacity 1s cubic-bezier(0.4, 0, 0.25, 1) 0ms;
        background-size: cover;
        overflow: hidden;
        width: 100%;
        background-color: rgba(19, 17, 19, 0.41);
        position: relative;
        left: 0;
        transition-duration: 0.4s, 0.5s;
        transition-timing-function: ease, ease-out;
        transition-delay: 0s, 0.4s;
        box-shadow: 0px -40px 71px rgba(0, 0, 0, 0.44);
        transition-property: all;
        z-index: 100;
      }
    }
  }
}

.workshop-dates {
  margin-top: 20px;
  overflow:scroll;
  max-height: 6.5em;

  .workshop-date {
    &:nth-child(odd) {
      background-color: rgba(242, 243, 238, 0.9);
    }

    &.soldOut {
      color: #666;
      fill: #666;

      .col {
        &.info {
          text-decoration: line-through;
        }
      }
    }

    .info-row {
      @include media-breakpoint-down(md) {
        flex-direction: column;
      }
      line-height: 1.6;
      font-family: $font-mono;
      font-size: 0.9rem;
      font-weight: bold;

      .info-block {
        flex-direction: row;
        display: flex;
        flex-wrap: wrap;
      }

      .col {
        margin: 4px;
        flex-grow: 1;

        &.soldOut {
          color: $color-orange;
          text-transform: uppercase;
        }
      }

      svg {
        height: 1em;
        width: 1em;
      }
    }
  }
}
</style>
