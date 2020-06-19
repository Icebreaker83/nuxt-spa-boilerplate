<template>
  <span>
    <v-text-field
      v-model="modelStart"
      label="Од"
      hide-details
      :disabled="disabled"
      color="secondary lighten-2"
      :readonly="readonly"
      @input="onInput"
    />
    <v-text-field
      v-model="modelEnd"
      label="До"
      hide-details
      :disabled="disabled"
      color="secondary lighten-2"
      :readonly="readonly"
      @input="onInput"
    />
  </span>
</template>
<script>
export default {
  name: 'TextRange',
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
      modelStart: this.value,
      modelEnd: ''
    }
  },
  methods: {
    onInput () {
      this.$emit('input', [this.modelStart, this.modelEnd])
    }
  }
}
</script>
