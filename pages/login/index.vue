<template>
  <v-row dense justify="center" align="center" style="height: 100%;">
    <v-col cols="12" sm="6" md="4" lg="3">
      <v-card class="pb-1" rounded>
        <v-card-title class="justify-center">
          {{ $t('login.title') }}
        </v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="validateBeforeLogin" @keyup.enter="validateBeforeLogin">
            <v-row dense justify="center">
              <v-col cols="12" sm="10">
                <v-text-field
                  ref="usernameInput"
                  v-model="user.login"
                  :label="$t('login.username')"
                  color="secondary"
                  class="required"
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
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
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
            <v-row dense>
              <v-col>
                <v-btn
                  outlined
                  color="secondary"
                  block
                  rounded
                  class="text-none body-2"
                  @click="initialLogin"
                >
                  {{ $t('login.firstTime') }}
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
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      user: {
        login: '',
        password: ''
      }
    }
  },
  mounted () {
    console.log(process.env.baseUrl)
  },
  methods: {
    initialLogin () {
    },
    forgottenPassword () {
    },
    async validateBeforeLogin () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            login: this.user.login,
            password: this.user.password
          }
        })
      } catch {
        this.$toast.error('Failed Logging In', { icon: 'error_outline' })
      }
    }
  }
}
</script>
