import Vue from 'vue'

const INACTIVE_USER_TIME_THRESHOLD = 0.5 * 60 * 1000
const USER_ACTIVITY_THROTTLER_TIME = 0.25 * 60 * 1000
let userActivityThrottlerTimeout = null
let userActivityTimeout = null
let _auth = null

function inactiveUserAction () {
  if (_auth.loggedIn) {
    _auth.logout()
  }
}
function resetUserActivityTimeout () {
  clearTimeout(userActivityTimeout)
  userActivityTimeout = setTimeout(() => {
    inactiveUserAction()
  }, INACTIVE_USER_TIME_THRESHOLD)
}
function userActivityThrottler () {
  if (!userActivityThrottlerTimeout) {
    userActivityThrottlerTimeout = setTimeout(() => {
      resetUserActivityTimeout()
      clearTimeout(userActivityThrottlerTimeout)
      userActivityThrottlerTimeout = null
    }, USER_ACTIVITY_THROTTLER_TIME)
  }
}

Vue.mixin({
  methods: {
    activateActivityTracker () {
      _auth = this.$auth
      window.addEventListener('mousemove', userActivityThrottler)
      window.addEventListener('scroll', userActivityThrottler)
      window.addEventListener('keydown', userActivityThrottler)
      window.addEventListener('resize', userActivityThrottler)
    },
    deactivateActivityTracker () {
      window.removeEventListener('mousemove', userActivityThrottler)
      window.removeEventListener('scroll', userActivityThrottler)
      window.removeEventListener('keydown', userActivityThrottler)
      window.removeEventListener('resize', userActivityThrottler)
      clearTimeout(userActivityTimeout)
      clearTimeout(userActivityThrottlerTimeout)
    }
  }
})
