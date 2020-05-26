<template>
  <v-container>
    <v-row>Dashboard</v-row>
    <div>
      localStorage
      {{ $store.state.localStorage.my_custom_value }}
      <v-btn dark @click="$store.commit('localStorage/increase')">
        increase
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {}
</script>
