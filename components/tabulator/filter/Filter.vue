<template>
  <v-row>
    <v-col cols="12">
      <component
        :is="type"
        v-model="model"
        :label="label"
        :items="items"
        :disabled="disabled"
        color="secondary lighten-2"
        :readonly="readonly"
        hide-details
      />
    </v-col>
  </v-row>
</template>
<script>
import MoneyRange from './money-range/MoneyRange'
import TextRange from './text-range/TextRange'
import YearSelect from './year-select/YearSelect'
import StatusSelect from './status-select/StatusSelect'
import DateTimePicker from './datetime-picker/DatetimePicker'
import DateTimeRangePicker from './datetime-picker/DatetimeRangePicker'
import DateRangePicker from './date-picker/DateRangePicker'
import NumberInput from './number-input/NumberInput'

export default {
  name: 'HeaderInput',
  components: {
    MoneyRange,
    TextRange,
    YearSelect,
    StatusSelect,
    DateTimePicker,
    DateTimeRangePicker,
    DateRangePicker,
    NumberInput
  },
  props: {
    type: {
      type: String,
      default: 'v-text-field'
    },
    vuetifyRef: {
      type: Object,
      default: null
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    changeCallback: {
      type: Function,
      default: () => {}
    },
    cancelCallback: {
      type: Function,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      model: this.value,
      debounce: ''
    }
  },
  watch: {
    model (val) {
      if (typeof this.cancelCallback === 'function') {
        this.cancelCallback()
      }
      if (typeof this.changeCallback === 'function') {
        clearTimeout(this.debounce)
        this.debounce = setTimeout(() => {
          this.changeCallback(val)
        }, 500)
      }
    }
  },
  created () {
    this.$vuetify = this.$props.vuetifyRef
  }
}
</script>
<style lang="scss" type="text/scss">
  .tabulator {
    .tabulator-header {
      font-weight: 600 !important;
      font-size: 14px;
    }
    .tabulator-col-title {  text-align: center; }

    .v-text-field__prefix{
      font-size: 12px;
      font-weight: 400;
      color: var(--v-tabulator_filter_text-base);
    }
    .theme--light.v-messages {
      display: none;
    }

    .v-input{
      padding-top: 0px;
      margin-top: 1px;
      // color: rgb(38, 166, 154);
    }
    .v-input__slot {
      margin-bottom: 1px;
      label {
        left: calc(50% - 38px) !important;
      }
    }

    .v-text-field{
      label{
        height: 18px;
        line-height: 12px;
        font-size: 12px;
        color: var(--v-tabulator_filter_text-base) !important;
      }
      input{
        padding: 2px 0 2px;
        margin-bottom: 10px;
        line-height: 18px;
        font-size: 12px;
        font-style: italic;
        color: var(--v-tabulator_filter_text-base) !important;
      }
    }
    .v-text-field>.v-input__control>.v-input__slot:before {
      border-color: var(--v-tabulator_filter_text-base) !important;
    }
    .v-text-field>.v-input__control>.v-input__slot:after {
      border-style: var(--v-tabulator_filter_text-base) !important;
    }
  }
</style>
