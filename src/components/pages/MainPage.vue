<template>
  <span id="main-page">
    <section class="carousel-section">

      <el-carousel height="100vh" indicator-position="inside" class="slider-wrapper">
        <el-carousel-item :style="{backgroundImage: 'url(' + require('../../assets/img/'+ slide.bgImage + '') + ')'}" v-for="(slide, index) in headerSlides" v-bind:key="index" class="slide-box">
          <h1 class="slide-title">{{slide.title}}</h1>
          <p class="slide-text">{{slide.text}}</p>
          <div class="button-box">
            <router-link :class="button.class" v-for="(button, index) in slide.buttons" v-bind:key="index" tag="a" :to="button.url">{{button.text}}</router-link>
            
            <!-- <a :class="button.class" v-for="(button, index) in slide.buttons" v-bind:key="index" type="button" href="">{{button.text}}</a> -->
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>
    
    <section class="icons-section">
      <header>
        <h2>Dlaczego my?</h2>
        <p>Bo rezerwacja sali to kwestia 5 minut Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, dicta. <span>Lorem, ipsum.</span></p>
      </header>
      <ul class="icons-wrapper">
        <li>
          <figure>
            <icon name="flash" scale="3"></icon>
          </figure>
          <h3>Rezerwacja</h3>
          <p>Lorem, ipsum dolor sit amet <span>consectetur</span> adipisicing elit. Ab minima <span>facilis</span></p>
        </li>
        <li>
          <figure>
            <icon name="cogs" scale="3"></icon>
          </figure>
          <h3>Sprzęt</h3>
          <p>Lorem, ipsum dolor sit amet consectetur <span>adipisicing elit</span>. Ab minima perspiciatis delectus ipsam nihil vero doloremque, facilis distinctio nam nobis?</p>
        </li>
        <li>
          <figure>
            <icon name="usd" scale="3"></icon>
          </figure>
          <h3>Cena</h3>
          <p>Cena jest znana od początku do końca i <span>pozostaje niezmienna</span></p>
        </li>
      </ul>
    </section>

    <parallaxBar :init-image="'header-slide-1.jpg'" :init-height="'200'" :init-title="'Co posiadamy?'"></parallaxBar>

    <section class="price-section">
      <header>
        <h2>Atrakcyjne ceny</h2>
        <p>Jedna godzina wynajęcia <span>studia nagrań to tylko 59zł za 1h</span></p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, tempore. Debitis ad nihil recusandae, <span>studio Virtual Reality to tylko 100zł za 1h</span> modi ab deleniti repellat blanditiis explicabo, quaerat nisi dignissimos aspernatur maiores reiciendis culpa rem! </p>
      </header>
    </section>

    <section class="about-section">
      <figure>
        <zoomPicture :init-image="'gitara.jpg'"></zoomPicture>
      </figure>
      <aside>
        <h2>Dużo sprzętu!</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.  <span>Molestiae</span> delectus reprehenderit impedit a totam ipsam, amet quisquam. Dolor quibusdam error delectus libero eum porro neque fugiat eligendi quo natus quis eius quisquam asperiores, reiciendis magni! Voluptatibus cumque, a veniam fugit sunt quisquam iure cupiditate ad repellat assumenda? Ea, sequi eos!</p>
        <router-link class="btn btn-main-outline btn-medium" tag="a" to="/equipment">Zobacz wykaz sprzętu!</router-link>
      </aside>
    </section>
    <section class="equipments-section">
      <aside>
        <h2> ...I jeszcze więcej sprzętu</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae delectus reprehenderit impedit a totam ipsam, amet quisquam. Dolor quibusdam error delectus libero eum porro neque fugiat eligendi quo natus quis eius quisquam asperiores, reiciendis magni! Voluptatibus cumque, a veniam fugit sunt quisquam iure cupiditate ad repellat assumenda? Ea, sequi eos!</p>
        <router-link class="btn btn-main-outline btn-medium" tag="a" to="/studio">Więcej o studio!</router-link>
      </aside>
      <article>
        <el-carousel indicator-position="inside" type="card" height="350px" class="slider-wrapper">
          <el-carousel-item v-for="(slide, index) in equipments" v-bind:key="index" class="slide-box">
            <figure>
              <img v-bind:src="require('../../assets/img/' + slide.img)" alt="">
            </figure>
            <p>{{slide.name}}</p>
          </el-carousel-item>
        </el-carousel>
      </article>
    </section>

    <parallaxBar :init-image="'link-photo2.jpg'" :init-height="'200'" :init-title="'Wydarzenia'"></parallaxBar>

    <section class="events-section">
      <header>
        <h2>This is icons header</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt tempore neque, placeat voluptatum sit necessitatibus!</p>
      </header>
      <ul class="events-wrapper">
        <li class="events-box" v-for="(item, index) in events" v-bind:key="index">
          <figure>
            <img v-bind:src="require('../../assets/img/' + item.image)" alt="">
          </figure>
          <aside>
            <h3>{{item.name}}</h3>
            <p v-html="item.description"></p>
            <a @click="onOpenModal(item.videoUrl)" class="btn btn-medium btn-main-outline" href="###" type="button">Obejrzyj teraz</a>
          </aside>
        </li>
      </ul>
    </section>
    <el-dialog width="600px" custom-class="video-modal" title="Film" :visible.sync="videoModalOpen">
      <iframe width="100%" height="400px" :src="videoUrl" frameborder="0" allowfullscreen></iframe>
    </el-dialog>

  </span>
