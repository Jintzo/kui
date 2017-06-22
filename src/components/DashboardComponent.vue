<template>
  <div class="entrypoint-dashboard">
    <ErrorBox v-bind:error="error"></ErrorBox>
    <h2>{{ $t('dashboard.title') }} </h2>
    <LoadingBox v-if="isLoading"></LoadingBox>
    <ProjectBox v-for="project in overview" v-bind:project="project"></ProjectBox>
  </div>
</template>

<script>
// import project middleware
import project from '../middleware/project'

// import child components
import ErrorBox from './ErrorBox.vue'
import ProjectBox from './ProjectBox.vue'
import LoadingBox from './LoadingBox.vue'

export default {

  /**
   * vue data object method
   * @return {Object} data object
   */
  data () {
    return {
      isLoading: false,
      errorHidden: true,
      error: '',
      overview: []
    }
  },

  beforeMount () {
    project.getOverview(this, localStorage.getItem('database'), localStorage.getItem('token'))
  },

  components: {
    ErrorBox, ProjectBox, LoadingBox
  }
}
</script>
