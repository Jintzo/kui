<template>
  <div v-if="error && !errorHidden" class="message-container" @click="errorHide()">
    <div class="message message-error">
      <b>{{ $t('general.error') }}</b>:
      <br> {{ error }}
    </div>
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
