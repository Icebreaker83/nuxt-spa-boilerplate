<template>
  <v-select
    v-model="model"
    :items="items"
    :label="label"
    color="secondary lighten-2"
    clearable
    hide-details
    class="justify-center"
    @change="onInput"
  />
</template>
<script>
export default {
  name: 'StatusSelect',
  props: {
    value: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
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
      const index = this.items.indexOf(this.model) + 1
      this.$emit('input', index.toString())
    }
  }
}
</script>
