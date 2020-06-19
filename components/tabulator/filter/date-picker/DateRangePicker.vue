<template>
  <span>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="290px"
      color="secondary lighten-2"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="innerModelStart"
          clearable
          prefix="Од"
          readonly
          hide-details
          color="secondary lighten-2"
          @click:clear="clearStart"
          v-on="on"
        />
      </template>
      <v-date-picker
        v-model="innerModelStart"
        no-title
        color="secondary lighten-2"
        @input="onInputStart"
      />
    </v-menu>
    <v-menu
      ref="menu2"
      v-model="menu2"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="290px"
      color="secondary lighten-2"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="innerModelEnd"
          clearable
          hide-details
          prefix="До"
          readonly
          color="secondary lighten-2"
          @click:clear="clearEnd"
          v-on="on"
        />
      </template>
      <v-date-picker
        v-model="innerModelEnd"
        :min="innerModelStart"
        no-title
        color="secondary lighten-2"
        @input="onInput"
      />
    </v-menu>
  </span>
</template>
<script>
export default {
  name: 'DatetimeRangePicker',
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
    changeCallback: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      menu: false,
      menu2: false,
      innerModelStart: this.value[0],
      innerModelEnd: this.value[1],
      allowedDates: []
    }
  },
  methods: {
    clearEnd () {
      this.innerModelEnd = ''
      this.onInput()
    },
    clearStart () {
      this.innerModelStart = ''
      this.onInput()
    },
    onInput () {
      this.menu = this.menu2 = false
      this.$emit('input', [this.innerModelStart ? this.innerModelStart : '', this.innerModelEnd ? this.innerModelEnd : ''])
      if (typeof this.changeCallback === 'function') {
        this.changeCallback([this.innerModelStart ? this.innerModelStart : '', this.innerModelEnd ? this.innerModelEnd : ''])
      }
    },
    onInputStart () {
      if (this.innerModelStart > this.innerModelEnd) {
        this.innerModelEnd = ''
      }
      this.onInput()
    }
  }
}
</script>
