<template>
  <v-app>
    <v-content>
      <app-bar />
      <side-nav />
      <v-container fluid class="ma-0 pa-0" style="height: 100%;">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import AppBar from '@/components/AppBar'
import SideNav from '@/components/SideNav'

export default {
  components: {
    AppBar,
    SideNav
  },
  computed: {
    ...mapState('auth', ['loggedIn', 'user'])
  },
  methods: {
  }
}
</script>
