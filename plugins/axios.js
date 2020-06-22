// const NO_AUTH_URLS = [
//   '/login',
//   '/login/login-ldap',
//   '/login/refresh',
//   'administration/activate-registered-user',
//   'administration/validate-activation-token',
//   'administration/activate-user',
//   'organization/registry/treasury-branch',
//   'organization/registry/budget-user',
//   'organization/register-organization',
//   'organization/retrieve-registration',
//   'registration/get-entity',
//   'administration/reset-password',
//   'administration/validate-reset-token',
//   'administration/reset-user'
// ]

export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    console.log(error)
    // const code = parseInt(error.response && error.response.status)
    // if (code === 400) {
    //   redirect('/400')
    // }
  })
}
