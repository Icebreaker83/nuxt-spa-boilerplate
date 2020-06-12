import Vue from 'vue'

Vue.mixin({
  methods: {
    resolveAfterXSeconds (x, timeout = 1) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(x)
        }, timeout * 1000)
      })
    }
  }
})
