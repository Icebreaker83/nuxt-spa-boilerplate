<template>
  <v-card class="pb-1" rounded>
    <v-card-title class="justify-center">
      {{ $t('login.title') }}
    </v-card-title>
    <v-card-text>
      <v-row justify="center" class="ma-0 pa-0">
        <v-col cols="12" sm="10">
          <v-form ref="form" lazy-validation @submit.prevent="validateBeforeSubmit" @keyup.enter="validateBeforeSubmit">
            <v-row dense class="mb-2">
              <v-text-field
                ref="usernameInput"
                v-model="user.login"
                :label="$t('login.username')"
                color="secondary"
                class="required"
                :rules="usernameRules"
              />
            </v-row>
            <v-row dense class="mb-2">
              <v-text-field
                v-model="user.password"
                type="password"
                :label="$t('login.password')"
                color="secondary"
                class="required"
                :rules="passwordRules"
              />
            </v-row>
            <v-row dense class="mb-2">
              <v-btn
                color="secondary"
                type="submit"
                :loading="loading"
                :class="{'disable-events': loading}"
                block
                rounded
                class="text-none body-2"
              >
                {{ $t('form.submit') }}
              </v-btn>
            </v-row>
          </v-form>
          <v-row dense class="mb-2">
            <v-btn
              outlined
              color="secondary"
              block
              rounded
              class="text-none body-2"
              :to="{name: 'login-initial'}"
            >
              {{ $t('login.firstTime.title') }}
            </v-btn>
          </v-row>
          <v-row dense justify="space-between">
            <v-btn
              small
              text
              color="secondary"
              class="text-none"
              to="/register"
            >
              {{ $t('login.register') }}
            </v-btn>
            <v-btn
              small
              text
              color="secondary"
              class="text-none"
            >
              {{ $t('login.forgottenPassword') }}
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import shared from '~/mixins/shared'

export default {
  mixins: [shared],
  data () {
    return {
      loading: false,
      user: {
        login: '',
        password: ''
      },
      usernameRules: [
        v => !!v || `${this.$t('login.username')} ${this.$t('validation.fieldRequired')}`,
        v => !/[^A-Za-z0-9_.]/.test(v) || `${this.$t('login.username')} ${this.$t('validation.specialCharsNotAllowed')}`
      ],
      passwordRules: [
        v => !!v || `${this.$t('login.password')} ${this.$t('validation.fieldRequired')}`,
        v => !/[^A-Za-z0-9_.@!]/.test(v) || `${this.$t('login.password')} ${this.$t('validation.specialCharsNotAllowed')}`
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
      // enable loading animation on submit btn
      this.loading = true
      // login
      this.login({ login: this.user.login, password: this.user.password })
      // disable loading animation on submit btn
      this.loading = false
    }
  }
}
</script>
