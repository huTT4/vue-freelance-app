<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <router-view />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import TheNavbar from './components/TheNavbar'

export default {
  setup () {
    const store = useStore()
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    if (Array.isArray(tasks)) {
      store.state.tasks = tasks
    } else {
      store.state.tasks = []
    }
  },
  components: { TheNavbar }
}
</script>

<style>

</style>
