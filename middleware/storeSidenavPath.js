export default function ({ app, route, store }) {
  if (route.path !== app.$auth.options.redirect.login) {
    // app.$auth.options.redirect.home = route.path
    store.commit('sidebar/SET_PATH', route.path)
  }
}
