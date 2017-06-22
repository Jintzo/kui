<template>
  <div class="project-container">
    <router-link :to="{ name: 'project', params: { id: project.id }}" class="project-title">{{ project.name }}</router-link><br>
    <br>
    <router-link v-for="sample in project.samples" :to="{ name: 'sample', params: { id: sample.id }}" class="button button-inline">{{ sample.description }}</router-link>
  </div>
</template>
<script>

export default {
  data () {
    return {
    }
  },

  props: [ 'project' ],

  methods: {
  }
}
</script>
