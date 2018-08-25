<template>
  <div id="app">
    <div>
      <keep-alive><router-view v-if="$route.meta.keepAlive"/></keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
      <tab></tab>
    </div>
  </div>
</template>

<script>
import Tab from '@/components/tab'
export default {
  name: 'App',
  components: {
    Tab
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
*:not(input, textarea){
  -webkit-touch-callout: none;
  -webkit-user-select: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
