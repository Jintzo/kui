<template>
  <section class="wrapper">
    <h2>{{ $t('auth.login') }}</h2>
    <p>{{ $t('auth.loginMessage') }}</p>
    <ErrorBox v-bind:error="error"></ErrorBox>
    <br>
    <label for="user">{{$t('general.user')}}</label><br>
    <input v-model="credentials.user" type="text" name="user" id="user" value="" :placeholder="$t('dummy.user')" />
    <br>
    <label for="password">{{$t('general.password')}}</label><br>
    <input v-model="credentials.password" type="password" name="password" id="password" value="" :placeholder="$t('dummy.password')" />
    <br>
    <label for="select-database">{{$t('general.database')}}</label><br>
    <select id="select-database" v-model="credentials.database">
      <option value="" selected disabled>
        <span v-if="loadingDatabases">{{$t('general.loading')}}</span>
        <span v-if="!loadingDatabases">{{$t('general.selectDatabase')}}</span>
      </option>
      <option v-for="database in databases" :value="database">{{database}}</option>
    </select>
    <br>
    <input type="submit" :value="$t('auth.login')" id="button-login" v-bind:class="{ buttonDisabled: isLoggingIn }" class="button button-highlight" @click="submit()">

  </section>
</template>
<script>
import auth from '../middleware/auth'
import config from '../config'
import ErrorBox from './ErrorBox.vue'

export default {

  name: 'Login',

  data () {
    return {
      disabled: false,
      error: '',
      isLoggingIn: false,
      loadingDatabases: false,
      databases: [],

      credentials: {
        user: '',
        password: '',
        database: ''
      }
    }
  },

  methods: {

    startLoginState () {
      // set login button to disabled
      this.isLoggingIn = true
    },

    stopLoginState () {
      // set login button to enabled
      this.isLoggingIn = false
    },

    submit () {
      this.startLoginState()

      var credentials = this.credentials

      auth.login(this, credentials, 'home')
    }
  },

  components: {
    ErrorBox
  },

  beforeMount () {

    // get all available databases
    this.loadingDatabases = true
    this.$http.get(config.api + config.databasesPath).then(response => {
      if (response.body.error) {
        this.error = response.body.error
        this.errorHidden = false
      } else {
        this.databases = response.body
        this.loadingDatabases = false
      }
    }, response => {
      this.error = this.$t('errors.apiError')
      this.errorHidden = false
    })
  }
}
</script>
