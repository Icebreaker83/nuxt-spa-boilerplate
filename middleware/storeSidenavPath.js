export default function ({ app, route }) {
  if (route.path !== app.$auth.options.redirect.login) {
    app.$auth.options.redirect.home = route.path
  }
}
