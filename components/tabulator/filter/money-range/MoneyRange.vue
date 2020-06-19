<template>
  <span>
    <v-text-field
      v-model="modelStart"
      v-money="currency"
      hide-details
      prefix="Од"
      :disabled="disabled"
      color="secondary lighten-2"
      :readonly="readonly"
      @keyup="onKeyUp"
    />
    <v-text-field
      v-model="modelEnd"
      v-money="currency"
      hide-details
      prefix="До"
      :disabled="disabled"
      color="secondary lighten-2"
      :readonly="readonly"
      @keyup="onKeyUp"
    />
  </span>
</template>
<script>
import { VMoney } from 'v-money'

export default {
  name: 'MoneyRange',
  directives: { money: VMoney },
  props: {
    value: {
      type: Array,
      default () {
        return ['', '']
      }
    },
    label: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      modelStart: this.value[0],
      modelEnd: this.value[1],
      currency: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 2,
        masked: false
      }
    }
  },
  methods: {
    onKeyUp (e) {
      if (/^[0-9]$/i.test(e.key) || e.key === 'Enter') {
        this.onInput()
      }
    },
    onInput () {
      this.$emit('input', [this.modelStart !== '0,00' ? this.flattenDecimal(this.modelStart) : '', this.modelEnd !== '0,00' ? this.flattenDecimal(this.modelEnd) : ''])
    },
    flattenDecimal (decimal) {
      const commaIndex = decimal.indexOf(',')
      const dotIndex = decimal.indexOf('.')
      if (commaIndex >= 0 && dotIndex >= 0) {
        return decimal.replace(/\./g, '').replace(',', '.')
      } else if (commaIndex >= 0) {
        return decimal.replace(',', '.')
      }
      return decimal
    }
  }
}
</script>
