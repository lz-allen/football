<template>
  <div id="app">
    <div>
      <tab></tab>
      <keep-alive><router-view v-if="$route.meta.keepAlive"/></keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
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
body {
  background-color:#f9f9f9;
  font-size: 14px;
}
.bglt40 {
  background-color: #8b96a6;
}
.bglt60 {
  background-color: #2c9046;
}
.bglt80 {
  background-color: #fbd93a;
}
.bglt100 {
  background-color: #3a8efb;
}
.bglt120 {
  background-color: #ce3afb;
}
.bglt140 {
  background-color: #f8683c;
}
.bge140 {
  background-color: #f83c3c;
}
</style>
