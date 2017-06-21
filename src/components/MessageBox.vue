<template>
  <div v-if="typeof message !== 'undefined' && message !== '' && !messageHidden" @click="messageHide()" class="message-container">
    <div class="message message-highlight">
      <b>{{ $t('general.success') }}</b>:
      <br> {{ message }}
      <i class="fa fa-times"></i>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      messageHidden: false
    }
  },

  props: [ 'message' ],

  methods: {
    messageHide () {
      this.messageHidden = true
    }
  }
}
</script>
