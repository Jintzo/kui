<template>
  <div v-if="error && !errorHidden" class="message-error" @click="errorHide()">
    <b>{{ $t('general.error') }}</b>:
    <br> {{ error }}
  </div>
</template>
<script>

export default {
  data () {
    return {
      errorHidden: false
    }
  },

  props: [ 'error' ],

  methods: {
    errorHide () {
      this.errorHidden = true
    }
  }
}
</script>
