<template>
  <v-container>
    <v-row dense class="mb-3">
      <v-col cols="6" md="2" lg="1">
        <!-- <v-btn :to="{name: 'registerUser'}" type="button" class="text-none" color="secondary"> -->
        <v-btn type="button" class="text-none" color="primary">
          <v-icon dark left>
            mdi-plus-box
          </v-icon>{{ $t('administration.users.addNewUser') }}
        </v-btn>
      </v-col>
    </v-row>
    <VueTabulator id="userManagmentTable" ref="tabulator" v-model="data" :options="tabulatorOptions" :class="{ 'tabulator-xs-paginator': $vuetify.breakpoint.xsOnly }" />
  </v-container>
</template>

<script>
import Vue from 'vue'
import tabulatorMixin from '@/mixins/tabulator'

export default {
  middleware: 'auth-pages',
  mixins: [tabulatorMixin],
  data () {
    return {
      UserStatus: {
        ACTIVE: 1,
        INACTIVE: 2,
        REVOKED: 3,
        DISABLED: 4
      },
      data: [],
      loader: false,
      loading: false,
      tabulatorOptions: {
        ajaxURL: `${this.$axios.defaults.baseURL}${Vue.$apiConfig.getPagedUsers}`,
        columnMinWidth: 220,
        columns: [
          { title: 'id', field: 'id', visible: false },
          { title: this.$t('administration.users.tabulator.name'), hozAlign: 'center', field: 'name', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          { title: this.$t('administration.users.tabulator.login'), hozAlign: 'center', field: 'login', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          { title: this.$t('administration.users.tabulator.loginAd'), field: 'loginAd', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          { title: this.$t('administration.users.tabulator.email'), hozAlign: 'center', field: 'email', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          {
            title: this.$t('administration.users.tabulator.status'),
            hozAlign: 'center',
            field: 'status',
            formatter: (cell, formatterParams, onRendered) => {
              const status = cell.getValue()
              if (status === this.UserStatus.ACTIVE) {
                return '<span class="status-active-span">' + this.$t('userStatuses.' + status) + '</span>'
              } else if (status === this.UserStatus.INACTIVE) {
                return '<span class="status-inactive-span">' + this.$t('userStatuses.' + status) + '</span>'
              }

              return '<span class="status-revoked-span">' + this.$t('userStatuses.' + status) + '</span>'
            },
            headerFilter: this.vStatusSelect,
            headerFilterParams: {
              items: [
                { text: this.$t('userStatuses.1'), value: '1' },
                { text: this.$t('userStatuses.2'), value: '2' },
                { text: this.$t('userStatuses.3'), value: '3' },
                { text: this.$t('userStatuses.4'), value: '4' }
              ]
            },
            headerFilterLiveFilter: false
          }
        ],
        rowClick: (e, row) => {
          console.log(this.$router)
          this.$router.push({ path: `/administration/users/${row.getData().id}`, params: { id: row.getData().id } })
        }
      }
    }
  }
}
</script>
