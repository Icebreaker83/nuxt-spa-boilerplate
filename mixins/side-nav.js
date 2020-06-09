export default {
  methods: {
    canViewAdministration () {
      const claims = (this.$auth.loggedIn) ? this.$auth.user.creationClaims.map(claim => claim.name) : []
      return claims.includes('Claim_Admin') || claims.includes('Claim_User_Create') || claims.includes('Claim_User_Review') || claims.includes('Claim_Organization_Review')
    },
    canViewAdminUsers () {
      const claims = (this.$auth.loggedIn) ? this.$auth.user.creationClaims.map(claim => claim.name) : []
      return claims.includes('Claim_Admin') || claims.includes('Claim_User_Create')
    },
    canViewAdminRoles () {
      const claims = (this.$auth.loggedIn) ? this.$auth.user.creationClaims.map(claim => claim.name) : []
      return claims.includes('Claim_Admin') || claims.includes('Claim_User_Create')
    }
  }
}
