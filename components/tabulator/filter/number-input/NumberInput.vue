<template>
  <span>
    <v-text-field
      v-model="model"
      :label="label"
      type="number"
      :disabled="disabled"
      color="secondary lighten-2"
      :readonly="readonly"
      @input="onInput"
    />

  </span>
</template>
<script>
export default {
  name: 'NumberInput',
  props: {
    value: {
      type: Object,
      default: null
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
  methods: {
    onInput () {
      this.$emit('input', this.model)
    }
  }
}
</script>
<style>
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance:textfield;
    }
</style>
