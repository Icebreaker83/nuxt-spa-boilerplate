export const state = () => ({
  locale: 'en'
})

export const mutations = {
  SET_LANG (state, locale) {
    state.locale = locale
  }
}

export const getters = {
  getLocale: (state) => {
    return state.locale
  }
}
