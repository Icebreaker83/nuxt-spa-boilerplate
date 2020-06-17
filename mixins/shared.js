import Vue from 'vue'
import jwtDecode from 'jwt-decode'

export default {
  methods: {
    login ({ login, password } = {}) {
      this.$auth.loginWith('customStrategy', {
        data: {
          login,
          password
        }
      }).then((response) => {
        this.$router.push({ path: this.$store.getters['sidebar/path'] })
        // get decoded access token
        const decodedToken = jwtDecode(this.$auth.getToken(this.$auth.strategy.name))
        // commit token expiration date to localStorage
        this.$store.commit('security/SET_EXPIRATION_DATE', decodedToken.exp)
        // display welcome message
        this.$toast.success(`${this.$t('login.welcomeMessage')} ${this.$auth.user.login}`)
      }).catch((error) => {
        console.log(error.response)
        // display wrong username/password or default error message
        // if error.response = undefined, that means that connection to backend was refused and default message is displayed
        // if error status code is not defined in i18n file default message is displayed
        const errorMessage = (error.response) ? this.$t(`login.errors.${error.response.status}`) || this.$t('login.errors.default') : this.$t('login.errors.default')
        this.$toast.error(errorMessage)
      })
    },
    loginInitial (login) {
      this.$axios.post(Vue.$apiConfig.initialUserActivation, login).then((response) => {
        this.$toast.success(this.$t('login.firstTime.success'))
      }).catch(() => {
        this.$toast.error(this.$t('login.firstTime.error'))
      })
      this.$router.push('/login')
    },
    resetPassword (login) {
      this.$axios.post(Vue.$apiConfig.resetUserPassword, login).then((response) => {
        this.$toast.success(this.$t('login.firstTime.success'))
      }).catch(() => {
        this.$toast.error(this.$t('login.firstTime.error'))
      })
      this.$router.push('/login')
    }
  }
}
