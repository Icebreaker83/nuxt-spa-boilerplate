<template>
  <v-container>
    <p>Administration/Users</p>
    <v-text-field />
  </v-container>
</template>

<script>
export default {
  middleware: 'auth-pages'
}
</script>
