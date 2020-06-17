<template>
  <v-row dense justify="center" align="center" style="height: 100%;">
    <v-col cols="12" sm="6" md="4" lg="3">
      <login />
    </v-col>
  </v-row>
</template>

<script>
// import login from '@/components/login/SingleLogin'
import login from '@/components/login/MultiLogin'

export default {
  components: {
    login
  }
}
</script>
