<template>
  <sidebar-menu
    :menu='menu'
    @toggle-collapse='onToggleCollapse'
    :collapsed='this.$vuetify.breakpoint.xsOnly ? false : collapsed'
    theme='white-theme'
    :width='menuWidth + "px"'
  >
    <v-icon slot='dropdown-icon' style='display: none'>{{$vuetify.icons.expand}}</v-icon>
    <template v-if='this.$vuetify.breakpoint.xsOnly' slot='toggle-icon'>
      <v-icon>mdi-chevron-double-up</v-icon>
    </template>
    <template v-if='collapsed && !this.$vuetify.breakpoint.xsOnly' slot='toggle-icon'>
      <v-icon color='sidebar_icon_color'>mdi-chevron-double-right</v-icon>
    </template>
    <template v-if='!collapsed && !this.$vuetify.breakpoint.xsOnly' slot='toggle-icon'>
      <v-icon color='sidebar_icon_color'>mdi-chevron-double-left</v-icon>
    </template>
  </sidebar-menu>
</template>

<script>
// import { isUserActive, hasAdminClaim, hasRegistrationReviewClaim, hasUserCreateClaim, hasUserReviewClaim, hasPaymentReviewClaim, hasPartnerReviewClaim, hasPartnerRegisterClaim, hasAccountRegisterClaim, hasAccountReviewClaim, hasAccountReviewAllClaim } from '@/router/auth.js'
// import securityStore from '@/store/security-store'
import { SidebarMenu } from 'vue-sidebar-menu'

