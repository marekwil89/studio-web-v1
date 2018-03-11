<template>
  <nav :class="scrollFromTop >= 100 ? 'moved' : ''">
    <div class="container">
      <!-- <router-link name="signal" scale="2" class="logo" tag="icon" to="/">Main page</router-link> -->
      <router-link tag="a" to="/"><icon name="signal" scale="2" class="logo"></icon></router-link>
      <div class="nav-wrapper">
        <ul :class="{'active' : menuOpen}" class="menu">
          <li class="menu-title">menu</li>
          <li @click="menuOpen = false"><router-link tag="a" to="/">Strona Główna</router-link></li>
          <li @click="menuOpen = false"><router-link tag="a" to="/studio">O nas</router-link></li>
          <li @click="menuOpen = false"><router-link tag="a" to="/equipment">Wykaz sprzętu</router-link></li>
          <li @click="menuOpen = false"><router-link tag="a" to="/booking">Zarezerwuj</router-link></li>
          <li @click="menuOpen = false"><router-link tag="a" to="/contact">Masz pytania?</router-link></li>
        </ul>
        <router-link class="btn btn-medium btn-light-outline invert outside-link" tag="a" to="/">Strona Główna</router-link>
        <router-link class="btn btn-medium btn-light-outline invert outside-link" tag="a" to="/booking">Zarezerwuj</router-link>
        <router-link class="btn btn-medium btn-light-outline invert outside-link" tag="a" to="/equipment">Wykaz sprzętu</router-link>
        <a @click="menuOpen = !menuOpen" :class="[{'active' : menuOpen}, scrollFromTop >= 100 ? 'moved' : '']" class="btn-hamburger">
          <span class="line-first"></span>
          <span class="line-second"></span>
          <span class="line-third"></span>
          <span class="line-forth"></span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NaviBar',
  data () {
    return {
      scrollFromTop: 0,
      menuOpen: false
    }
  },
  methods: {
    handleScroll: function(){
      this.scrollFromTop = window.pageYOffset;
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss" scoped>
  nav{
    padding: 20px 0;
    position: fixed;
    width: 100%;
    left: 0;
    z-index: 99999;
    transition: 0.5s all;
    background: #333;

    &.moved{
      padding: 10px 0;
      background: rgba(darken($secondary-color, 10%), $alpha: 0.9);
    }

    .container{
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media(max-width: 1220px){
        padding: 0 20px;
        width: 100%;
      }

      @media(max-width: 800px){
        .outside-link{
          display: none;
        }
      }

      .logo{
        font-size: 30px;
        color: $white-color;
        font-weight: 700;
      }

      .nav-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;

        .menu-title{
          font-size: 17px;
          color: $white-color;
          font-weight: 700;
          margin: 0 10px 2px 0;
          text-transform: uppercase;
        }

        .btn{
          margin-right: 30px;
        }

        .menu{
          opacity: 0;
          z-index: 999999;
          width: 100%;
          height: 100vh;
          top: 0;
          left: 0;
          background: rgba(darken($secondary-color, 30%), $alpha: 0.9);
          position: fixed;
          transform: translateY(-100%);
          transition: 0.5s all;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          padding: 0 300px 250px 0;
          flex-direction: column;

          @media(max-width: 1000px){
            padding: 20px;
            align-items: center;
          }


          @media(max-height: 635px){
            padding: 20px;
            align-items: center;
          }

          
          @media(max-height: 300px){
            .menu-title{
              display: none;
            }
          }

          .menu-title{
            text-transform: uppercase;
            font-weight: 700;
            margin-bottom: 20px;
            font-size: 35px;
            color: $main-color;
          }

          &.active{
            opacity: 1;
            transform: translateY(0);
          }

          li{
            margin: 10px 0;
            font-size: 20px;

            a{
              text-decoration: none;
              cursor: pointer;
              color: $white-color;
              text-transform: uppercase;
              transition: 0.5s margin;
              border-bottom: 4px dotted transparent;

              &.router-link-exact-active{
                border-bottom: 4px dotted $main-color;
                // margin-right: 30px;
              }
            }
          }
        }
      }
    }
  }
</style>
