<template>
  <v-row dense justify="center" align="center" style="height: 100%;">
    <v-col cols="12" sm="6" md="4" lg="3">
      <v-card rounded>
        <v-card-title class="justify-center primary white--text">
          {{ $t('login.forgottenPassword') }}
        </v-card-title>
        <v-card-text class="pa-0">
          <v-row justify="center" class="ma-0 pa-0">
            <v-col cols="12" sm="10">
              <v-form ref="form" lazy-validation @submit.prevent="validateBeforeSubmit" @keyup.enter="validateBeforeSubmit">
                <v-row dense class="mb-4">
                  <v-text-field
                    ref="usernameInput"
                    v-model="user.login"
                    :label="$t('login.username')"
                    :rules="usernameRules"
                    color="secondary"
                  />
                </v-row>
                <v-row dense>
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
                </v-row>
              </v-form>
            </v-col>
          </v-row>
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
    validateBeforeSubmit () {
      // validate form
      if (!this.$refs.form.validate()) {
        return
      }
      this.loading = true
      this.resetPassword(this.user.login)
      this.loading = false
    }
  }
}
</script>
