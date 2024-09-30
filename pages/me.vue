<template>
  <div>
    <div class="profile" v-if="member !== null">
      <div class="header">
        <h1 class="name">{{ member.firstName }} {{ member.lastName }}</h1>
        <h2 style="display: none">STAGING</h2>
        <code class="number">#{{ member.memberNumber }}</code>
      </div>
      <div
        v-if="!hasCompletedRequiredCourses"
        class="alert alert-secondary"
        role="alert"
      >
        <font-awesome-icon icon="info-circle" />
        {{ $t('openSafetyTraining') }}
      </div>
      <div class="tab-section">
        <div class="tab-section-menu">
          <MenuLink to="/me/" icon="user">{{ $t('myProfile') }}</MenuLink>
          <MenuLink
            v-show="canSeeBookings"
            to="/me/bookings/"
            icon="calendar"
          >{{ $t('machineBooking') }}</MenuLink>
          <MenuLink to="/me/packages" icon="house"
          >{{ $t('membership') }}
          </MenuLink>
          <MenuLink to="/me/credits" icon="coins"
          >Credits
          </MenuLink>
          <MenuLink
            to="/me/trainings"
            icon="graduation-cap"
            style="color: white !important"
          >
            <font-awesome-icon
              :style="{ color: '#E69140' }"
              v-if="!hasCompletedRequiredCourses"
              icon="info-circle"
            />
            {{ $t('trainings') }}
          </MenuLink>
          <MenuLink to="/de/gutscheine" icon="money-bill">Gutscheine</MenuLink>
          <MenuLink
            :isActive="$route.name.includes('invoices')"
            to="/me/invoices"
            icon="file-invoice"
          >{{ $t('invoices') }}
          </MenuLink>
        </div>
        <div class="tab-section-content">
          <NuxtChild :key="$route.params.slug"></NuxtChild>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col text-center mt-4">
      <p>Deine Daten werden geladen. Bitte lade die Seite neu.</p>
      <big-loading-spinner></big-loading-spinner>
    </div>
  </div>
</template>

<script>
import MenuLink from '@/bloks/MenuLink.vue';
import { helper } from '@/plugins/helper';

export default {
  middleware: 'authenticated',
  components: { MenuLink },
  data() {
    return {
      hasCompletedOnboarding: false, // TODO: implement hasCompletedOnboarding function in connector
      hasCompletedRequiredCourses: true,
      test: null,
      lastName: '',
    };
  },
  created() {},
  async mounted() {
    this.hasCompletedRequiredCourses = await this.$store.dispatch(
      'hasCompletedRequiredCourses',
      this.$store.state.member.id,
    );
    // TODO - Load allowed spaces for member - can't be done right now: no relation between package <-> space
    //await this.loadMemberSpaces()
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    },
    async loadMemberSpaces() {
      // TODO - filter machines by accessible spaces - can't be done right now: no relation between package <-> space
      //const memberPackages = this.$store.getters.getMemberPackages();
      //const filteredMemberPackages = memberPackages.filter(item => !helper.dateIsInPast(item?.chargedUntilDate))
      //let spaces = await this.$store.dispatch('getSpaces');
    }
  },
  computed: {
    member() {
      return this.$store.state.member;
    },
    canSeeBookings() {
      const memberPackages = this.$store.getters.getMemberPackages();

      return helper.isAllowedToBook(memberPackages);
    }
  },
};
</script>

<style lang="scss">
  .profile {
    min-height: 60vh;
    margin-left: 4%;
    margin-right: 4%;

    .header {
      margin: 2em 0;

      h1 {
        margin: 0;
      }

      display: flex;

      .spacer {
        flex: 1;
      }

      .logout-button {
        cursor: pointer;
        font-weight: bold;
        padding: 10px;
        border: none;
        outline: none;
        color: #fff;
        background-color: $color-orange;
      }
    }

    .name {
      display: inline-block;
    }

    .number {
      margin: 0 10px;
      color: #999;
    }

    .item-list {
      list-style-type: none;
      padding: 0;
    }

    .menuLink {
      @include media-breakpoint-down(lg) {
        justify-content: center;
        border-bottom: 2px solid #696969;
        min-width: 260px;
      }
    }

    .tab-section {
      display: flex;
      @include media-breakpoint-down(lg) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .tab-section-menu {
        padding-top: 20px;
        width: 240px;
        flex: 1;

        @include media-breakpoint-down(lg) {
          padding: 0;
          margin-bottom: 100px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          text-align: center;

          a {
            text-align: center;
          }
        }

        .submenu {
          padding-left: 2.5em;
        }

        a {
          color: #000;
          display: block;
          padding: 12px;

          &:hover {
            background-color: darken($color-bright-bg, 5);
          }

          &.nuxt-link-exact-active {
            color: $color-orange;
          }
        }
      }

      .tab-section-content {
        padding-left: 20px;
        flex: 3;
        @include media-breakpoint-down(sm) {
          padding-left: 0;
        }
      }
    }

    .fat {
      color: $color-blue-alt;
      font-weight: bolder;
    }
  }
</style>
