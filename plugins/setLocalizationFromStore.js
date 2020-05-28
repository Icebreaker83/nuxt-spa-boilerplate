export default function ({ store, app }) {
  window.onNuxtReady(() => {
    app.i18n.locale = store.getters['language/getLocale']
  })
}
