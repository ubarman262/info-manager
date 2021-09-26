<template>
  <div>
  <Navbar />
    <router-view />
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css';
#app {
  text-align: center;
}
</style>
