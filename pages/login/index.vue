<template>
  <v-row dense justify="center" align="center" style="height: 100%;">
    <v-col cols="12" sm="6" md="4" lg="3">
      <v-card class="pb-1" rounded>
        <v-card-title class="justify-center">
          {{ $t('login.title') }}
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation @submit.prevent="login" @keyup.enter="login">
            <v-row dense justify="center">
              <v-col cols="12" sm="10">
                <v-text-field
                  ref="usernameInput"
                  v-model="user.login"
                  :label="$t('login.username')"
                  color="secondary"
                  class="required"
                  :rules="usernameRules"
                />
              </v-col>
            </v-row>
            <v-row dense justify="center">
              <v-col cols="12" sm="10">
                <v-text-field
                  v-model="user.password"
                  type="password"
                  :label="$t('login.password')"
                  color="secondary"
                  class="required"
                  :rules="passwordRules"
                />
              </v-col>
            </v-row>
            <v-row dense justify="center">
              <v-col cols="12" sm="10">
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
              </v-col>
            </v-row>
          </v-form>
          <v-row dense justify="center">
            <v-col cols="12" sm="10">
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
            </v-col>
          </v-row>
          <v-row>
            <!-- <v-spacer /> -->
            <v-col>
              <v-btn
                small
                text
                absolute
                right
                color="secondary"
                class="text-none"
                @click="forgottenPassword"
              >
                {{ $t('login.forgottenPassword') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
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
    initialLogin () {
    },
    forgottenPassword () {
    },
    login () {
      // validate form
      if (!this.$refs.form.validate()) {
        return
      }
      // try to login
      this.$auth.loginWith('customStrategy', {
        data: {
          login: this.user.login,
          password: this.user.password
        }
      }).then((response) => {
        // get decoded access token
        const decodedToken = jwtDecode(this.$auth.getToken(this.$auth.strategy.name))
        // commit token expiration date to localStorage
        this.$store.commit('security/SET_EXPIRATION_DATE', decodedToken.exp)
        // display welcome message
        this.$toast.success(`${this.$t('login.welcomeMessage')} ${this.$auth.user.login}`)
      }).catch((error) => {
        console.log(error.response)
        // display wrong username/password or default error message
        // if error.response = undefined, that means that connection to backend was refused and default message is displayed
        // if error status code is not defined in i18n file default message is displayed
        const errorMessage = (error.response) ? this.$t(`login.errors.${error.response.status}`) || this.$t('login.errors.default') : this.$t('login.errors.default')
        this.$toast.error(errorMessage)
      })
    }
  }
}
</script>
