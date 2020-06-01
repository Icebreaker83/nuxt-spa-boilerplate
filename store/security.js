export const state = () => ({
  expirationDate: null,
  isAuth: false
})

export const mutations = {
  SET_EXPIRATION_DATE (state, newDate) {
    state.expirationDate = newDate
  },
  TOGGLE_AUTH (state) {
    state.isAuth = !state.isAuth
  }
}

export const getters = {
  isAuth: state => state.isAuth,
  expirationDate: state => state.expirationDate
}
