import Vue from 'vue'
import Moment from 'moment'

Vue.mixin({
  methods: {
    isProductionEnvironment () {
      return process.env.NODE_ENV.toUpperCase() === 'production'.toUpperCase()
    },
    formatShortDate (date) {
      const formattedDate = new Date(date)
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      return formattedDate.toLocaleDateString(Vue.$config.date_locale, options)
    },
    formatDate (date) {
      const formattedDate = new Date(date)
      Moment.locale(Vue.$config.date_locale)
      return Moment(date).format(Vue.$config.date_format) + ' ' + formattedDate.toLocaleTimeString(Vue.$config.date_locale)
    },
    formatAmount (amount) {
      if (isNaN(amount)) {
        return amount
      } else {
        const decimalSep = '.'
        let val = (amount / 1).toFixed(2)
        val = val.replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, decimalSep)
      }
    },
    browserIE11 () {
      return false || !!document.documentMode
    },
    browserFirefox () {
      return typeof InstallTrigger !== 'undefined'
    }
    // helpLink (linkRoute) {
    //   return (Vue.$config.help_root + '/' + linkRoute).replace(/([^:]\/)\/+/g, '$1')
    // }
  }
})
