<template>
  <v-app-bar dark clipped-left fixed app color="primary">
    <!-- SideNav collapse button -->
    <v-app-bar-nav-icon @click.stop="toggleCollapse" />
    <!-- Title -->
    <v-toolbar-title v-text="$t('app-bar.title')" />
    <!-- Spacer -->
    <v-spacer />
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
    <v-btn to="/login" type="button" color="primary lighten-1">
      {{ $t('app-bar.login') }}
    </v-btn>
    <!-- Account settings menu -->
    <v-menu flat nudge-bottom="40">
      <!-- Menu expand button -->
      <template v-slot:activator="{ on }">
        <v-btn text class="toolbar-button body-2" v-on="on">
          Add username here
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
          <v-btn text class="toolbar-button-item body-2">
            {{ $t('app-bar.settings.logout') }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    currentTheme () {
      return (this.$vuetify.theme.isDark) ? this.$t('app-bar.settings.theme.dark') : this.$t('app-bar.settings.theme.light')
    },
    currentLocaleName () {
      return this.$i18n.locales.find(locale => locale.code === this.$i18n.locale).name
    }
  },
  mounted () {
    // console.log(this.$refs['locale-select'])
  },
  methods: {
    ...mapMutations({
      // map `this.toggleCollapse()` to `this.$store.commit('sidebar/SET_COLLAPSED')`
      toggleCollapse: 'sidebar/SET_COLLAPSED'
    }),
    toggleTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.$store.commit('theme/TOGGLE_THEME')
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
