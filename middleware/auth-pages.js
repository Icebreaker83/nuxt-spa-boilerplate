export default function ({ app, $auth, route, redirect }) {
  let pageAuth
  const claims = $auth.user.creationClaims.map(claim => claim.name)

  if (route.path.startsWith('/administration/users')) {
    pageAuth = claims.includes('Claim_Admin') || claims.includes('Claim_User_Create')
  }
  if (route.path.startsWith('/administration/roles')) {
    pageAuth = claims.includes('Claim_Admin') || claims.includes('Claim_User_Create')
  }
  if (!pageAuth) {
    app.$toast.error('You do not have the rights to access this page.')
    redirect('/')
  }
}
