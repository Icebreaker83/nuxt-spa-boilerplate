export default function ({ $auth }) {
  const oldLogout = $auth.logout.bind($auth)
  const oldLogin = $auth.login.bind($auth)

  $auth.logout = (...args) => {
    const _ = oldLogout(...args)
    _.then(() => $auth.redirect('logout'))
    return _
  }

  $auth.login = (...args) => {
    // sometimes doesn't work when the user tries to get to the admin page
    // before being logged in.

    const _ = oldLogin(...args)
    _.then(() => {
      $auth.redirect('home')
    })
    return _
  }
}
