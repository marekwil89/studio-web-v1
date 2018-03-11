<template>
  <div ref="imgBox" @mouseleave="onMouseLeave()" @mouseover="onMouseOver()" @mousemove="onMouseMove($event)" :style="{backgroundImage: 'url(' + require('../../assets/img/'+ this.initImage + '') + ')'}" class="img-box">
    <transition name="fade">
      <div v-if="zoomShow" ref="zoom" :style="[zoomStyle, {backgroundImage: 'url(' + require('../../assets/img/'+ this.initImage + '') + ')'}]" class="zoom"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ZoomPicture',
  props: ['initImage'],
  data () {
    return {
      zoomShow: false,
      zoomStyle: {
        left: 0,
        top: 0,
        backgroundPosition: ''
      },
    }
  },
  methods: {
    onMouseMove(event){
      
      let imgBox = this.$refs.imgBox
      let zoom = this.$refs.zoom
      
      let zoomSize = parseInt(window.getComputedStyle(zoom).height)
      let imgBoxSize = parseInt(window.getComputedStyle(imgBox).height)
      let photoBounding = imgBox.getBoundingClientRect();


      let MAX_POSITION = imgBoxSize - zoomSize;
      
      let x = event.clientX - photoBounding.left
      let y = event.clientY - photoBounding.top

      
      x -= zoomSize / 2;
      y -= zoomSize / 2;

      if (x + zoomSize > imgBoxSize) {
        x = MAX_POSITION
      }

      if (y + zoomSize > imgBoxSize) {
        y = MAX_POSITION
      }

      if (x < 0) {
        x = 0;
      }

      if (y < 0) {
        y = 0;
      }

      this.zoomStyle = {
        left: `${x}px`,
        top: `${y}px`,
        backgroundPosition: `${x * 0.4}% ${y * 0.4}%`
      }
    },
    onMouseOver(){
      this.zoomShow = true;
    },
  
    onMouseLeave(){
      this.zoomShow = false;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $width: 100%;
  $height: 100%;

  .img-box{
    width: $width;
    height: $height;
    z-index: 1;
    position: relative;
    background-position: center;
    background-size: cover;
    cursor: move;

    @media(max-width: 550px){
      .zoom{
        display: none;
      }
    }

    .zoom{
      z-index: 99;
      width: $width/2;
      height: $height/2;
      background-position: center;
      background-size: 400%;
      background-repeat: no-repeat;
      position: absolute;
      border: 1px solid #999;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
