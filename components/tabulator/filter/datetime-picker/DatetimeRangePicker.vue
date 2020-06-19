<template>
  <span>
    <datetime-picker
      v-model="innerModelStart"
      label="Select Datetime"
      @input="onInput"
    />
    <datetime-picker
      v-model="innerModelEnd"
      label="Select Datetime"
      @input="onInput"
    />
  </span>
</template>
<script>
import DatetimePicker from './DatetimePicker'
export default {
  name: 'DatetimeRangePicker',
  components: {
    DatetimePicker
  },
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    changeCallback: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      menu: false,
      menu2: false,
      innerModelStart: this.value,
      innerModelEnd: this.value
    }
  },
  methods: {
    onInput () {
      this.$emit('input', [this.innerModelStart, this.innerModelEnd])
      if (typeof this.changeCallback === 'function') {
        this.changeCallback([this.innerModelStart, this.innerModelEnd])
      }
    }
  }
}
</script>
