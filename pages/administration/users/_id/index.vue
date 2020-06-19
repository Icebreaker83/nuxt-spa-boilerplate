<template>
  <p>test</p>
</template>
<script>
import Vue from 'vue'
// import ContextPage from '@/components/context-page/ContextPage'
// import { hasPermissionChangeAuthority } from '@/router/auth.js'
// import { EventBus } from '@/router/bus'
// import { chain, groupBy, map } from 'lodash'
import tabulatorMixin from '@/mixins/tabulator'
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
        name: '',
        email: '',
        groupId: 0
      },
      allRoles: [],
      allGroups: [],
      userFormValid: true,
      changeUserInfoEnabled: false,
      changeRoleEnabled: false,
      editUserPrompt: {
        enabled: false,
        loading: false
      },
      editRolePrompt: {
        enabled: false,
        loading: false
      },
      revokeUserPrompt: {
        enabled: false,
        loading: false
      },
      activateUserPrompt: {
        enabled: false,
        loading: false
      },
      newComment: '',
      search: '',
      headers: [
        { value: 'data-table-expand', align: 'left', sortable: false, class: 'role-header' },
        { value: 'selected', align: 'left', sortable: false, class: 'role-header' },
        { value: 'name', text: this.$t('profile.roles'), align: 'left', sortable: false, class: 'role-header' },
        { value: 'description', text: this.$t('profile.roleDescription'), align: 'left', sortable: false, class: 'role-header' }
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
        v => !!v || this.$t('validation.nameRequired')
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
        ajaxURL: `${this.$axios.defaults.baseURL}${Vue.$apiConfig.getPagedApprovedUserAccounts}/${this.$route.params.id}`,
        columns: [
          { title: 'Id', field: 'id', visible: false },
          { title: this.$t('account.name'), align: 'left', field: 'name', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          { title: this.$t('account.bank'), align: 'center', field: 'bank', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          { title: this.$t('account.accountNumber'), align: 'center', field: 'accountNumber', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          { title: this.$t('account.accountControlNumber'), align: 'center', field: 'accountControlNumber', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          {
            title: this.$t('account.status'),
            align: 'center',
            field: 'userAccountStatus',
            formatter: (cell, formatterParams, onRendered) => {
              const status = cell.getValue()
              if (status === 1) {
                return '<span class="status-active-span">' + this.$t('userAccount.statusCode.' + status) + '</span>'
              }
              // return '<span class="status-revoked-span">' + this.$t('account.statusCode.' + status) + '</span>'
            },
            headerFilter: this.vStatusSelect,
            headerFilterParams: { items: [this.$t('account.statusCode.1')] }
          }
        ]
      }
    }
  },
  created () {
    this.userId = this.$route.params.id
    console.log(this.userId)
    // get user information by id
    // this.$http.get(Vue.$apiConfig.getUserInformationById + '/' + this.userId).then(
    //   (response) => {
    //     this.user = response.data.payload
    //     // this.user.isAdmin = hasAdminClaim
    //     // get all roles and set selected for the role that user has
    //     this.$http.get(Vue.$apiConfig.getAllUserRoles).then(
    //       (response) => {
    //         this.allRoles = response.data.payload
    //         this.allRoles.forEach((role) => {
    //           // role.localized_name = role.name.substring(5, role.name.length)
    //           role.claims.forEach((claim) => {
    //             claim.localized_name = this.$t('claims.' + claim.name)
    //             claim.localized_description = this.$t('claims.' + claim.name + '_Description')
    //           })
    //           if (role.id === this.user.roleId) {
    //             Vue.set(role, 'selected', true)
    //             Vue.set(this.user, 'claims', role.claims)
    //           } else {
    //             Vue.set(role, 'selected', false)
    //           }
    //         })
    //       }, (error) => {
    //         this.logConsole(error)
    //       })
    //     // get all groups and set selected for the group that user has
    //     this.$http.get(Vue.$apiConfig.getAllUserGroups).then(
    //       (response) => {
    //         this.allGroups = response.data.payload
    //         this.allGroups.forEach((group) => {
    //           if (group.id === this.user.groupId) {
    //             Vue.set(group, 'selected', true)
    //           } else {
    //             Vue.set(group, 'selected', false)
    //           }
    //         })
    //       }, (error) => {
    //         this.logConsole(error)
    //       })
    //     this.load = false
    //   },
    //   (error) => {
    //     this.logConsole(error)
    //     // EventBus.$emit('alert', {
    //     //   variant: 'error',
    //     //   message: error.data.status.code
    //     // })
    //     this.load = false
    //   }
    // )
  }
}
</script>

<style>
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
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  /* .role-popout {
    background-color: #E0F2F1 !important;
  } */

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .role-header {
    background-color: var(--v-secondary-lighten5) !important;
  }
</style>
