<template>
  <div class="entrypoint-main">
    <!-- Header -->
    <header id="header" class="">
      <div class="content">
        <h1 class="title"><router-link id="logo" to="/">KFA</router-link></h1>
        <div class="actions">
          <language-dropdown></language-dropdown>
          <span v-if="!user.authenticated">
            <router-link to="register" class="button">{{ $t('auth.register') }}</router-link>
          </span>
          <span v-if="!user.authenticated">
            <router-link to="login" class="button button-highlight">{{ $t('auth.login') }}</router-link>
          </span>
          <span v-if="user.authenticated"><a @click="logout()" class="button">{{ $t('general.logout') }}</a></span>
        </div>
      </div>
    </header>
    <div class="main">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
    <footer>
      &copy; 2017 Jens Ochsenmeier
    </footer>
  </div>
</template>
<script>
import auth from './middleware/auth'
import LanguageDropdown from './components/LanguageDropdown.vue'

export default {

  name: 'app',

  /**
   * vue data object method
   * @return {Object} data object
   */
  data () {
    return {
      user: auth.user,

      languages: [{
        name: 'Deutsch'
      }, {
        name: 'English'
      }, {
        name: 'Francais'
      }]
    }
  },

  components: {
    LanguageDropdown
  },

  methods: {
    logout () {
      auth.logout()
    }
  }
}
</script>
<style src="normalize.css"></style>
<style src="./assets/sass/main.sass" lang="sass"></style>
<style src="font-awesome/css/font-awesome.css"></style>
