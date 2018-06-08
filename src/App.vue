<template>
  <div class="main">
    <navbar class="navbar"></navbar>
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue'

export default {
  name: 'App',
  components: {
    navbar
  },
  mounted () {
  }
}
</script>

<style>
.main {
  width: 100%;
  height: 100%;
}
.navbar {
  height: 60px;
}
</style>
