<template>
  <v-container fluid>
    <v-form ref="form" v-model="formValid" lazy-validation>
      <v-card>
        <v-card-title>
          {{ $t('users.register.title') }}
        </v-card-title>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12" md="4" lg="4">
              <v-text-field
                v-model="user.login"
                class="ma-0 pt-2 required default-text"
                :rules="usernameRules"
                :label="$t('users.register.userLogin')"
                color="secondary lighten-3"
              />
              <!-- <v-text-field class="ma-0 pt-2" v-model="user.LoginAd" :rules="adUserRules" :label="$t('userLoginAd')"
              color="secondary lighten-3" /> -->
              <v-text-field
                v-model="user.name"
                class="ma-0 pt-2 required default-text"
                :rules="nameRules"
                :label="$t('users.register.nameAndSurname')"
                color="secondary lighten-3"
              />
              <v-text-field
                v-model="user.email"
                class="ma-0 pt-2 required default-text"
                :rules="emailRules"
                :label="$t('users.register.email')"
                color="secondary lighten-3"
              />
              <v-select
                v-model="user.roleId"
                class="ma-0 pt-2 required"
                :items="roles"
                :rules="roleRules"
                :label="$t('users.register.role')"
                color="secondary lighten-3"
              />
              <v-select
                v-model="user.groupId"
                class="ma-0 pt-2 required default-text"
                :items="groups"
                :rules="groupRules"
                :label="$t('users.register.group')"
                color="secondary lighten-3"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn class="text-none" :loading="loading" color="save_btn_color" @click="addUser">
            {{ $t('form.submit') }}
          </v-btn>
          <v-btn class="text-none" color="cancel_btn_color" to="/administration/users">
            {{ $t('form.cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>
<script>
import Vue from 'vue'

export default {
  data () {
    return {
      user: {
        login: '',
        // LoginAd: '',
        name: '',
        email: '',
        roleId: '',
        groupId: ''
      },
      roles: [],
      groups: [],
      formValid: true,
      loading: false,
      usernameRules: [
        v => !!v || `${this.$t('users.register.userLogin')} ${this.$t('validation.fieldRequired')}`,
        v => !/[^A-Za-z0-9_.]/.test(v) || this.$t('validation.usernameSpecChar'),
        v => (v && v.length >= 4) || this.$t('validation.usernameTooShort'),
        v => (v && v.length <= 32) || this.$t('validation.usernameTooLong')
      ],
      nameRules: [
        v => !!v || `${this.$t('users.register.nameAndSurname')} ${this.$t('validation.fieldRequired')}`
      ],
      emailRules: [
        v => !!v || `${this.$t('users.register.email')} ${this.$t('validation.fieldRequired')}`,
        v => /.+@.+\..+/.test(v) || `${this.$t('users.register.email')} ${this.$t('validation.fieldRequired')}`
      ],
      roleRules: [
        v => !!v || `${this.$t('users.register.role')} ${this.$t('validation.fieldRequired')}`
      ],
      groupRules: [
        v => !!v || `${this.$t('users.register.group')} ${this.$t('validation.fieldRequired')}`
      ]
    }
  },
  created () {
    this.$axios.get(Vue.$apiConfig.getAllUserRoles).then(
      (response) => {
        this.roles = response.data.payload.map(role => ({ text: role.name, value: role.id }))
      }).catch(() => {
      this.$toast.error(this.$t('restMessages.error.getRoles'))
    })

    this.$axios.get(Vue.$apiConfig.getAllUserGroups).then(
      (response) => {
        this.groups = response.data.payload.map(group => ({ text: group.name, value: group.id }))
      }).catch(() => {
      this.$toast.error(this.$t('restMessages.error.getGroups'))
    })
  },
  methods: {
    addUser () {
      if (!this.$refs.form.validate()) {
        return
      }
      this.loading = true
      this.$axios.post(Vue.$apiConfig.addUser, [this.user]).then(
        (responese) => {
          this.$toast.success(this.$t('restMessages.success.createUser'))
        }).catch(() => {
        this.$toast.error(this.$t('restMessages.error.createUser'))
      }).finally(() => {
        this.loading = false
        this.$router.push('/administration/users')
      })
    }
  }
}
</script>

<style>
  .v-label {
    font-size: 15px !important;
  }
  .v-input__slot {
    margin-bottom: 0px !important;
  }
  .v-card__text {
    font-size: 20px;
  }
</style>
