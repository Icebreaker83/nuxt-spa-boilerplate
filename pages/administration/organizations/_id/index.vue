<template>
  <v-container fluid>
    <img ref="imgToExport" class="p-1" src="~@/assets/images/grb.svg" style="display:none">
    <v-card flat class="mb-2">
      <v-card-title class="subheading-label">
        {{ $t('organization.details.legalEntityInfo') }}
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row v-if="organization.status===3" no-gutters>
            <v-col cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('organization.details.canceledUserName') }}
              </p>
              <p class="details-label">
                {{ organization.cancelledUserName }}
              </p>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('organization.details.canceledDate') }}
              </p>
              <p class="details-label">
                {{ formatShortDate(organization.cancelledDate) }}
              </p>
            </v-col>
          </v-row>
          <v-row v-if="organization.status===2" no-gutters>
            <v-col cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('organization.id') }}
              </p>
              <p class="details-label">
                {{ organization.id }}
              </p>
            </v-col>
          </v-row>
          <v-row v-else no-gutters>
            <v-col cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('organization.id') }}
              </p>
              <p class="details-label">
                {{ organization.id }}
              </p>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('organization.details.createdDate') }}
              </p>
              <p class="details-label">
                {{ formatShortDate(organization.createdDate) }}
              </p>
            </v-col>
          </v-row>
          <v-row v-if="organization.status===2" no-gutters>
            <v-col cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('organization.details.createdDate') }}
              </p>
              <p class="details-label">
                {{ formatShortDate(organization.createdDate) }}
              </p>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('organization.details.approvedDate') }}
              </p>
              <p class="details-label">
                {{ formatShortDate(organization.approvedDate) }}
              </p>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('organization.name') }}
              </p>
              <p class="details-label">
                {{ organization.name }}
              </p>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('organization.address') }}
              </p>
              <p class="details-label">
                {{ organization.address }}
              </p>
            </v-col>
          </v-row>
          <v-row v-if="organization.status===1" no-gutters>
            <v-col cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('register.organization.editRegistrationToken') }}
              </p>
              <p class="details-label">
                {{ organization.registrationToken }}
              </p>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('organization.budgetUserId') }}
              </p>
              <p class="details-label">
                {{ organization.budgetUserId }}
              </p>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('organization.companyNumber') }}
              </p>
              <p class="details-label">
                {{ organization.companyNumber }}
              </p>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('organization.taxIdNumber') }}
              </p>
              <p class="details-label">
                {{ organization.taxIdNumber }}
              </p>
            </v-col>
          </v-row>
          <v-row v-if="organization.status && organization.status===1" no-gutters>
            <v-spacer />
            <v-btn
              label
              class="text-none"
              color="success"
              :class="{'disable-events': !organization.registrationToken}"
              @click="printRegistration()"
            >
              {{ $t('register.organization.printForm') }}
            </v-btn>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <v-row class="mb-2">
      <v-divider color="secondary.base" />
    </v-row>
    <v-card class="mb-2" flat>
      <v-card-title v-if="organization.status===1" class="subheading-label">
        {{ $t('organization.details.activationHeading') }}
      </v-card-title>
      <v-card-title v-else class="subheading-label">
        {{ $t('register.organization.adminInfo') }}
      </v-card-title>
      <v-card-text v-if="organization.status===1">
        <v-form ref="form" v-model="formValid" lazy-validation>
          <v-container fluid>
            <v-row no-gutters>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="organization.adminLogin"
                  class="ma-0 pt-2 required default-text"
                  :label="$t('general.userLogin')"
                  color="secondary lighten-3"
                  :rules="adminLoginRules"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="6" md="4">
                <p class="details-label-caption">
                  {{ $t('general.nameAndSurname') }}
                </p>
                <p class="details-label">
                  {{ organization.adminName }}
                </p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="6" md="4">
                <p class="details-label-caption">
                  {{ $t('general.email') }}
                </p>
                <p class="details-label">
                  {{ organization.adminEmail }}
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-text v-else>
        <v-container fluid>
          <v-row no gutters>
            <v-col v-if="organization.adminLogin" cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('general.userLogin') }}
              </p>
              <p class="details-label">
                {{ organization.adminLogin }}
              </p>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('general.nameAndSurname') }}
              </p>
              <p class="details-label">
                {{ organization.adminName }}
              </p>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <p class="details-label-caption">
                {{ $t('general.email') }}
              </p>
              <p class="details-label">
                {{ organization.adminEmail }}
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <v-row>
      <v-divider color="secondary.base" />
    </v-row>
    <v-row v-if="organization.status===1">
      <v-spacer />
      <v-btn
        label
        dark
        :loading="loading"
        class="text-none ma-2"
        color="save_btn_color"
        @click="approveRegistration()"
      >
        {{ $t('organization.details.approveRegistration') }}
      </v-btn>
      <v-btn
        label
        dark
        class="text-none ma-2"
        color="cancel_btn_color"
        :class="{'disable-events': !organization.id}"
        @click="cancelRegistration.enabled = true"
      >
        {{ $t('organization.details.cancelRegistration') }}
      </v-btn>
    </v-row>
    <!-- Cancel registration prompt -->
    <v-dialog v-model="cancelRegistration.enabled" max-width="550px">
      <v-card class="pa-2">
        <v-card-title>
          <p class="subheading-label">
            {{ $t('organization.details.cancelRegistrationPrompt') }}
          </p>
        </v-card-title>
        <v-card-actions>
          <v-btn
            class="text-none"
            color="save_btn_color"
            :loading="cancelRegistration.loading"
            @click="CancelRegistration()"
          >
            {{ $t('form.save') }}
          </v-btn>
          <v-btn
            class="text-none"
            color="cancel_btn_color"
            @click="cancelRegistration.enabled=false"
          >
            {{ $t('form.cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import Vue from 'vue'
// import { hasPermissionChangeAuthority } from '@/router/auth.js'
// import { validationMixin } from '@/mixins/validation'
export default {
  // mixins: [validationMixin],
  data () {
    return {
      organization: {},
      loading: false,
      formValid: true,
      cancelRegistration: {
        enabled: false,
        loading: false
      },
      /* proveriti sta vraca sa API za disabled, posto za revoked vraca 4 a ne 3 */
      OrganizationStatus: {
        PENDING: 1,
        APPROVED: 2,
        CANCELED: 3
      },
      status: [
        {
          color: '#757575',
          text: this.$t('organization.statuses.1')
        },
        {
          color: '#4caf50',
          text: this.$t('organization.statuses.2')
        },
        {
          color: '#ff5252',
          text: this.$t('organization.statuses.3')
        }
      ],
      adminLoginRules: [
        v => !!v || this.$t('validation.usernameRequired'),
        v => !/[^A-Za-z0-9_.]/.test(v) || this.$t('validation.usernameSpecChar'),
        v => (v && v.length >= 4) || this.$t('validation.usernameTooShort'),
        v => (v && v.length <= 32) || this.$t('validation.usernameTooLong')
      ]
    }
  },
  created () {
    // get organization information by id
    this.$axios.get(`${Vue.$apiConfig.getOrganizationById}/${this.$route.params.id}`).then(
      (response) => {
        this.organization = response.data.payload
      }).catch(() => {
      this.$toast.error(this.$t('restMessages.error.getOrganization'))
    })
  },
  methods: {
    printRegistration () {
      this.exportRegistration(this.organization, this.$refs.imgToExport)
    },
    approveRegistration () {
      if (!this.$refs.form.validate()) {
        return
      }
      const admin = {
        id: this.organization.id,
        adminLogin: this.organization.adminLogin,
        adminName: this.organization.adminName,
        adminEmail: this.organization.adminEmail
      }
      this.loading = true
      this.$axios.post(Vue.$apiConfig.approveOrganizationRegistration, admin).then(
        (response) => {
          this.organization.approvedDate = response.data.payload.approvedDate
          this.organization.approvedUserName = response.data.payload.approvedUserName
          this.organization.status = response.data.payload.status
          this.organization.adminLogin = response.data.payload.adminLogin
          this.$toast.success(this.$t('restMessages.success.approveOrganizationRegistration'))
        }).catch(() => {
        this.$toast.error(this.$t('restMessages.error.approveOrganizationRegistration'))
      }).finally(() => {
        this.loading = false
      })
    },
    CancelRegistration () {
      this.cancelRegistration.loading = true
      this.$axios.post(Vue.$apiConfig.cancelRegistration, { Id: this.organization.id }).then(
        (response) => {
          this.organization.cancelledDate = response.data.payload.cancelledDate
          this.organization.cancelledUserName = response.data.payload.cancelledUserName
          this.organization.status = response.data.payload.status
          this.organization.registrationToken = null
          this.organization.adminLogin = null
          this.$toast.success(this.$t('restMessages.success.cancelOrganizationRegistration'))
        }).catch(() => {
        this.$toast.error(this.$t('restMessages.error.cancelOrganizationRegistration'))
      }).finally(() => {
        this.cancelRegistration.loading = false
        this.cancelRegistration.enabled = false
      })
    }
  }
}
</script>
