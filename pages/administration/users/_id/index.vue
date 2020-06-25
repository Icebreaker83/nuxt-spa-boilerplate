<template>
  <v-container fluid>
    <!-- User info -->
    <v-card flat class="mb-2">
      <v-card-text v-if="!editUser.enabled">
        <v-row dense>
          <v-col cols="12" sm="6" md="4">
            <p class="details-label-caption">
              {{ $t('users.details.userLogin') }}
            </p>
            <p>
              {{ user.login }}
            </p>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <p class="details-label-caption">
              {{ $t('users.details.nameAndSurname') }}
            </p>
            <p v-if="user.name" class="details-label">
              {{ user.name }}
            </p>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" sm="6" md="4">
            <p class="details-label-caption">
              {{ $t('users.details.email') }}
            </p>
            <p v-if="user.email" class="details-label">
              {{ user.email }}
            </p>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <p class="details-label-caption">
              {{ $t('users.details.userGroups') }}
            </p>
            <p v-if="user.groupName" class="details-label">
              {{ user.groupName }}
            </p>
          </v-col>
        </v-row>
      </v-card-text>
      <!-- Edit user info -->
      <v-card-text v-else>
        <v-form ref="userForm" v-model="userFormValid" lazy-validation>
          <v-row dense>
            <v-col cols="12" sm="6" md="4">
              <!-- text color of v-text-field has to be set by css class
            because at this point in time color could not be set with props.
            customProperties option of theme creates css variables for all colors defined in theme
            and color of input is set with it-->
              <v-text-field
                v-model="editUser.name"
                class="details-label required default-text"
                :label="$t('users.details.nameAndSurname')"
                :rules="nameRules"
                color="secondary lighten-3"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editUser.email"
                class="details-label required default-text"
                :label="$t('users.details.email')"
                :rules="emailRules"
                color="secondary lighten-3"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="editUser.groupId"
                class="ma-0 pt-2 required"
                :items="allGroups"
                item-text="name"
                item-value="id"
                :label="$t('users.details.userGroups')"
                color="secondary lighten-3"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions v-if="!editUser.enabled && user.status===UserStatus.ACTIVE" class="pt-0">
        <v-btn class="text-none" color="secondary lighten-1" @click="enableEditUser">
          {{ $t('form.edit') }}
        </v-btn>
      </v-card-actions>
      <v-card-actions v-if="editUser.enabled && user.status===UserStatus.ACTIVE" class="pt-0">
        <v-btn class="text-none" :loading="editUser.loading" color="save_btn_color" @click="validateUserForm">
          {{ $t('form.save') }}
        </v-btn>
        <v-btn class="text-none" color="cancel_btn_color" @click="editUser.enabled = false">
          {{ $t('form.cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- User revoked info -->
    <v-card v-if="user.status===UserStatus.REVOKED" flat class="mb-2">
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="4">
            <p class="details-label-caption">
              {{ $t('users.details.revokeLogin') }}
            </p>
            <p class="details-label">
              {{ user.changedUserName }}
            </p>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <p class="details-label-caption">
              {{ $t('users.details.revokeDate') }}
            </p>
            <p class="details-label">
              {{ user.lastChangeDate }}
            </p>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <p class="details-label-caption">
              {{ $t('users.details.revokeComment') }}
            </p>
            <p class="details-label">
              {{ user.changedComments }}
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!--  -->
    <v-row>
      <v-divider color="secondary.base" class="mb-2" />
    </v-row>
    <!-- User roles and claims -->
    <v-card flat class="mb-2">
      <v-card-title>
        <p class="subheading-label">
          {{ $t('users.details.rolesAndClaims') }}
        </p>
      </v-card-title>
      <v-card-text v-if="!editRole.enabled">
        <v-row no-gutters>
          <v-col cols="12" lg="5" class="mb-2">
            <v-expansion-panels dark>
              <v-expansion-panel class="mb-3">
                <v-expansion-panel-header color="secondary">
                  <span v-if="user.roleName" class="details-label-caption">{{ user.roleName }}</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content color="secondary">
                  <v-expansion-panels>
                    <v-expansion-panel v-for="claim in user.claims" :key="claim.id">
                      <v-expansion-panel-header color="secondary lighten-1">
                        <span class="details-label-caption">{{ claim.localized_name }}</span>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content color="secondary lighten-2" class="pt-2">
                        <span class="details-label">{{ claim.localized_description }}</span>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card-text>
      <!-- Edit user roles and claims -->
      <v-card-text v-else>
        <v-data-table
          :headers="headers"
          :items="allRoles"
          :expanded.sync="expanded"
          item-key="name"
          show-expand
          single-expand
          hide-default-footer
        >
          <template v-slot:item.selected="{ item }">
            <v-checkbox v-model="item.selected" @click.stop="selectRole(item)" />
          </template>
          <template v-slot:expanded-item="{ item }">
            <td :colspan="headers.length">
              <tr>
                <th>{{ $t('users.details.claims') }}</th>
                <th>{{ $t('users.details.claimDescription') }}</th>
              </tr>
              <tr v-for="claim in item.claims" :key="claim.id" class="details-label ma-2">
                <td>{{ claim.localized_name }}</td>
                <td>{{ claim.localized_description }}</td>
              </tr>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions v-if="!editRole.enabled && user.status===UserStatus.ACTIVE">
        <v-btn class="text-none" dark color="secondary lighten-1" @click="editRole.enabled = true">
          {{ $t('form.edit') }}
        </v-btn>
      </v-card-actions>
      <v-card-actions v-if="editRole.enabled && user.status===UserStatus.ACTIVE">
        <v-btn class="text-none" dark color="save_btn_color" @click="editUserRole">
          {{ $t('form.save') }}
        </v-btn>
        <v-btn class="text-none" dark color="cancel_btn_color" @click="editRole.enabled = false">
          {{ $t('form.cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <!--  -->
    <v-row>
      <v-divider color="secondary.base" class="mb-2" />
    </v-row>
    <!-- User accounts -->
    <v-card flat class="mb-2">
      <v-card-title>
        <p class="subheading-label">
          {{ $t('users.details.userAccounts') }}
        </p>
      </v-card-title>
      <VueTabulator id="userAccountsManagmentTable" ref="tabulator" v-model="data" :options="tabulatorOptions" :class="{ 'tabulator-xs-paginator': $vuetify.breakpoint.xsOnly }" />
      <v-card-actions>
        <v-btn
          color="secondary lighten-1"
          :class="{'disable-events': loading}"
          :loading="loading"
          class="text-none"
          @click="submitRegisterAccounts"
        >
          {{ $t('account.addUserAccount') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-row>
      <v-divider color="secondary.base" class="mb-2" />
    </v-row>
    <!--  -->
    <!-- Revoke and Activate buttons -->
    <v-row>
      <v-spacer />
      <v-btn
        v-if="user.status === UserStatus.ACTIVE"
        class="text-none mr-4"
        color="error"
        dark
        @click="revokeUserPrompt.enabled = true"
      >
        {{ $t('form.revoke') }}
      </v-btn>
      <v-btn
        v-else=""
        class="text-none mr-4"
        color="success"
        dark
        :loading="activateUser"
        @click="ActivateUser()"
      >
        {{ $t('form.activate') }}
      </v-btn>
    </v-row>
    <!--  Revoke user prompt -->
    <v-dialog v-model="revokeUserPrompt.enabled" max-width="550px">
      <v-card>
        <v-card-title>
          <p class="subheading-label">
            {{ $t('users.details.revokeUserPromptTitle') }}
          </p>
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="newComment"
            filled
            rows="5"
            class="form-control"
            :placeholder="$t('users.details.revokePromptPlaceholder')"
          />
        </v-card-text>
        <v-card-actions class="ml-4">
          <v-btn
            class="text-none"
            color="save_btn_color"
            :loading="revokeUserPrompt.loading"
            :disabled="newComment.length == 0"
            @click="RevokeUser"
          >
            {{ $t('form.save') }}
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon dark>cached</v-icon>
              </span>
            </template>
          </v-btn>
          <v-btn
            class="text-none"
            color="cancel_btn_color"
            @click="revokeUserPrompt.enabled = false"
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
// import ContextPage from '@/components/context-page/ContextPage'
// import { hasPermissionChangeAuthority } from '@/router/auth.js'
// import { EventBus } from '@/router/bus'
// import { chain, groupBy, map } from 'lodash'
import tabulatorMixin from '@/mixins/tabulator'
// import shared from '~/mixins/shared'
// import { EventBus } from '@/router/bus'
// import { hasAdminClaim } from '@/router/auth.js'

export default {
  middleware: 'auth-pages',
  mixins: [tabulatorMixin],
  data () {
    return {
      userId: 0,
      user: {},
      editUser: {
        enabled: false,
        name: '',
        email: '',
        groupId: 0,
        loading: false
      },
      editRole: {
        enabled: false,
        loading: false
      },
      allRoles: [],
      allGroups: [],
      userFormValid: true,
      revokeUserPrompt: {
        enabled: false,
        loading: false
      },
      activateUser: false,
      newComment: '',
      search: '',
      headers: [
        { value: 'data-table-expand', align: 'left', sortable: false, class: 'role-header' },
        { value: 'selected', align: 'left', sortable: false, class: 'role-header' },
        { value: 'name', text: this.$t('users.details.roles'), align: 'left', sortable: false, class: 'role-header' },
        { value: 'description', text: this.$t('users.details.roleDescription'), align: 'left', sortable: false, class: 'role-header' }
      ],
      currentStatus: 1,
      /* proveriti sta vraca sa API za disabled, posto za revoked vraca 4 a ne 3 */
      UserStatus: {
        ACTIVE: 1,
        INACTIVE: 2,
        REVOKED: 4,
        DISABLED: 44444
      },
      status: [
        {
          color: '#4caf50',
          text: this.$t('userStatuses.1')
        },
        {
          color: '#757575',
          text: this.$t('userStatuses.2')
        },
        {
          color: '#ff5252',
          text: this.$t('userStatuses.3')
        },
        {
          color: '#ff5252',
          text: this.$t('userStatuses.4')
        }
      ],
      nameRules: [
        v => !!v || this.$t('validation.nameAndSurnameRequired')
      ],
      emailRules: [
        v => !!v || this.$t('validation.emailRequired'),
        v => /.+@.+\..+/.test(v) || this.$t('validation.emailRequired')
      ],
      expanded: [],
      availableRoles: [],
      data: [],
      loader: false,
      loading: false,
      tabulatorOptions: {
        ajaxURL: `${Vue.$apiConfig.getPagedApprovedUserAccounts}/${this.$route.params.id}`,
        columns: [
          { title: 'Id', field: 'id', visible: false },
          // {
          //   formatter: 'rowSelection',
          //   titleFormatter: 'rowSelection',
          //   minWidth: 75,
          //   width: 75,
          //   align: 'center',
          //   headerSort: false,
          //   cellClick: function (e, cell) {
          //     cell.getRow().toggleSelect()
          //   }
          // },
          { title: this.$t('account.name'), hozAlign: 'left', field: 'name', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          { title: this.$t('account.bank'), hozAlign: 'center', field: 'bank', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          { title: this.$t('account.accountNumber'), hozAlign: 'center', field: 'accountNumber', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          { title: this.$t('account.accountControlNumber'), hozAlign: 'center', field: 'accountControlNumber', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          {
            title: this.$t('account.status'),
            hozAlign: 'center',
            field: 'userAccountStatus',
            formatter: (cell, formatterParams, onRendered) => {
              const status = cell.getValue()
              if (status === 1) {
                return '<span class="status-active-span">' + this.$t('userAccount.statusCode.' + status) + '</span>'
              }
              // return '<span class="status-revoked-span">' + this.$t('account.statusCode.' + status) + '</span>'
            },
            headerFilter: this.vStatusSelect,
            headerFilterParams: {
              items: [
                { text: this.$t('account.statusCode.1'), value: '1' }
              ]
            }
          }
        ]
      }
    }
  },
  created () {
    this.userId = this.$route.params.id
    this.loading = true
    const self = this
    // get user information by id
    this.$axios.get(`${Vue.$apiConfig.getUserInformationById}/${this.userId}`).then((response) => {
      this.user = response.data.payload
      // get all roles and set selected for the role that user has
      this.$axios.get(Vue.$apiConfig.getAllUserRoles).then((response) => {
        self.allRoles = response.data.payload
        self.allRoles.forEach((role) => {
          // role.localized_name = role.name.substring(5, role.name.length)
          role.claims.forEach((claim) => {
            claim.localized_name = this.$t('claims.' + claim.name)
            claim.localized_description = this.$t('claims.' + claim.name + '_Description')
          })
          if (role.id === this.user.roleId) {
            Vue.set(role, 'selected', true)
            Vue.set(this.user, 'claims', role.claims)
          } else {
            Vue.set(role, 'selected', false)
          }
        })
      }).catch(() => {
        this.$toast.error(this.$t('restMessages.error.getRoles'))
      })
      // get all groups and set selected for the group that user has
      this.$axios.get(Vue.$apiConfig.getAllUserGroups).then(
        (response) => {
          self.allGroups = response.data.payload
          self.allGroups.forEach((group) => {
            Vue.set(group, 'selected', group.id === this.user.groupId)
          })
        }).catch(() => {
        this.$toast.error(this.$t('restMessages.error.getGroups'))
      })
    }).catch(() => {
      this.$toast.error(this.$t('restMessages.error.getUser'))
    }).finally(() => {
      self.loading = false
    })
  },
  methods: {
    selectRole (selectedRole) {
      this.allRoles.forEach((role) => {
        (selectedRole.id === role.id) ? role.selected = true : role.selected = false
      })
    },
    enableEditUser () {
      this.editUser.name = this.user.name
      this.editUser.email = this.user.email
      this.editUser.groupId = this.user.groupId
      this.editUser.enabled = true
    },
    validateUserForm () {
      if (this.$refs.userForm.validate()) {
        this.editProfile()
      }
    },
    editProfile () {
      this.editUser.loading = true
      const requestBody = {
        id: this.user.id,
        name: this.editUser.name,
        email: this.editUser.email,
        groupId: this.editUser.groupId
      }
      this.$axios.post(Vue.$apiConfig.updateUserInformation, requestBody).then(
        (response) => {
          this.user.name = response.data.payload.name
          this.user.email = response.data.payload.email
          this.user.groupId = response.data.payload.groupId
          this.user.groupName = this.allGroups.filter(group => group.id === response.data.payload.groupId)[0].name
          this.$toast.success(this.$t('restMessages.success.editUser'))
        }).catch(() => {
        this.$toast.error(this.$t('restMessages.error.editUser'))
      }).finally(() => {
        this.editUser.loading = false
        this.editUser.enabled = false
      })
    },
    editUserRole () {
      this.editRole.loading = true
      const selectedRole = this.allRoles.filter(role => role.selected === true)[0]
      const requestBody = {
        id: this.user.id,
        roleName: selectedRole.name
      }
      this.$axios.post(Vue.$apiConfig.updateUserPermissions, requestBody).then(
        (response) => {
          this.user.roleId = selectedRole.id
          this.user.roleName = selectedRole.name
          this.user.claims = selectedRole.claims
          this.$toast.success(this.$t('restMessages.success.changeUsersRole'))
        }).catch(() => {
        this.$toast.error(this.$t('restMessages.error.changeUsersRole'))
      }).finally(() => {
        this.editRole.loading = false
        this.editRole.enabled = false
      })
    },
    submitRegisterAccounts () {
      const rows = this.$refs.tabulator.getInstance().getSelectedRows()
      const userAccounts = { userId: parseInt(this.userId) }
      if (rows !== undefined && rows !== null) {
        const accounts = []
        this.token = null
        for (let i = 0; i < rows.length; i++) {
          const rowData = rows[i].getData()
          accounts.push({ id: rowData.id })
        }
        userAccounts.accounts = accounts
        this.loading = true
        this.$axios.post(Vue.$apiConfig.registerUserAccounts, userAccounts)
          .then((response) => {
            // this.submittedAccounts = response.data.payload
            // this.validateAccountsDialog = true
            this.$toast.success(this.$t('restMessages.success.accountRegister'))
            // this.$refs.tabulator.getInstance().setFilter('userAccountStatus', '=', 1)
          }).catch(() => {
            this.$toast.error(this.$t('restMessages.error.accountRegister'))
          }).finally(() => {
            this.loading = false
          })
      }
    },
    RevokeUser () {
      this.revokeUserPrompt.loading = true
      const requestBody = [{
        UserId: this.user.id,
        ChangedComments: this.newComment
      }]
      this.$axios.post(Vue.$apiConfig.revokeUser, requestBody)
        .then((response) => {
          this.user.status = response.data.payload[0].status
          this.user.changedComments = response.data.payload[0].changedComments
          this.user.changedUserName = response.data.payload[0].changedUserName
          this.$toast.success(this.$t('restMessages.success.revokeUser'))
        }).catch(() => {
          this.$toast.error(this.$t('restMessages.error.revokeUser'))
        }).finally(() => {
          this.revokeUserPrompt.loading = false
          this.revokeUserPrompt.enabled = false
        })
    },
    ActivateUser () {
      this.activateUser = true
      const requestBody = [{
        UserId: this.user.id,
        ChangedComments: 'ACTIVATE'
      }]
      this.$axios.post(Vue.$apiConfig.activateUser, requestBody)
        .then((response) => {
          this.user.status = response.data.payload[0].status
          this.$toast.success(this.$t('restMessages.success.activateUser'))
        }).catch(() => {
          this.$toast.error(this.$t('restMessages.error.activateUser'))
        }).finally(() => {
          this.activateUser = false
        })
    }
  }
}
</script>

<style scoped>
  .v-card__text {
    font-size: 15px
  }
  .user-info-type {
    font-size: 16px
  }
  .user-info {
    font-size: 16px;
    font-weight: 600
  }

  .container >>> .role-header {
    background-color: var(--v-secondary-base);
    font-size: 16px;
  }
</style>
