import config from './../config.json'

export default {

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
  }
}
