<template>
  <v-row dense justify="center" align="center" style="height: 100%;">
    <v-col cols="12" sm="6" md="4">
      <register />
    </v-col>
  </v-row>
</template>

<script>
import register from '@/components/RegisterUser'
export default {
  // auth set to guest because if set to false redirects will not work
  // and instead of redirecting to login will redirect to /
  auth: 'guest',
  components: {
    register
  }
}
</script>
