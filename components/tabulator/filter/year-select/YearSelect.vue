<template>
  <v-select
    v-model="model"
    :items="budgetYearItem"
    :label="label"
    color="secondary lighten-2"
    clearable
    @change="onInput"
  />
</template>
<script>
export default {
  name: 'YearSelect',
  props: {
    value: {
      type: String,
      default: ''
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
      model: this.value
    }
  },
  computed: {
    budgetYearItem () {
      const startYear = (new Date()).getFullYear()
      const currentYear = (new Date()).getFullYear() + 1
      const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))
      return range(currentYear, startYear, -1)
    }
  },
  methods: {
    onInput () {
      this.$emit('input', this.model)
    }
  }
}
</script>
