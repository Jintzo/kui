<template>
  <div class="entrypoint-home">
    <!-- if a user registered, he needs to be notified -->
    <MessageBox v-bind:message="message"></MessageBox>
    <div v-if="user.authenticated">
      <dashboard-component></dashboard-component>
    </div>
    <div v-if="!user.authenticated">
      <!-- Banner -->
      <section id="banner">
        <div class="inner">
          <h2>{{ $t('general.title') }} </h2>
          <p>{{ $t('auth.loginMessage') }} </p>
          <ul class="actions">
            <li><router-link to="login" class="button button-highlight button-big">{{ $t('auth.login') }}</router-link></li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// import auth file
import auth from '../middleware/auth'

// import child components
import DashboardComponent from './DashboardComponent.vue'
import MessageBox from './MessageBox.vue'

export default {

  /**
   * vue data object method
   * @return {Object} data object
   */
  data () {
    return {
      user: auth.getUser(),
      message: this.$route.query.message
    }
  },

  components: {
    DashboardComponent,
    MessageBox
  }
}
</script>
