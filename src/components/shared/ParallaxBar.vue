<template>
  <section :style="styleParallax" class="parallax-bar">
    <span class="overlay">
      <span class="parallax-title" v-if="initTitle">{{initTitle}}</span>
    </span>
  </section>
</template>

<script>
export default {
  name: 'ParallaxBar',
  props: ['initImage', 'initHeight', 'initTitle'],
    data () {
      return {
        styleParallax: {
          height: this.initHeight + 'px',
          backgroundImage: 'url(' + require('../../assets/img/'+ this.initImage + '') + ')'
        }
      }
  }
}
</script>

<style scoped lang="scss">
  .parallax-bar{
    width: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    position: relative;
    text-align: center;

    @media(max-width: 600px){
      height: auto;
    }
    
    .overlay{
      padding: 20px;
      top: 0;
      z-index: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba($color: $main-color, $alpha: 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .parallax-title{
      color: $white-color;
      font-size: 55px;
      font-weight: 100;

      @media(max-width: 600px){
        font-size: 30px;
      }
      // line-height: auto !important;
      // letter-spacing: -.025em;
    }
  }
</style>
