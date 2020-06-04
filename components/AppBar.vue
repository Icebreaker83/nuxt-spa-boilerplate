<template>
  <v-app-bar
    v-if="renderAppBar"
    dark
    clipped-left
    fixed
    app
    color="primary"
  >
    <!-- SideNav collapse button -->
    <v-app-bar-nav-icon v-if="loggedIn" @click.stop="toggleCollapse" />
    <!-- Title -->
    <v-toolbar-title v-text="$t('app-bar.title')" />
    <!-- Spacer -->
    <v-spacer />
    <!-- <span> {{ currentLocaleName }} </span> -->
    <!-- Language -->
    <v-menu flat nudge-bottom="40">
      <!-- Menu expand button -->
      <template v-slot:activator="{ on }">
        <v-btn text class="toolbar-button body-2" v-on="on">
          {{ currentLocaleName }}
          <v-icon size="18">
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>
      <!-- List of languages -->
      <v-list flat dense subheader>
        <v-list-item v-for="locale in $i18n.locales" :key="locale.code" class="ma-0 pa-0">
          <v-btn text class="toolbar-button-item body-2" @click="$i18n.setLocale(locale.code)">
            {{ locale.name }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- Log In -->
    <v-btn v-if="!loggedIn" to="/login" type="button" color="primary lighten-1">
      {{ $t('app-bar.login') }}
    </v-btn>
    <!-- Account settings menu -->
    <v-menu v-else flat nudge-bottom="40">
      <!-- Menu expand button -->
      <template v-slot:activator="{ on }">
        <v-btn text class="toolbar-button body-2" v-on="on">
          {{ $auth.user.login }}
          <v-icon size="18">
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>
      <!-- List of options -->
      <v-list flat dense subheader>
        <!-- Profile -->
        <v-list-item class="ma-0 pa-0">
          <v-btn text class="toolbar-button-item body-2">
            {{ $t('app-bar.settings.profile') }}
          </v-btn>
        </v-list-item>
        <v-divider />
        <!-- Theme -->
        <v-list-item class="ma-0 pa-0">
          <v-btn text class="toolbar-button-item body-2" @click="toggleTheme">
            {{ $t('app-bar.settings.theme.label') }}: {{ currentTheme }}
          </v-btn>
        </v-list-item>
        <v-divider />
        <!-- Log Out -->
        <v-list-item class="ma-0 pa-0">
          <v-btn text class="toolbar-button-item body-2" @click="logout">
            {{ $t('app-bar.settings.logout') }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      renderAppBar: true,
      isInactive: false,
      userActivityThrottlerTimeout: null,
      userActivityTimeout: null,
      INACTIVE_USER_TIME_THRESHOLD: 1 * 60 * 1000,
      USER_ACTIVITY_THROTTLER_TIME: 0.5 * 60 * 1000
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn', 'user']),
    currentTheme () {
      return (this.$vuetify.theme.isDark) ? this.$t('app-bar.settings.theme.dark') : this.$t('app-bar.settings.theme.light')
    },
    currentLocaleName () {
      return this.$i18n.locales.find(locale => locale.code === this.$i18n.locale).name
    }
  },
  watch: {
    // fix for issue #2
    // localization v-menu has an issue with nuxt where it is moved to the end of AppBar after logout
    // solution is to force rerender AppBar component after logout
    '$auth.loggedIn' (newVal, oldVal) {
      if (!newVal && oldVal) {
        this.renderAppBar = false
        this.$nextTick(() => {
          this.renderAppBar = true
        })
      }
    }
  },
  beforeMount () {
    this.activateActivityTracker()
  },
  mounted () {
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', this.userActivityThrottler)
    window.removeEventListener('scroll', this.userActivityThrottler)
    window.removeEventListener('keydown', this.userActivityThrottler)
    window.removeEventListener('resize', this.userActivityThrottler)
    clearTimeout(this.userActivityTimeout)
    clearTimeout(this.userActivityThrottlerTimeout)
  },
  methods: {
    activateActivityTracker () {
      window.addEventListener('mousemove', this.userActivityThrottler)
      window.addEventListener('scroll', this.userActivityThrottler)
      window.addEventListener('keydown', this.userActivityThrottler)
      window.addEventListener('resize', this.userActivityThrottler)
    },
    resetUserActivityTimeout () {
      clearTimeout(this.userActivityTimeout)
      this.userActivityTimeout = setTimeout(() => {
        this.inactiveUserAction()
      }, this.INACTIVE_USER_TIME_THRESHOLD)
    },
    userActivityThrottler () {
      if (!this.userActivityThrottlerTimeout) {
        this.userActivityThrottlerTimeout = setTimeout(() => {
          this.resetUserActivityTimeout()
          clearTimeout(this.userActivityThrottlerTimeout)
          this.userActivityThrottlerTimeout = null
        }, this.USER_ACTIVITY_THROTTLER_TIME)
      }
    },
    inactiveUserAction () {
      if (this.$auth.loggedIn) {
        this.$auth.options.redirect.home = this.$route.path
        this.$auth.logout()
      }
    },
    ...mapMutations({
      toggleCollapse: 'sidebar/SET_COLLAPSED'
    }),
    toggleTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.$store.commit('theme/TOGGLE_THEME')
    },
    logout () {
      this.$auth.options.redirect.home = '/'
      this.$auth.logout()
    }
  }
}
</script>
<style scoped>

.toolbar-button-item {
  width: 100%;
}

.toolbar-button, .toolbar-button-item {
  text-transform: none;
  font-weight: 600;
}

.locale-container {
  width: 100px;
}
/* sets bacground of v-menu items */
/* menu_items is css var in theme in nuxt.config.js */
/* .v-list {
  background: var(--v-menu_items-base) !important;
} */
/*
.custom >>>.v-input__slot:before {
    border-style: none;
    margin: 0;
    padding: 0;
}

.custom >>>.v-input__slot:after {
    border-style: none;
    margin: 0;
    padding: 0;
} */
/*
.custom >>>.v-select__selections {
  background: red !important;
  width: 80px !important;
  float: right;
} */

/* .custom >>>.v-select__selections>input {
  background: red !important;
  margin: 0px;
  padding: 0px;
  width: 2px !important;
  display: none !important;
} */

/* .custom >>>.v-chip--select span {
  background: red !important;
} */

</style>
