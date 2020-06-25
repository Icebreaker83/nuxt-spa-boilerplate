<template>
  <v-card rounded>
    <v-tabs
      v-model="model"
      :grow="true"
      background-color="primary"
      slider-color="secondary"
      dark
    >
      <v-tab href="#tab-1" class="body-2 text-none">
        {{ $t('login.multi.title1') }}
      </v-tab>

      <v-tab href="#tab-2" class="body-2 text-none">
        {{ $t('login.multi.title2') }}
      </v-tab>

      <v-tab-item :value="'tab-1'">
        <v-card tile>
          <v-card-text class="pa-0">
            <v-row justify="center" class="ma-0 pa-0">
              <v-col cols="12" sm="10">
                <v-form ref="form" @submit.prevent="validateBeforeSubmit('trezor')" @keyup.enter="validateBeforeSubmit('trezor')">
                  <v-row dense>
                    <v-text-field
                      ref="usernameInput"
                      v-model="user.login"
                      class="required"
                      :label="$t('login.username')"
                      :rules="usernameRules"
                      color="primary"
                    />
                  </v-row>
                  <v-row dense class="mb-4">
                    <v-text-field
                      v-model="user.password"
                      type="password"
                      class="required"
                      :label="$t('login.password')"
                      :rules="passwordRules"
                      color="primary"
                    />
                  </v-row>
                  <v-row dense class="mb-2">
                    <v-btn
                      color="primary"
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
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item :value="'tab-2'">
        <v-card tile class="pb-6">
          <v-card-text class="pa-0">
            <v-row justify="center" class="ma-0 pa-0">
              <v-col cols="12" sm="10">
                <v-form ref="form" @submit.prevent="validateBeforeSubmit()" @keyup.enter="validateBeforeSubmit()">
                  <v-row dense>
                    <v-text-field
                      ref="usernameInput"
                      v-model="user.login"
                      class="required"
                      :label="$t('login.username')"
                      :rules="usernameRules"
                      color="primary"
                    />
                  </v-row>
                  <v-row dense class="mb-4">
                    <v-text-field
                      v-model="user.password"
                      type="password"
                      class="required"
                      :label="$t('login.password')"
                      :rules="passwordRules"
                      color="primary"
                    />
                  </v-row>
                  <v-row dense class="mb-2">
                    <v-btn
                      color="primary"
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
                    color="primary"
                    block
                    rounded
                    class="text-none body-2"
                    to="/login/initial"
                  >
                    {{ $t('login.firstTime.title') }}
                  </v-btn>
                </v-row>
                <v-row dense>
                  <v-btn
                    small
                    text
                    color="secondary"
                    class="text-none mr-6"
                    absolute
                    right
                    to="/login/password-reset"
                  >
                    {{ $t('login.forgottenPassword') }}
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import Vue from 'vue'
import shared from '~/mixins/shared'

export default {
  mixins: [shared],
  data () {
    return {
      loading: false,
      model: 'tab-2',
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
    validateBeforeSubmit (loginType = 'standard') {
      // validate form
      if (!this.$refs.form.validate()) {
        return
      }
      // enable loading animation on submit btn
      this.loading = true
      // determine login api path
      switch (loginType) {
        case 'trezor':
          // in nuxt.config.js default login url is set to standard path (Vue.$apiConfig.login)
          this.$auth.strategies.customStrategy.options.endpoints.login.url = Vue.$apiConfig.loginLdap
          break
        default:
          this.$auth.strategies.customStrategy.options.endpoints.login.url = Vue.$apiConfig.login
      }
      // login
      this.login({ login: this.user.login, password: this.user.password })
      // disable loading animation on submit btn
      this.loading = false
    }
  }
}
</script>
