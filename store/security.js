export const state = () => ({
  expirationDate: null
})
export const getters = {
  expirationDate: state => state.expirationDate
}
export const mutations = {
  SET_EXPIRATION_DATE (state, newDate) {
    state.expirationDate = newDate
  }
}
