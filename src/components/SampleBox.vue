<template>
  <div class="sample-container">
    <router-link :to="{ name: 'sample', params: { id: sample.id }}" class="sample-title">{{ sample.description }}</router-link><br>
    <br>
    <span v-if="sample.fractions.length <= 0" class="error-text">Keine Fraktionen vorhanden</span>
    <router-link v-for="fraction in sample.fractions" :to="{ name: 'fraction', params: { id: fraction.id }}" class="button button-image"><span class="button-title">{{ fraction.sieve }}</span><span class="button-detail">Durchgang [M%]: {{ fraction.throughput }}%</span><img :src="fraction.imageURLThumbnail"></router-link>
  </div>
</template>
<script>

export default {
  data () {
    return {
    }
  },

  props: [ 'sample' ],

  methods: {
  }
}
</script>
