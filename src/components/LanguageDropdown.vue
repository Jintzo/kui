<template>
  <span class="" :class="{ open: show, dropdown: !dropup, dropup: dropup}">
    <button class="button dropdown-button" @click="toggle($event)" :disabled="disabled">
      <i class="fa fa-chevron-down dropdown-caret"></i>
      {{ $t('general.language') }}
    </button>
    <ul class="dropdown-menu">
      <li @click="clicked('en')" class="dropdown-item">English</li>
      <li @click="clicked('de')" class="dropdown-item">Deutsch</li>
    </ul>
  </span>
</template>
<script>

export default {
  data () {
    return {
      show: false,
      dropup: false
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    switchLanguage (lang) {
      let current = this.$locale.current()

      if (current !== lang) {
        this.$locale.change(lang)
      }
    },
    toggle (e) {
      this.show = !this.show
    },
    clicked (lang) {
      this.switchLanguage(lang)
      this.show = false
    }
  },
  events: {
    'hide::dropdown' () {
      this.show = false
    }
  }
}
</script>
