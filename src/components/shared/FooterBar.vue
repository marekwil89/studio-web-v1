<template>
  <footer>
    <p>Copyright © 2013-2018, Inc. All rights reserved</p>
  </footer>
</template>

<script>
export default {
  name: 'NaviBar',
  data () {
    return {
      scrollFromTop: 0,
      menuOpen: false
    }
  }
}
</script>

<style lang="scss" scoped>
  footer{
    background: $main-color;
    height: 100%;
    padding: 20px;
    text-align: center;
    
    p{
      font-weight: 700;
      color: $white-color;
    }
  }
</style>
