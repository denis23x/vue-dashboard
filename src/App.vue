<template>
  <div id="app">
    <div class="container">
      <navigation></navigation>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navigation from './components/navigation'

export default {
  name: 'App',
  components: {
    navigation
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 768px;
  margin: 1rem auto;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 1rem;
}
</style>
