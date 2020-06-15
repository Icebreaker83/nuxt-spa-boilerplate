export const state = () => ({
  collapsed: false,
  path: '/'
})

export const mutations = {
  SET_COLLAPSED (state) {
    state.collapsed = !state.collapsed
  },
  SET_PATH (state, newPath) {
    state.path = newPath
  }
}

export const getters = {
  collapsed: (state) => {
    return state.collapsed
  },
  path: (state) => {
    return state.path
  }
}
