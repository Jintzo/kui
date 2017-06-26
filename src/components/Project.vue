<template>
  <div class="entrypoint-project">
    <ErrorBox v-bind:error="error"></ErrorBox>
    <h2>{{ project.name }} </h2>
    <LoadingBox v-if="isLoading"></LoadingBox>
    <SampleBox v-for="sample in project.samples" v-bind:sample="sample"></SampleBox>
  </div>
</template>

<script>
// import project middleware
import project from '../middleware/project'

// import child components
import ErrorBox from './ErrorBox.vue'
import LoadingBox from './LoadingBox.vue'
import SampleBox from './SampleBox.vue'

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
      project: {}
    }
  },

  props: [ 'id' ],

  beforeMount () {
    project.getProject(this, this.id, localStorage.getItem('database'), localStorage.getItem('token'))
  },

  components: {
    ErrorBox, LoadingBox, SampleBox
  }
}
</script>
