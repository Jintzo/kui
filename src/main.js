// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
Vue.use(VueResource)
Vue.use(VueI18n)

import auth from './middleware/auth'
import locales from './locales/'

// set lang
Vue.config.lang = 'en'
Vue.config.fallbackLang = 'en'

// define language changing global function
Vue.prototype.$locale = {
  change (lang) {
    Vue.config.lang = lang
  },
  current () {
    return Vue.config.lang
  }
}

// set locales
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

// check the user's auth status when the app starts
auth.checkAuth()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
