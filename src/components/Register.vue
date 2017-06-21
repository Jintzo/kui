<template>
  <section class="wrapper">
    <h2>{{ $t('auth.register') }}</h2>
    <p>{{ $t('auth.registerMessage') }}</p>
    <ErrorBox v-bind:error="error"></ErrorBox>  
    <br>
    <input v-model="credentials.name" type="text" name="name" id="name" value="" :placeholder="$t('general.name')" />
    <input v-model="credentials.mail" type="email" name="email" id="email" value="" :placeholder="$t('general.mail')" />
    <br>
    <input v-model="credentials.password" type="password" name="password" id="password" value="" :placeholder="$t('general.password')" />
    <input v-model="credentials.passwordConfirm" type="password" name="passwordConfirm" id="passwordConfirm" value="" :placeholder="$t('auth.passwordConfirm')" />
    <br>
    <select id="select-database" v-model="credentials.database">
      <option value="" selected disabled>
        <span v-if="loadingDatabases">{{$t('general.loading')}}</span>
        <span v-if="!loadingDatabases">{{$t('general.selectDatabase')}}</span>
      </option>
      <option v-for="database in databases" :value="database">{{database}}</option>
    </select>
    <br>
    <input type="submit" :value="$t('auth.register')" :class="{ isRegistering: disabled }" class="button button-highlight" @click="submit()" />
  </section>
</template>
<script>
import auth from '../middleware/auth'
import config from '../config'
import ErrorBox from './ErrorBox'

export default {

  name: 'register',

  data () {
    return {
      disabled: false,
      error: '',
      isRegistering: false,
      loadingDatabases: false,
      databases: [],

      credentials: {
        name: '',
        mail: '',
        password: '',
        passwordConfirm: '',
        database: ''
      }
    }
  },

  methods: {
    startRegisterState () {
      // set register button to disabled
      this.isRegistering = true
    },

    stopRegisterState () {
      // set register button to enabled
      this.isRegistering = false
    },

    submit () {
      this.startRegisterState()

      var credentials = this.credentials

      auth.register(this, credentials, 'home')
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
