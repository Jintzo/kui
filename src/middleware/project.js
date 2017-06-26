import config from './../config.json'

export default {

  /**
   * get an overview over all available projects
   * @param  {Object} context  context
   * @param  {String} database database
   * @param  {String} token    user's token
   * @return {void}
   */
  getOverview (context, database, token) {
    context.isLoading = true
    context.$http.get(config.api + config.projectPath, { headers: { database, token }, timeout: 1000 }).then((result) => {

      // check whether or not the base query succeeded
      let err = ''
      if (result && result.body) {
        if (result.body.error) {
          err = result.body.error
        } else {
          context.overview = result.body
          context.isLoading = false
          return
        }
      } else {
        err = context.$t('errors.apiError')
      }

      if (err !== '') {
        context.error = err
        context.errorHidden = false
        context.isLoading = false
      }
    }).catch((error) => {
      context.error = error
      context.errorHidden = false
      context.isLoading = false
    })
  },

  /**
   * get data for a specific project
   * @param  {Object} context  context
   * @param  {Integer} id       id of the project
   * @param  {String} database database
   * @param  {String} token    user's token
   * @return {void}
   */
  getProject (context, id, database, token) {
    context.isLoading = true
    const url = config.api + config.projectPath + id
    console.log('url: ' + url)
    context.$http.get(url, { headers: { database, token }, timeout: 1000 }).then((result) => {

      // check whether or not the base query succeeded
      let err = ''
      if (result && result.body) {
        if (result.body.error) {
          err = result.body.error
        } else {
          context.project = result.body
          context.isLoading = false
          return
        }
      } else {
        err = context.$t('errors.apiError')
      }

      if (err !== '') {
        context.error = err
        context.errorHidden = false
        context.isLoading = false
      }
    }).catch((error) => {
      context.error = error
      context.errorHidden = false
      context.isLoading = false
    })
  }
}
