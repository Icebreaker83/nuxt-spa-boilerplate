// import Vue from 'vue'
// const auth = Vue.prototype.$nuxt.$options.$auth
// const claims = (auth.loggedIn) ? auth.user.creationClaims.map(claim => claim.name) : []

export default {
  methods: {
    canViewAdministration () {
      // const claims = (this.$auth.loggedIn) ? this.$auth.user.creationClaims.map(claim => claim.name) : []
      return this.claims.includes('Claim_Admin') || this.claims.includes('Claim_User_Create') || this.claims.includes('Claim_User_Review') || this.claims.includes('Claim_Organization_Review')
    },
    canViewOrganizations () {
      // const claims = (this.$auth.loggedIn) ? this.$auth.user.creationClaims.map(claim => claim.name) : []
      return this.claims.includes('Claim_Admin') || this.claims.includes('Claim_Organization_Review')
    },
    canViewUsers () {
      // const claims = (this.$auth.loggedIn) ? this.$auth.user.creationClaims.map(claim => claim.name) : []
      return this.claims.includes('Claim_Admin') || this.claims.includes('Claim_User_Create')
    },
    canViewRoles () {
      // const claims = (this.$auth.loggedIn) ? this.$auth.user.creationClaims.map(claim => claim.name) : []
      return this.claims.includes('Claim_Admin') || this.claims.includes('Claim_User_Create')
    }
  },
  computed: {
    claims () {
      return (this.$auth.loggedIn) ? this.$auth.user.creationClaims.map(claim => claim.name) : []
    }
  }
}
