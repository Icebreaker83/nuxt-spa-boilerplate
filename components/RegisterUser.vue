<template>
  <v-card rounded>
    <v-card-title class="justify-center">
      {{ $t('register.title') }}
    </v-card-title>
    <v-card-text>
      <v-form ref="form" lazy-validation @submit.prevent="register" @keyup.enter="register">
        <v-card-subtitle class="pb-0 mb-0">
          {{ $t('register.user.title') }}
        </v-card-subtitle>
        <v-container class="ml-2">
          <v-row v-if="options.username" dense>
            <v-col cols="12" sm="6">
              <v-text-field
                ref="usernameInput"
                v-model="user.username"
                :label="$t('register.user.username')"
                color="secondary"
                class="required"
                :rules="usernameRules"
              />
            </v-col>
          </v-row>
          <v-row v-if="options.email" dense>
            <v-col cols="12" sm="6">
              <v-text-field
                ref="emailInput"
                v-model="user.email"
                :label="$t('register.user.email')"
                color="secondary"
                class="required"
                :rules="emailRules"
              />
            </v-col>
          </v-row>
          <v-row v-if="options.password" dense>
            <v-col cols="12" sm="6">
              <v-text-field
                ref="passwordInput"
                v-model="user.password"
                type="password"
                :label="$t('register.user.password')"
                color="secondary"
                class="required"
                :rules="passwordRules"
              />
            </v-col>
          </v-row>
          <v-row v-if="options.password" dense>
            <v-col cols="12" sm="6">
              <v-text-field
                ref="confirmPasswordInput"
                v-model="user.confirmPassword"
                type="password"
                :label="$t('register.user.confirmPassword')"
                color="secondary"
                class="required"
                :rules="passwordRules"
              />
            </v-col>
          </v-row>
          <v-divider />
        </v-container>
        <v-card-subtitle class="pb-0 mb-0">
          {{ $t('register.personal.title') }}
        </v-card-subtitle>
        <v-container class="ml-2">
          <v-row v-if="options.firstname || options.lastname" dense>
            <v-col v-if="options.firstname" cols="12" sm="6">
              <v-text-field
                ref="firstnameInput"
                v-model="user.firstname"
                :label="$t('register.personal.firstname')"
                color="secondary"
                class="required"
                :rules="firstnameRules"
              />
            </v-col>
            <v-col v-if="options.lastname" cols="12" sm="6">
              <v-text-field
                ref="lastnameInput"
                v-model="user.lastname"
                :label="$t('register.personal.lastname')"
                color="secondary"
                class="required"
                :rules="lastnameRules"
              />
            </v-col>
          </v-row>
          <v-row v-if="options.phone" dense>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.phone"
                :label="$t('register.personal.phone')"
                color="secondary"
                class="required"
                :rules="phoneRules"
              />
            </v-col>
          </v-row>
          <v-divider />
        </v-container>
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
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          username: true,
          password: true,
          firstname: true,
          lastname: true,
          email: true,
          phone: true,
          address1: true
        }
      }
    }
  },
  data () {
    return {
      loading: false,
      user: {
        username: '',
        name: '',
        surname: '',
        password: '',
        email: '',
        phone: '',
        address1: ''
      },
      usernameRules: [
        v => !!v || `${this.$t('register.user.username')} ${this.$t('validation.fieldRequired')}`,
        v => !/[^A-Za-z0-9_.]/.test(v) || `${this.$t('register.user.username')} ${this.$t('validation.specialCharsNotAllowed')}`,
        v => (v && v.length >= 4) || this.$t('validation.usernameTooShort'),
        v => (v && v.length <= 32) || this.$t('validation.usernameTooLong')
      ],
      passwordRules: [
        v => !!v || `${this.$t('register.user.password')} ${this.$t('validation.fieldRequired')}`,
        v => !/[^A-Za-z0-9_.@!]/.test(v) || `${this.$t('register.user.password')} ${this.$t('validation.specialCharsNotAllowed')}`
      ],
      emailRules: [
        v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || `${this.$t('register.user.email')} ${this.$t('validation.fieldRequired')}`
      ],
      firstnameRules: [
        v => !!v || `${this.$t('register.personal.firstname')} ${this.$t('validation.fieldRequired')}`,
        v => !/[^A-Za-z0-9]/.test(v) || `${this.$t('register.personal.firstname')} ${this.$t('validation.specialCharsNotAllowed')}`
      ],
      lastnameRules: [
        v => !!v || `${this.$t('register.personal.lastname')} ${this.$t('validation.fieldRequired')}`,
        v => !/[^A-Za-z0-9]/.test(v) || `${this.$t('register.personal.lastname')} ${this.$t('validation.specialCharsNotAllowed')}`
      ],
      phoneRules: [
        v => !!v || `${this.$t('register.personal.phone')} ${this.$t('validation.fieldRequired')}`,
        v => !/[^0-9/\\-\\+]/.test(v) || `${this.$t('register.personal.phone')} ${this.$t('validation.specialCharsNotAllowed')}`
      ]
    }
  },
  mounted () {
    console.log(this.$v)
  },
  methods: {
    register () {
    }
  }
}
</script>