</template>

<script>

import equipmentService from '../services/EquipmentService';
import eventService from '../services/EventService';

export default {
  name: 'MainPage',
  data () {
    return {
      videoModalOpen: false,
      videoUrl: '',
      headerSlides: [{
        title: 'Zrób muzykę w naszym studiu Nagrań',
        bgImage: '4.jpg',
        text: 'CENA WYNAJĘCIA STUDIA TO TYLKO 49ZŁ/1H',
        buttons: [{
          text: 'Sprawdź Termin',
          url: '/booking',
          class: 'btn btn-main-full btn-big'
        }]
      },{
        title: 'Baw się Wirtualną Rzeczywistością',
        bgImage: 'vr-studio2.png',
        text: 'JUŻ 100ZŁ/1H',
        buttons: [{
          text: 'Zaczynam !',
          url: '/booking',
          class: 'btn btn-secondary-full btn-big'
        }]
      }],
      equipments: equipmentService,
      events: eventService
    }
  },
  methods: {
    onOpenModal: function(url){
      this.videoUrl = url;
      this.videoModalOpen = true;
    }
  }
}
</script>

<style scoped lang="scss">

#main-page{
  .carousel-section{
    .slider-wrapper{
      .slide-box{
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        padding: 20px;
  
        h1{
          color: $white-color;
          font-size: 55px;
          font-weight: 700;
          letter-spacing: -.025em;

          @media(max-width: 600px){
            font-size: 30px;
          }
        }
  
        .slide-text{
          font-size: 20px;
          text-transform: uppercase;
          font-weight: 100;
          letter-spacing: 5px;
          margin: 5px 0 40px 0;
          color: $white-color;

          @media(max-width: 600px){
            font-size: 18px;
          }
        }
  
        .btn{
          margin: 10px;

          @media(max-width: 600px){
            margin: 5px 0;
          }
        }
      }
    }
  }

  .icons-section{
    width: 100%;
    display: flex;
    padding: 150px 0;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    header{
      width: 500px;
      margin: 0 auto 100px auto;
      padding: 20px;

      @media(max-width: 520px){
        width: 100%;
      }
    }

    .icons-wrapper{
      width: 1100px;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      padding: 20px;

      @media(max-width: 1120px){
        width: 100%;
        flex-wrap: wrap;
      }

      li{
        background: $white-color;
        width: 350px;
        height: 340px;
        transition: 0.5s all;
        margin: 20px;
        padding: 20px;
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        box-shadow: 2px 2px 20px 0 rgba(0,0,0,.2);
        overflow: hidden;
        position: relative;

        @media(max-width: 520px){
          width: 100%;
          margin: 20px 0;
          height: auto;
        }        

        &::after{
          content: '';
          position: absolute;
          top: -50px;
          right: -75px;
          width: 100px;
          height: 100px;
          transform: rotate(45deg);
          // border-radius: 50%;
          background: $main-color;
        }

        &:hover{
          box-shadow: 2px 2px 80px 0 rgba(0,0,0,.2);
        }


        figure{
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
          width: 130px;
        }

        h3{
          margin: 0;
        }

        p{
          width: 100%;
        }
      }
    }
  }

  .price-section{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 150px 0 50px 0;
    
    header{
      padding: 20px;
      width: 500px;

      @media(max-width: 520px){
        width: 100%;
      }

      h2{
        text-align: center;
      }

      p{
        margin-bottom: 10px;
      }
    }
  }

  .about-section{
    width: 100%;
    padding: 50px 0 50px 0;
    justify-content: center;
    align-items: center;
    display: flex;

    @media(max-width: 900px){
      flex-direction: column-reverse;
    }

    figure{
      width: 500px;
      height: 500px;
      
      @media(max-width: 550px){
        padding: 20px;
        width: 100%;
        height: 400px;
      }
    }

    aside{
      width: 500px;
      margin-left: 100px;

      @media(max-width: 1180px){
        padding: 20px 20px 20px 40px;
        margin: 0;
      }

      @media(max-width: 550px){
        width: 100%;
      }

      .btn{
        margin: 20px 0;
      }
    }
  }

  .equipments-section{
    padding: 50px 0 150px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    
    @media(max-width: 1000px){
      flex-direction: column;
    }

    article{
      width: 700px;
      
      @media(max-width: 1300px){
        width: 55%;
      }

      @media(max-width: 1000px){
        padding: 0 120px;
        width: 100%;
      }

      @media(max-width: 830px){
        padding: 0 40px;
      }

      @media(max-width: 640px){
        padding: 0 10px;

        .el-carousel__container{
          height: 100% !important;
        }

        ul{
          display: none !important;
        }
      }

      figure{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 60px 60px 20px 60px;
        width: 100%;
        height: 300px;

        @media(max-width: 600px){
          padding: 20px;
        }

        img{
          width: 100%;
        }
      }
      p{
        display: block;
        margin-bottom: 20px;
        text-align: center;

        @media(max-width: 600px){
          display: none;
        }
      }
    }

    aside{
      width: 500px;
      margin-left: 100px;

      @media(max-width: 1360px){
        margin: 0;
      }

      @media(max-width: 1300px){
        padding: 20px;
        width: 45%;
      }

      @media(max-width: 1000px){
        width: 100%;
      }

      .btn{
        margin: 20px 0;
      }
    }
  }

  .events-section{
    width: 100%;
    display: flex;
    padding: 150px 0;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    header{
      width: 500px;
      margin: 0 auto 100px auto;

      @media(max-width: 520px){
        padding: 20px;
        width: 100%;
      margin: 0;
        
      }
    }

    .events-wrapper{
      width: 1200px;
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      @media(max-width: 1220px){
        width: 100%;
        padding: 20px;
      }

      .events-box{
        width: 100%;
        box-shadow: 2px 2px 20px 0 rgba(0,0,0,.2);
        background: $white-color;
        height: 100%;
        margin: 50px 20px;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: 0.5s all;
        position: relative;
        overflow: hidden;

        @media(max-width: 800px){
          flex-direction: column;
        }

        &::after{
          content: '';
          position: absolute;
          top: -50px;
          right: -75px;
          width: 100px;
          height: 100px;
          transform: rotate(45deg);
          // border-radius: 50%;
          background: $main-color;
        }

        &:hover{
          box-shadow: 2px 2px 80px 0 rgba(0,0,0,.2);          
        }

        &:nth-child(even) {
          flex-direction: row-reverse;

          @media(max-width: 800px){
            flex-direction: column;
          }

          &::after{
            right: initial;
            left: -75px;
          }
        }
        
        figure{
          display: flex;
          justify-content: center;
          align-items: center;
          height: auto;
          width: 60%;

          @media(max-width: 800px){
            width: 100%;
            padding: 40px;
          }

          @media(max-width: 500px){
            margin: 20px 0 0 0;
            padding: 0;
          }

          img{
            width: 100%;
          }
        }

        aside{
          width: 40%;
          height: 100%;
          padding: 40px;

          @media(max-width: 800px){
            width: 100%;
          }

          @media(max-width: 500px){

            padding: 20px 0 0 0;
          }

          .btn{
            margin: 20px 0;
          }
        }
      }
    }
  }
}
</style>