export default {
  components: {
    SidebarMenu
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    menuWidth: {
      type: String,
      default: '300'
    }
  },
  methods: {
    onToggleCollapse (collapsed) {
      // this.collapsed = collapsed
      this.$emit('onCollapseClick', collapsed)
    }
  },
  computed: {
    isAuth () {
      return securityStore ? securityStore.getters.isAuth && isUserActive() : false
    },
    isAdmin () {
      return hasAdminClaim()
    },
    isUserTypeValid () {
      return securityStore ? securityStore.getters.userType === '0' : false
    },
    canReviewUsers () {
      return hasUserReviewClaim()
    },
    canCreateUser () {
      return hasUserCreateClaim()
    },
    canReviewOrganizations () {
      return hasRegistrationReviewClaim()
    },
    canReviewPayments () {
      return hasPaymentReviewClaim()
    },
    canRegisterPayments () {
      return hasPaymentReviewClaim()
    },
    canReviewPartner () {
      return hasPartnerReviewClaim()
    },
    canRegisterPartner () {
      return hasPartnerRegisterClaim()
    },
    canRegisterAccount () {
      return hasAccountRegisterClaim()
    },
    canReviewAccounts () {
      return hasAccountReviewClaim()
    },
    canReviewAllAccounts () {
      return hasAccountReviewAllClaim()
    },
    menu () {
      return [
        {
          title: 'Dashboard',
          href: { name: 'dashboard' },
          icon: {
            element: 'v-icon',
            text: 'dashboard',
            class: 'material-icons-outlined sidenav-icon'
          }
        },
        ...this.administrationMenu,
        ...this.accountOperatorMenu,
        ...this.accountsAdminMenu,
        ...this.accountsUserMenu,
        ...this.paymentMenu,
        ...this.partnerMenu
      ]
    },
    organizationsMenu () {
      const menuArray = [
        {
          title: this.$t('sidebar.manageOrganizations'),
          href: { name: 'manageOrganizations' }
        }
      ]
      return this.canReviewOrganizations ? menuArray : []
    },
    usersMenu () {
      const menuArray = [
        {
          title: this.$t('sidebar.manageUsers'),
          href: { name: 'manageUsers' }
        }
      ]
      return this.canCreateUser ? menuArray : []
    },
    groupsMenu () {
      const menuArray = [
        {
          title: this.$t('sidebar.manageGroups'),
          href: { name: 'manageGroups' }
        }
      ]
      return menuArray
    },
    rolesMenu () {
      const menuArray = [
        {
          title: this.$t('sidebar.manageRoles'),
          href: { name: 'manageRoles' }
        }
      ]
      return this.canCreateUser ? menuArray : []
    },
    administrationMenu () {
      const menuArray = [
        {
          title: this.$t('sidebar.administration'),
          icon: {
            element: 'v-icon',
            text: 'supervisor_account',
            class: 'material-icons-outlined sidenav-icon'
          },
          child: [...this.organizationsMenu, ...this.usersMenu, ...this.groupsMenu, ...this.rolesMenu]
        }
      ]
      return this.canReviewUsers || this.canCreateUser || this.canReviewOrganizations ? menuArray : []
    },
    accountOperatorMenu () {
      const menuArray = [
        {
          title: this.$t('sidebar.accounts'),
          icon: {
            element: 'v-icon',
            text: 'web_asset',
            class: 'material-icons-outlined sidenav-icon'
          },
          child: [...this.pendingAccountsRequests, ...this.cancelAccountsReguests]
        }
      ]
      return this.canReviewAllAccounts && !this.isAdmin ? menuArray : []
    },
    pendingAccountsRequests () {
      const menuArray = [
        {
          title: this.$t('sidebar.pendingAccountsRequests'),
          href: { name: 'pending-accounts-requests' }
        }
      ]
      return menuArray
    },
    cancelAccountsReguests () {
      const menuArray = [
        {
          title: this.$t('sidebar.cancelAccountsRequests'),
          href: { name: 'cancel-accounts-requests' }
        }
      ]
      return menuArray
    },
    accountsUserMenu () {
      const menuArray = [
        {
          title: this.$t('sidebar.reviewUserAccounts'),
          icon: {
            element: 'v-icon',
            text: 'web_asset',
            class: 'material-icons-outlined sidenav-icon'
          },
          href: { name: 'review-user-accounts' }
        }
      ]
      return this.canReviewAccounts && !this.isAdmin ? menuArray : []
    },
    accountsAdminMenu () {
      const menuArray = [
        {
          title: this.$t('sidebar.accounts'),
          icon: {
            element: 'v-icon',
            text: 'web_asset',
            class: 'material-icons-outlined sidenav-icon'
          },
          child: [...this.userAccountsMenu, ...this.childAccountsMenu, ...this.incomingAccountsMenu]
        }
      ]
      return this.isAdmin ? menuArray : []
    },
    userAccountsMenu () {
      const menuArray = [
        {
          title: this.$t('sidebar.userAccounts'),
          href: { name: 'userAccounts' }
        }
      ]
      return menuArray
    },
    incomingAccountsMenu () {
      const menuArray = [
        {
          title: this.$t('sidebar.incomingAccounts'),
          href: { name: 'incomingAccounts' }
        }
      ]
      return menuArray
    },
    childAccountsMenu () {
      const menuArray = [
        {
          title: this.$t('sidebar.childAccounts'),
          child: [...this.indirectChildAccountsMenu, ...this.treasuryChildAccountsMenu]
        }
      ]
      return this.isUserTypeValid ? menuArray : []
    },
    treasuryChildAccountsMenu () {
      const menuArray = [
        {
          title: this.$t('sidebar.treasuryChildAccounts'),
          href: { name: 'treasuryChildAccounts' }
        }
      ]
      return menuArray
    },
    indirectChildAccountsMenu () {
      const menuArray = [
        {
          title: this.$t('sidebar.indirectChildAccounts'),
          href: { name: 'indirectChildAccounts' }
        }
      ]
      return menuArray
    },
    paymentMenu () {
      const menuArray = [
        {
          title: this.$t('sidebar.payments'),
          icon: {
            element: 'v-icon',
            text: 'payment',
            class: 'material-icons-outlined sidenav-icon'
          },
          child: [
            ...this.paymentOrderReviewMenuItem,
            ...this.newPaymentMenuItem
          ]
        }
      ]
      return this.canRegisterPayments || this.canReviewPayments ? menuArray : []
    },
    paymentOrderReviewMenuItem () {
      const menuArray = [
        {
          title: this.$t('sidebar.reviewPaymentOrders'),
          href: { name: 'reviewPaymentOrders' }
        }
      ]
      return this.canReviewPayments ? menuArray : []
    },
    paymentReviewMenuItem () {
      const menuArray = [
        {
          title: this.$t('sidebar.reviewPayments'),
          href: { name: 'reviewPayments' }
        }
      ]
      return this.canReviewPayments ? menuArray : []
    },
    newPaymentMenuItem () {
      const menuArray = [
        {
          title: this.$t('sidebar.registerPayment'),
          href: { name: 'registerPayment' }
        }
      ]
      return this.canRegisterPayments ? menuArray : []
    },
    partnerMenu () {
      const menuArray = [
        {
          title: this.$t('sidebar.partners'),
          icon: {
            element: 'v-icon',
            text: 'supervisor_account',
            class: 'material-icons-outlined sidenav-icon'
          },
          child: [...this.partnerCreateMenuItem, ...this.partnerReviewMenuItem]
        }
      ]
      return this.canReviewPartner ? menuArray : []
    },
    partnerCreateMenuItem () {
      const menuArray = [
        {
          title: this.$t('sidebar.registerPartner'),
          href: { name: 'registerPartner' }
        }
      ]
      return this.canRegisterPartner ? menuArray : []
    },
    partnerReviewMenuItem () {
      const menuArray = [
        {
          title: this.$t('sidebar.managePartner'),
          href: { name: 'managePartner' }
        }
      ]
      return this.canReviewPartner ? menuArray : []
    }
  }
}
</script>
