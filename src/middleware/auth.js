import router from './../router'
import config from './../config.json'

export default {

  user: {
    authenticated: false,
    sessionHash: '',
    id: '',
    name: '',
    mail: ''
  },

  /**
   * updates and returns this user.
   * @return {Object} the user
   */
  getUser () {
    this.checkAuth()
    return this.user
  },

  /**
   * log in
   * @param  {Component} context  the component that executed the call
   * @param  {Object}    creds    POST body
   * @param  {String}    redirect optional redirection goal
   */
  login (context, creds, redirect) {

    // prepare credentials
    let credentials = {
      user: creds.user,
      password: creds.password
    }
    context.$http.post(config.api + config.loginPath, credentials, { timeout: 1000, headers: { database: creds.database } }).then(result => {

      // check whether or not base query worked
      let err = ''
      if (result && result.body) {

        // check if error is set -- if not, check if all needed data is set
        if (result.body.error) {
          err = result.body.error
        } else if (result.body.userID && result.body.token) {

          // set user parameters
          this.user.authenticated = true
          this.user.id = result.body.userID
          this.user.name = credentials.user

          // set storage parameters
          localStorage.setItem('id', result.body.userID)
          localStorage.setItem('name', credentials.user)
          localStorage.setItem('token', result.body.token)
          localStorage.setItem('database', creds.database)

          if (redirect) {
            router.push({path: redirect, query: { message: context.$t('auth.loginSuccess') }})
          } else {
            router.push({path: 'home', query: { message: context.$t('auth.loginSuccess') }})
          }
        } else {
          err = context.$t('errors.apiError')
        }
      } else {
        err = context.$t('errors.apiError')
      }

      if (err !== '') {
        context.error = err
        context.errorHidden = false
        context.stopLoginState()
        return
      }
    }, error => {
      context.error = error
      context.errorHidden = false
      context.stopLoginState()
    })
  },

  /**
   * register a new user
   * @param  {Component} context  the component that executed the call
   * @param  {Object} creds    POST body
   * @param  {String} redirect optional redirect goal
   */
  register (context, creds, redirect) {
    const credentials = {
      name: creds.name,
      mail: creds.mail,
      password: creds.password,
      passwordConfirm: creds.passwordConfirm
    }
    context.$http.post(config.api + config.registerPath, credentials, { timeout: 1000, headers: { database: creds.database } }).then(result => {
      console.log('result: ' + JSON.stringify(result))

      // check whether or not base query worked
      let err = ''
      if (result && result.body && result.body.error) {

        err = result.body.error

        if (err === 'none') {
          if (redirect) {
            router.push({path: redirect, query: { message: context.$t('auth.registerSuccess') }})
          } else {
            router.push({path: 'home', query: { message: context.$t('auth.registerSuccess') }})
          }
          return
        } else {
          context.error = err
          context.errorHidden = false
          context.stopRegisterState()
          return
        }
      } else {
        context.error = context.$t('errors.apiError')
        context.errorHidden = false
        context.stopRegisterState()
        return
      }
    })
  },

  /**
   * log out
   */
  logout () {
    localStorage.removeItem('token')
    this.user.authenticated = false
  },

  /**
   * check authentication state on page load
   */
  checkAuth () {
    var jwt = localStorage.getItem('token')
    if (jwt) {
      this.user.authenticated = true
      this.user.sessionHash = jwt

      // import everything else
      this.user.id = localStorage.getItem('id')
      this.user.name = localStorage.getItem('name')
    } else {
      this.user.authenticated = false
    }
  },

  /**
   * validate current sessionHash
   * @param  {Component} context the component that executed the call
   */
  validate (context) {
    // set POST payload
    let payload = {
      userID: this.user.id,
      sessionHash: localStorage.getItem('id_token')
    }

    // execute request
    context.$http.post(config.api + config.validatePath, payload, (result) => {
      let err = result.data[0].attributes.error

      // if there is an error, invalidate the session
      if (err !== 'none') {
        context.error = err
        this.logout()
        router.push({path: 'home'})
      }
    })
  }
}
