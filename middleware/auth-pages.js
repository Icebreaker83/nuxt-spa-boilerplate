export default function ({ app, $auth, route, redirect }) {
  let pageAuth
  const claims = $auth.user.creationClaims.map(claim => claim.name)
  switch (route.path) {
    case '/administration/users':
      pageAuth = claims.includes('Claim_Admin') || claims.includes('Claim_User_Create')
      break
    case '/administration/roles':
      pageAuth = claims.includes('Claim_Admin') || claims.includes('Claim_User_Create')
      break
  }
  if (!pageAuth) {
    app.$toast.error('You do not have the rights to access this page.')
    redirect('/')
  }
}
