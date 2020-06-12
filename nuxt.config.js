import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  server: {
    port: 8080, // default: 3000
    host: 'localhost' // default: localhost
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    name: 'chasing-dots',
    color: '#ff5638',
    background: 'white',
    height: '4px'
  },
  /*
  ** Global CSS
  */
  css: [
    '~/css/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { ssr: false, src: '~/plugins/setThemeFromStore' },
    { ssr: false, src: '~/plugins/vuelidate' },
    { ssr: false, src: '~/plugins/timeoutUser' },
    { ssr: false, src: '~/plugins/api' },
    // mock plugin contains mock promises
    { ssr: false, src: '~/plugins/mock' }
  ],
  // globaly set auth module middleware for all routs
  router: {
    middleware: ['auth', 'refreshToken', 'storeSidenavPath']
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    ['nuxt-vuex-localstorage', {
      mode: 'debug',
      localStorage: ['sidebar', 'theme', 'i18n', 'security']
    }],
    [
      'nuxt-i18n',
      {
        strategy: 'no_prefix',
        // locales: ['en', 'rs'],
        locales: [
          { code: 'en', name: 'English', file: 'en.json' },
          { code: 'rs', name: 'Српски', file: 'rs.json' }
        ],
        lazy: true,
        langDir: 'i18n/',
        defaultLocale: 'en',
        vuex: {
          // Module namespace
          moduleName: 'i18n',
          // If enabled, current app's locale is synced with nuxt-i18n store module
          syncLocale: true,
          // If enabled, current translation messages are synced with nuxt-i18n store module
          syncMessages: true,
          // Mutation to commit to set route parameters translations
          syncRouteParams: false
        }
        // parsePages: false,
        // pages: {
        //   about: false
        // }
      }
    ]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://localhost:2282/api'
  },
  toast: {
    position: 'top-center',
    duration: 4000
  },
  auth: {
    // plugins: [{ ssr: false, src: '~/plugins/auth.js' }],
    localStorage: false,
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'payload.accessToken' },
          logout: false,
          user: { url: '/administration/user-information', method: 'get', propertyName: 'payload' }
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      },
      customStrategy: {
        _scheme: '~/schemes/customScheme',
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'payload.accessToken' },
          logout: false,
          user: { url: '/administration/user-information', method: 'get', propertyName: 'payload' }
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    rewriteRedirects: true
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      options: {
        customProperties: true
      },
      themes: {
        dark: {
          primary: {
            base: colors.teal.base,
            lighten1: colors.teal.lighten1
          },
          accent: colors.grey.darken3,
          secondary: {
            base: colors.purple.lighten3
          },
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          menu_items: colors.shades.white
        },
        light: {
          primary: {
            base: colors.teal.darken3,
            lighten1: colors.teal.darken2
          },
          accent: colors.grey.darken3,
          secondary: {
            base: colors.purple.lighten3
          },
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          menu_items: colors.shades.white
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: [
      'nuxt-vuex-localstorage',
      '@nuxtjs/auth'
    ],
    extend (config, ctx) {
    }
  }
}
