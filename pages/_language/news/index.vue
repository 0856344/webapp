<template>
  <section>
    <div class="blog-wrapper">
     <img class="blog-header-image" :src="$resizeImage(headerImage, '1600x0')">
      <div class="blog-header-image">
      </div>
      <img class="blog-header-image">
      <div class="blog">
        <div class="headline">
          <p class="headline-text">{{ $t('blog') }}</p>
        </div>
        <div class="news-page">
          <div class="news-feed">
            <div :key="mi.id" class="month" v-for="(month, mi) in items">
              <div class="container">
                <img src="~/assets/img/icons/megaphone.svg" class="decorator" v-if="mi === 0">
                <h1 class="title">{{ month.label }}</h1>
              </div>
              <div class="separator"/>
              <div v-if="month.items && month.items.length === 1" class="items">
                  <div class="item" v-for="(item, ii) in month.items" :key="ii">
                    <span v-if="item.name !== 'Header'">
                      <news-feed-item :news="item" :key="item.id" type="horizontal" v-if="item.name !== 'Header'"/>
                    </span>
                  </div>
              </div>
              <div v-else-if="month.items && month.items.length >= 1" class="items">
                  <div class="item" v-for="(item, ii) in month.items" :key="ii">
                    <span v-if="item.name !== 'Header'">
                      <news-feed-item :news="item" :key="item.id" type="vertical" v-if="item.name !== 'Header'"/>
                    </span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  props: ['blok'],
  data () {
    return {
      news: [],
      page: [],
      root: null,
      loading: false,
      sources: [
        { name: 'magazin3', key: 'm3', selected: false },
        { name: 'youtube', key: 'yt', selected: false },
        { name: 'facebook', key: 'fb', selected: false },
        { name: 'twitter', key: 'tw', selected: false },
        { name: 'instagram', key: 'ig', selected: false }
      ],
      url: null
    }
  },
  async mounted () {
    window.scrollTo(0, 0)
  },
  async asyncData (context) {
    const filters = {
      filter_query: {
        component: {
          in: 'news-overview'
        }
      }
    }
    const news = await context.store.dispatch('findNews', filters).then(data => {
      return data.stories
    })
    await context.store.dispatch('getVotesByUuids', { uuids: news.map(o => o.uuid) }).then(r => {
      for (const [key, value] of Object.entries(r)) {
        news.forEach(newsEntry => {
          if (newsEntry.uuid === key) {
            newsEntry.count = value
          }
        })
      }
    })
    const page = await context.store.dispatch('loadPage', '/news').catch(e => {
      context.error({
        statusCode: e.response.status,
        message: e.response.statusText
      })
    })
    return { news, page }
  },
  methods: {
    update () {
      this.loading = true
      this.$store.dispatch('findNews', this.filters).then(data => {
        this.loading = false
        this.news = data.stories
      }).catch((e) => {
        this.loading = false
      })
    }
  },
  computed: {
    headerImage () {
      return this.page.story.content.image
    },
    items () {
      const list = []
      let temp = []
      let currentMonth = null
      let m = null
      if (!this.news || !this.news.length || this.news.length === 0) {
        return []
      }

      this.news.forEach((n) => {
        // n.count = this.votes[n.uuid];
        if (currentMonth !== moment(n.content.datetime).month()) {
          if (currentMonth != null) {
            list.push({ items: temp, label: m.locale('de-at').format('MMMM') })
            temp = []
          }
          m = moment(n.content.datetime)
          currentMonth = m.month()
        }

        if (n.name === 'Header') {
          this.url = n.content.image
        }
        temp.push({ type: 'item', ...n })
      })
      list.push({ items: temp, label: m.locale('de-at').format('MMMM') })
      return list
    },
    filters () {
      const sources = this.sources
        .filter(i => i.selected)
        .map(i => i.key)
        .join(',')
      // eslint-disable-next-line camelcase
      const filter_query = {
        component: { in: 'news-overview' }
      }
      if (sources) {
        filter_query.source = { in: sources }
      }
      return { filter_query }
    }
  }
}
</script>

<style lang="scss">

.blog-wrapper {
  padding-left: 15%;
  padding-top: 15%;
  position: relative;
  @media (max-width: $mobile-small) {
    padding-left: 0;
    padding-top: 200px;
  }

  .blog-header-image {
    background-size: contain;
    background-repeat: no-repeat;
    display: block;
    width: 100%;
    z-index: -1;
    max-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .blog {
    display: flex;
    flex-direction: column;
    padding: 40px;
    background-color: #fff;
    @media (max-width: $mobile-small) {
      padding: 20px;
    }

    .headline {
      font-weight: bold;
      font-size: 3.2rem;
      text-transform: uppercase;

      .headline-text {
        margin: 20px 20px;
      }

      @media (max-width: $mobile-small) {
        font-size: 2.5rem;
      }
    }

    .subline {
      font-family: $font-mono;
      font-size: 1.2rem;
      margin-bottom: 80px;
      line-height: 1.5;
    }

    .member-filters {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin: 10px;

      .department-label {
        margin: 0 5px;
        background-color: #eee;
        padding: 2px 5px;

        label {
          display: block;
          user-select: none;
          padding: 10px;
        }

        input {
          display: none;
        }

        &.active {
          background-color: $color-orange;
          color: #fff;
        }
      }
    }

    .member-grid {
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;

      .member-item {
        width: 100%;
      }

      @media (min-width: $mobile-large) {
        display: grid;
      }
    }
  }
}

.image-footer {
  height: 50vh;
  background-size: cover;
  background-position: center;
}

.news-page {
  margin-top: -60px;

  .no-results {
    width: 100%;
    text-align: center;
    margin-top: 100px;
  }

  .source-list {
    width: max-content;
    margin: 50px auto 0 auto;

    .source {
      margin: 5px 10px;
    }
  }

  .loading {
    margin-top: 20px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .news-feed {
    margin-right: 4%;
    margin-left: 4%;

    .month {
      .container {
        margin: 100px auto 0 auto;
        width: 300px;

        .title {
          text-align: center;
          background-color: $color-blue;
          padding: 5px 10px;
          color: #fff;
          margin: 0;
          white-space: nowrap;
        }
      }

      .items {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 4vw;
        @include media-breakpoint-down(sm) {
          grid-template-columns: repeat(1, 1fr);
        }
        /*
        column-count: 2;
        column-gap: 2em;
        @include media-breakpoint-down(sm) {
          column-count: 1;
        }
        */
        .item {
          display: inline-block;
          width: 100%;
          @include media-breakpoint-up(md) {
            &:nth-child(even) {
              text-align: left;
            }
            &:nth-child(odd) {
              text-align: right;

              .header {
                flex-direction: row-reverse;
              }
            }
          }
        }
      }

      .separator {
        border-bottom: 2px dashed $color-blue;
        width: 100%;
        margin-top: -1em;
      }

      .decorator {
        width: 50px;
        margin-bottom: -7px;
      }
    }
  }
}

@media (min-width: $mobile-small) {
  .source-list {
    display: flex;
  }
}
</style>
