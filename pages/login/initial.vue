<template>
  <v-row dense justify="center" align="center" style="height: 100%;">
    <v-col cols="12" sm="6" md="4" lg="3">
      <v-card class="pb-1" rounded>
        <v-card-title class="justify-center primary">
          {{ $t('login.firstTime.title') }}
        </v-card-title>
        <v-card-text class="pa-0">
          <v-form ref="form" lazy-validation @submit.prevent="initialLogin" @keyup.enter="initialLogin">
            <v-row justify="center">
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
            <v-row justify="center">
              <v-col cols="12" sm="10">
                <v-btn
                  color="primary"
                  :class="{'disable-events': loading}"
                  :loading="loading"
                  dark
                  type="submit"
                  class="text-none body-2 mb-2"
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
import shared from '~/mixins/shared'

export default {
  auth: 'guest',
  mixins: [shared],
  data () {
    return {
      loading: false,
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
      this.loginInitial(this.user.login)
      this.loading = false
    }
  }
}
</script>
