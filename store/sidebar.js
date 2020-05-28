export const state = () => ({
  collapsed: false
})

export const mutations = {
  SET_COLLAPSED (state) {
    state.collapsed = !state.collapsed
  }
}

export const getters = {
  collapsed: (state) => {
    return state.collapsed
  }
}
