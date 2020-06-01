export default function ({ store, app }) {
  window.onNuxtReady(() => {
    app.vuetify.framework.theme.dark = store.getters['theme/themeIsDark']
  })
}
