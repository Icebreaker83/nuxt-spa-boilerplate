export const state = () => ({
  isDark: true
})

export const mutations = {
  TOGGLE_THEME (state) {
    state.isDark = !state.isDark
  }
}

export const getters = {
  themeIsDark: (state) => {
    return state.isDark
  }
}
