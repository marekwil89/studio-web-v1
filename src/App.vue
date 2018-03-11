<template>
  <div id="app">
    <naviBar></naviBar>
    <router-view/>
    <!-- <footerBar></footerBar> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
    background: url('./assets/img/body-bg.png');
    /* background-size: cover; */
  }
</style>
