<template>
  <v-container fluid>
    <VueTabulator id="organizationManagmentTable" ref="tabulator" v-model="data" :options="tabulatorOptions" />
  </v-container>
</template>

<script>
import Vue from 'vue'
import tabulatorMixin from '@/mixins/tabulator'

export default {
  mixins: [tabulatorMixin],
  data () {
    return {
      OrganizationStatus: {
        PENDING: 1,
        APPROVED: 2,
        CANCELED: 3
      },
      data: [],
      loading: false,
      tabulatorOptions: {
        ajaxURL: Vue.$apiConfig.getPagedOrganizations,
        columns: [
          { title: this.$t('organization.id'), align: 'center', field: 'id', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          { title: this.$t('organization.budgetUserId'), align: 'center', field: 'budgetUserId', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          { title: this.$t('organization.name'), align: 'center', field: 'name', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          { title: this.$t('users.details.nameAndSurname'), align: 'center', field: 'adminName', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          { title: this.$t('users.details.email'), align: 'center', field: 'adminEmail', headerFilter: this.vTextFieldFilter, headerFilterLiveFilter: false },
          {
            title: this.$t('organization.status'),
            align: 'center',
            field: 'status',
            formatter: (cell, formatterParams, onRendered) => {
              const status = cell.getValue()
              if (status === this.OrganizationStatus.APPROVED) {
                return '<span class="status-active-span">' + this.$t('organization.statuses.' + status) + '</span>'
              } else if (status === this.OrganizationStatus.PENDING) {
                return '<span class="status-inactive-span">' + this.$t('organization.statuses.' + status) + '</span>'
              }
              return '<span class="status-revoked-span">' + this.$t('organization.statuses.' + status) + '</span>'
            },
            headerFilter: this.vStatusSelect,
            headerFilterParams: {
              items: [
                { text: this.$t('organization.statuses.1'), value: '1' },
                { text: this.$t('organization.statuses.2'), value: '2' },
                { text: this.$t('organization.statuses.3'), value: '3' }
              ]
            },
            headerFilterLiveFilter: false
          }
        ],
        rowClick: (e, row) => {
          this.$router.push({ path: `/administration/organizations/${row.getData().id}`, params: { id: row.getData().id } })
        }
      }
    }
  }
}
</script>
