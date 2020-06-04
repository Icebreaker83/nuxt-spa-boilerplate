<template>
  <v-container>
    <v-row>Dashboard</v-row>
  </v-container>
</template>

<script>
export default {
  // auth set to guest because if set to false redirects will not work
  // and instead of redirecting to login will redirect to /
  auth: 'guest'
}
</script>
