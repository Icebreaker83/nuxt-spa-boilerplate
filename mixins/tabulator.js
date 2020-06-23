import Vue from 'vue'
// import { getAccessToken, getRefreshToken, setAccessToken } from '@/utils/cookie'
// import { accessTokenValid } from '@/router/auth'
import HeaderFilters from '@/components/tabulator/filter/Filter'
// import { EventBus } from '@/router/bus'
// import router from '@/router'

// const AUTHORIZATION = 'Authorization'
// const REFRESH_TOKEN = 'REFRESH_TOKEN'

export default {
  data () {
    return {
      tabulatorInstance: {},
      instancesArray: [],
      switchTabulatorPage: false,
      pageLoader: false,
      // registrationAllowed: Vue.$config.default_debounce,
      registrationAllowed: 500,
      tabulatorOptions: {
        movableColumns: true,
        columnMinWidth: 180,
        locale: this.$i18n.locale,
        pagination: 'remote',
        ajaxFiltering: true,
        ajaxLoader: false,
        ajaxSorting: true,
        resizableColumns: 'header',
        layout: 'fitColumns',
        initialSort: [],
        initialHeaderFilter: [],
        layoutColumnsOnNewData: true,
        paginationSizeSelector: [5, 15, 25],
        paginationSize: 5,
        // ajaxConfig: {
        //   headers: {
        //     'Content-type': 'application/json; charset=utf-8',
        //     Authorization: this.$auth.getToken(this.$auth.strategy.name)
        //   }
        // },
        ajaxResponse: this.ajaxResponse,
        ajaxRequestFunc: this.ajaxRequestFunc,
        // ajaxURLGenerator: this.formatUrl,
        paginationDataSent: {
          size: 'perPage',
          page: 'page'
        },
        rowClick: this.rowClick,
        langs: {
          rs: this.$t('tabulator'),
          en: this.$t('tabulator')
        },
        ajaxRequesting: this.ajaxRequesting,
        ajaxError: () => {
          this.pageLoader = false
        },
        paginationDataReceived: {
          current_page: 'current_page'
        }
      }
    }
  },
  methods: {
    // This option expects a function that returns a promise.
    // The promise should pass through the expected Tabulator formatted data array or data object on success, and should pass back an error on failure.
    ajaxRequestFunc (url, config, params) {
      // formatUrl is called first so that we incorporate filters and sorts into url of request
      const fullUrl = this.formatUrl(url, config, params)
      return new Promise(function (resolve, reject) {
        const axios = Vue.prototype.$nuxt.$options.$axios
        axios.get(fullUrl).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // The ajaxRequesting callback is called just before an AJAX request is made, if you want to abort the request for any reason you can return a value of false from the function.
    ajaxRequesting (url, params) {
      this.pageLoader = true
      // if (!accessTokenValid()) {
      //   Vue.http.headers.common[REFRESH_TOKEN] = 'IN_PROGRESS'
      //   const refreshTokenUrl = Vue.$apiConfig.loginRefresh
      //   Vue.http.headers.common[AUTHORIZATION] = 'Bearer ' + getRefreshToken()
      //   Vue.http.get(refreshTokenUrl)
      //     .then((response) => {
      //       setAccessToken(response.data.payload.accessToken)
      //       Vue.http.headers.common[AUTHORIZATION] = 'Bearer ' + response.data.payload.accessToken
      //       Vue.http.headers.common[REFRESH_TOKEN] = 'DONE'
      //     })
      //   return false
      // }
      if (url === '') { return false }
      return true
    },
    // Tabulator expects the response to an ajax request to be a JSON encoded string representing an array of data objects.
    // If you need to pass other data back in your request as well, you can use the ajaxResponse callback to process the returned data before it is passed to the table.
    // The return value of this callback should be an array of row data objects.
    ajaxResponse (url, params, response) {
      // console.log(1)
      console.log(response)
      this.pageLoader = false
      const retObj = {
        contentType: 'application/json; charset=utf-8',
        data: response.data.payload,
        last_page: this.getPageCount(response.data.additionalInformation)
      }
      if (this.switchTabulatorPage !== false) {
        this.$refs.tabulator.getInstance().modules.page.page = this.switchTabulatorPage
        this.switchTabulatorPage = false
      }
      return retObj
    },
    getInitialSort () {
      const query = this.$router.currentRoute.query
      const sort = []
      const sortBy = query.sortBy
      const sortDesc = query.sortDesc
      if (sortBy && sortDesc) {
        sort.push({ column: sortBy, dir: sortDesc })
      }
      return sort
    },
    getInitialFilter () {
      const query = this.$router.currentRoute.query
      console.log(`query = ${query}`)
      const filter = []
      // Was very late when I came up with this
      Object.keys(query).forEach(function (key) {
        console.log(`key = ${key}`)
        if (key.startsWith('filter[')) {
          if (key.endsWith('-From]')) {
            const existingFilter = filter.filter(filter => filter.field === key.slice(7, -6))
            if (existingFilter.length === 1) {
              existingFilter[0].value[0] = query[key]
            } else {
              filter.push({ field: key.slice(7, -6), value: [query[key], ''] })
            }
          } else if (key.endsWith('-To]')) {
            const existingFilter = filter.filter(filter => filter.field === key.slice(7, -4))
            if (existingFilter.length === 1) {
              existingFilter[0].value[1] = query[key]
            } else {
              filter.push({ field: key.slice(7, -4), value: ['', query[key]] })
            }
          } else {
            filter.push({ field: key.slice(7, -1), value: query[key] })
            console.log(`filter = ${JSON.stringify(filter)}`)
          }
        }
      })
      return filter
    },
    getPageCount (totalRows) {
      if (!totalRows) {
        totalRows = 0
      }
      const addition = (totalRows % this.tabulatorInstance.modules.page.size) > 0 ? 1 : 0
      return Math.floor(totalRows / this.tabulatorInstance.modules.page.size) + addition
    },
    formatUrl (url, config, params) {
      let queryString = '?'
      if (this.switchTabulatorPage !== false) {
        queryString += `page=${this.switchTabulatorPage}`
      } else if (params.page) {
        queryString += `page=${params.page}`
      }
      if (Array.isArray(params.sorters) && params.sorters.length > 0) {
        queryString += `&sortBy=${params.sorters[0].field}&sortDesc=${params.sorters[0].dir}`
      }
      for (const key in params) {
        if (!['sorters', 'filters', 'page'].includes(key)) {
          queryString += `&${key}=${params[key]}`
        }
      }
      if (Array.isArray(params.filters) && params.filters.length > 0) {
        const toBeRemoved = []
        const toBeAdded = []
        params.filters.forEach((filter) => {
          if (filter.field === 'status' && filter.value === '0') {
            toBeRemoved.push(filter)
            return
          }
          const fieldDef = this.tabulatorOptions.columns.find(x => x.field === filter.field)
          if (fieldDef && fieldDef.headerFilterParams && fieldDef.headerFilterParams.isRange) {
            const copy = JSON.parse(JSON.stringify(filter))
            if (typeof filter.value[1] !== 'undefined' && filter.value[1] !== '') {
              toBeAdded.push({
                field: copy.field + '-To',
                type: copy.type,
                value: copy.value[1]
              })
            }
            if (typeof filter.value[0] !== 'undefined' && filter.value[0] !== '') {
              toBeAdded.push({
                field: copy.field + '-From',
                type: copy.type,
                value: copy.value[0]
              })
            }
            toBeRemoved.push(filter)
          }
        })
        params.filters = params.filters.filter(el => !toBeRemoved.includes(el))
        params.filters.push(...toBeAdded)
        params.filters.forEach((filter) => {
          queryString += `&filter[${filter.field}]=${filter.value}`
        })
      }
      this.$router.replace({ path: this.$router.currentRoute.path + (this.$router.currentRoute.path.includes('?') ? '&' : '?') + queryString }).catch(err => {}) // eslint-disable-line
      return url + queryString
    },
    vDateRange (cell, onRendered, success, cancel, editorParams) {
      const ComponentClass = Vue.extend(HeaderFilters)
      const label = editorParams.label ? editorParams.label : this.$t('tabulator.headerFilters.default')
      const filter = this.tabulatorOptions.initialHeaderFilter.filter(filter => filter.field === cell.getField())
      const instance = new ComponentClass({
        propsData: {
          value: filter.length === 1 ? filter[0].value : ['', ''],
          vuetifyRef: this.$vuetify,
          label,
          type: 'DateRangePicker',
          changeCallback: success,
          readonly: this.pageLoader,
          cancel
        }
      })
      onRendered(instance.$forceUpdate)
      instance.$mount()
      this.instancesArray.push(instance)
      return instance.$el
    },
    vYearSelect (cell, onRendered, success, cancel, editorParams) {
      const ComponentClass = Vue.extend(HeaderFilters)
      const label = editorParams.label ? editorParams.label : this.$t('tabulator.headerFilters.default')
      const filter = this.tabulatorOptions.initialHeaderFilter.filter(filter => filter.field === cell.getField())
      const instance = new ComponentClass({
        propsData: {
          value: filter.length === 1 ? filter[0].value : '',
          vuetifyRef: this.$vuetify,
          label,
          type: 'YearSelect',
          changeCallback: success,
          readonly: this.pageLoader,
          cancel
        }
      })
      onRendered(instance.$forceUpdate)
      instance.$mount()
      this.instancesArray.push(instance)
      return instance.$el
    },
    vStatusSelect (cell, onRendered, success, cancel, editorParams) {
      const ComponentClass = Vue.extend(HeaderFilters)
      const label = editorParams.label ? editorParams.label : this.$t('tabulator.headerFilters.default')
      const filter = this.tabulatorOptions.initialHeaderFilter.filter(filter => filter.field === cell.getField())
      const column = this.tabulatorOptions.columns.filter(filter => filter.field === cell.getField())
      const instance = new ComponentClass({
        propsData: {
          value: filter.length === 1 ? filter[0].value : '',
          vuetifyRef: this.$vuetify,
          label,
          type: 'StatusSelect',
          changeCallback: success,
          readonly: this.pageLoader,
          cancel,
          items: column.length === 1 ? column[0].headerFilterParams.items : []
        }
      })
      onRendered(instance.$forceUpdate)
      instance.$mount()
      this.instancesArray.push(instance)
      return instance.$el
    },
    vMoneyRangeFilter (cell, onRendered, success, cancel, editorParams) {
      const ComponentClass = Vue.extend(HeaderFilters)
      const label = editorParams.label ? editorParams.label : this.$t('tabulator.headerFilters.default')
      const filter = this.tabulatorOptions.initialHeaderFilter.filter(filter => filter.field === cell.getField())
      const instance = new ComponentClass({
        propsData: {
          value: filter.length === 1 ? filter[0].value : ['', ''],
          vuetifyRef: this.$vuetify,
          label,
          type: 'MoneyRange',
          changeCallback: success,
          readonly: this.pageLoader,
          cancel
        }
      })
      onRendered(instance.$forceUpdate)
      instance.$mount()
      this.instancesArray.push(instance)
      return instance.$el
    },
    vTextFieldFilter (cell, onRendered, success, cancel, editorParams) {
      const ComponentClass = Vue.extend(HeaderFilters)
      const label = editorParams.label ? editorParams.label : this.$t('tabulator.headerFilters.default')
      const filter = this.tabulatorOptions.initialHeaderFilter.filter(filter => filter.field === cell.getField())
      const instance = new ComponentClass({
        propsData: {
          value: filter.length === 1 ? filter[0].value : '',
          vuetifyRef: this.$vuetify,
          label,
          changeCallback: success,
          readonly: this.pageLoader,
          cancel
        }
      })
      onRendered(instance.$forceUpdate)
      instance.$mount()
      this.instancesArray.push(instance)
      return instance.$el
    },
    vNumberFieldFilter (cell, onRendered, success, cancel, editorParams) {
      const ComponentClass = Vue.extend(HeaderFilters)
      const label = editorParams.label ? editorParams.label : this.$t('tabulator.headerFilters.default')
      const filter = this.tabulatorOptions.initialHeaderFilter.filter(filter => filter.field === cell.getField())
      const instance = new ComponentClass({
        propsData: {
          value: filter.length === 1 ? filter[0].value : '',
          vuetifyRef: this.$vuetify,
          label,
          type: 'NumberInput',
          changeCallback: success,
          readonly: this.pageLoader,
          cancel
        }
      })
      onRendered(instance.$forceUpdate)
      instance.$mount()
      this.instancesArray.push(instance)
      return instance.$el
    }
  },
  watch: {
    pageLoader (val) {
      this.instancesArray.forEach(function (instance) {
        instance.$props.readonly = val
      })
    }
  },
  created () {
    const query = this.$router.currentRoute.query
    if (query.perPage) {
      this.tabulatorOptions.paginationSize = parseInt(query.perPage)
    }
    if (query.page && parseInt(query.page) !== 1) {
      this.switchTabulatorPage = parseInt(query.page)
    }
    this.tabulatorOptions.initialSort = this.getInitialSort()
    this.tabulatorOptions.initialHeaderFilter = this.getInitialFilter()
    // EventBus.$on('layout_reflow', () => {
    //   Vue.nextTick(() => {
    //     if (this.$refs.tabulator) {
    //       setTimeout(() => {
    //         this.$refs.tabulator.getInstance().redraw(true)
    //       }, 200)
    //     }
    //   })
    // })
  },
  mounted () {
    if (this.$refs.tabulator) {
      this.tabulatorInstance = this.$refs.tabulator.getInstance()
    }
  }
}
