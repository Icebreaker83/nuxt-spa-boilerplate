<template>
  <v-row align="end" justify="end">
    <v-menu
      v-model="menu"
      bottom
      absolute
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="columns-picker-button"
          icon
          v-on="on"
        >
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>
      <v-toolbar color="secondary" dark dense flat height="40">
        <v-spacer />
        <v-btn icon>
          <v-icon @click="menu=false">
            close
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-list>
        <v-list-item
          v-for="(item, i) in columns"
          :key="i"
          class="column-picker-tile"
        >
          <v-list-item-action class="column-picker-tile-control">
            <v-switch v-model="columnsToShow" :value="item.field" color="secondary lighten-2" />
          </v-list-item-action>
          <v-list-item-title class="column-picker-tile-label">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>
</template>
<script>
import columnsStore from '@/store/columns'

export default {
  name: 'ColumnsPicker',
  props: {
    value: {
      type: Object,
      default: () => { return {} }
    },
    label: {
      type: String,
      default: ''
    },
    tableName: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      menu: false
    }
  },
  computed: {
    columnsToShow: {
      get () {
        return this.columns.filter(value => !this.columnsToHide.includes(value.field)).map(value => value.field)
      },
      set (val) {
        this.columnsToHide = this.columns.filter(value => !val.includes(value.field)).map(value => value.field)
      }
    },
    columnsToHide: {
      get () {
        return columnsStore.getters.columnsToHide(this.tableName)
      },
      set (val) {
        columnsStore.dispatch('changeColumnState', { table: this.tableName, columns: val })
        this.$emit('input', val)
      }
    }
  },
  mounted () {
    this.$emit('input', columnsStore.getters.columnsToHide(this.tableName))
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
  .column-picker-tile {
    height: 40px;
  }

  .columns-picker-button {
    margin: 2px 12px;
  }

  .column-picker-tile-label {
    font-size: 14px;
    margin-bottom: 12px;
  }

</style>
