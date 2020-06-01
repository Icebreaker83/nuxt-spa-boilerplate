<template>
  <v-app>
    <v-content>
      <app-bar />
      <side-nav />
      <v-container class="ma-0 px-10">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar'
import SideNav from '@/components/SideNav'

export default {
  components: {
    AppBar,
    SideNav
  },
  methods: {
  }
}
</script>
