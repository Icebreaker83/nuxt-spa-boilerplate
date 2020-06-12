<template>
  <v-row dense justify="center" align="center" style="height: 100%;">
    <v-col cols="12" sm="6" md="4" lg="3">
      <v-card class="pb-1" rounded>
        <v-card-title class="justify-center">
          {{ $t('login.firstTime.title') }}
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation @submit.prevent="initialLogin" @keyup.enter="initialLogin">
            <v-row dense justify="center">
              <v-col cols="12" sm="10">
                <v-text-field
                  ref="usernameInput"
                  v-model="user.login"
                  :label="$t('login.username')"
                  color="secondary"
                  :rules="usernameRules"
                />
              </v-col>
            </v-row>
            <v-row dense justify="center">
              <v-col cols="12" sm="10">
                <v-btn
                  color="secondary"
                  :class="{'disable-events': loading}"
                  :loading="loading"
                  dark
                  type="submit"
                  class="text-none body-2"
                  block
                  rounded
                >
                  {{ $t('form.submit') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue'

export default {
  auth: 'guest',
  data () {
    return {
      loading: false,
      // formValid: true,
      user: {
        login: ''
      },
      usernameRules: [
        v => !!v || `${this.$t('login.username')} ${this.$t('validation.fieldRequired')}`,
        v => !/[^A-Za-z0-9_.]/.test(v) || `${this.$t('login.username')} ${this.$t('validation.specialCharsNotAllowed')}`
      ]
    }
  },
  created () {
    // put username v-text-field into focus on page load
    this.$nextTick(() => this.$refs.usernameInput.focus())
  },
  methods: {
    initialLogin () {
      // validate form
      if (!this.$refs.form.validate()) {
        return
      }
      this.loading = true
      // replace resolveAfterXSeconds mock promise with axios request
      // this.$axios.post(Vue.$apiConfig.initialUserActivation, this.user.login)
      this.resolveAfterXSeconds(this.user.login).then((response) => {
        this.loading = false
        this.$router.push(Vue.$apiConfig.login)
        this.$toast.success(this.$t('login.firstTime.success'))
      }).catch((error) => {
        // handle failure
        console.log(error)
        this.loading = false
        this.$toast.error(this.$t('login.firstTime.error'))
      })
    }
  }
}
</script>
