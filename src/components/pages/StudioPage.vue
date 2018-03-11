<template>
  <span id="events-page">
    <parallaxBar :init-image="'link-photo1.jpg'" :init-height="'400'" :init-title="'O Studio'"></parallaxBar>

    <section class="about-section">
      <header>
        <h2>Co posiadamy</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt tempore neque, placeat voluptatum sit necessitatibus!</p>
      </header>
      <ul class="about-wrapper">
        <li class="about-box">
          <figure>
            <img v-bind:src="require('../../assets/img/vr-studio.png')" alt="">
          </figure>
          <aside>
            <h3>Studio VR</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi architecto iste aspernatur. Blanditiis recusandae consequuntur reprehenderit architecto sint accusamus quisquam est iste porro, eos, saepe laborum ea a, odio aut?</p>
            <router-link class="btn btn-main-outline btn-medium" tag="a" to="/equipment">Zobacz wykaz sprzętu!</router-link>
          </aside>
        </li>
        <li class="about-box">
          <figure>
            <img v-bind:src="require('../../assets/img/back3.jpg')" alt="">
          </figure>
          <aside>
            <h3>Studio nagrań</h3>
            <p>powstało by sprostać wymaganiom każdego, nawet najbardziej wyszukanego klienta. Najwyższej jakości sprzęt w połączeniu z wieloletnim doświadczeniem naszych realizatorów zbuduje brzmienie dorównujące najlepszym zachodnim produkcjom w <span>najlepszych</span> studiach nagrań.</p>
            <!-- <a @click="onOpenModal(person.videoUrl)" class="btn btn-medium btn-main-outline" href="###" type="button">Watch now</a> -->
          </aside>
        </li>
        <li class="about-box">
          <figure>
            <img v-bind:src="require('../../assets/img/back4.jpg')" alt="">
          </figure>
          <aside>
            <h3>Prosta rezerwacja</h3>
            <p>Lorem ipsum dolor, adipisicing elit. Excepturi architecto iste aspernatur. Blanditiis recusandae consequuntur reprehenderit architecto sint accusamus quisquam est iste porro, eos, saepe laborum ea a, odio aut? <span>sit amet consectetur</span></p>
            <router-link class="btn btn-main-outline btn-medium" tag="a" to="/booking">Zarezerwuj</router-link>            
          </aside>
        </li>
      </ul>
    </section>

    <section class="events-section">
      <header>
        <h2>Organizujemy Eventy</h2>
        <p>Nasze studio nagrań powstało by sprostać wymaganiom każdego, nawet najbardziej wyszukanego klienta. Najwyższej jakości sprzęt w połączeniu z wieloletnim doświadczeniem naszych realizatorów zbuduje brzmienie dorównujące najlepszym zachodnim produkcjom w najlepszych studiach nagrań.</p>
      </header>
      <ul class="panels-wrapper">
        <li :class="{resize : index == selected}" v-for="(project, index) in events" v-bind:key="index">
          <div class="panel-info">
            <h3>{{project.name}}</h3>
            <p v-html="project.description">{{project.description}}</p>
            <div class="btn-box">
              <a @click="selected = index" class="btn btn-medium btn-main-full" type="button">Więcej info</a>
              <a @click="onOpenModal(project.videoUrl)" class="btn btn-medium btn-main-outline" type="button">Obejrzyj video</a>
            </div>
          </div>
          <div class="panel-image" :style="{backgroundImage: 'url(' + require('../../assets/img/'+ project.image + '') + ')'}">
          </div>
        </li>
      </ul>
    </section>

    <el-dialog title="Film" :visible.sync="videoModalOpen">
      <iframe width="100%" height="350px" :src="videoUrl" frameborder="0" allowfullscreen></iframe>
    </el-dialog>
  </span>
</template>

<script>
  import eventService from '../services/EventService';

export default {



  name: 'StudioPage',
  data () {
    return {
      videoModalOpen: false,
      videoUrl: '',
      selected: null,
      events: eventService
    }
  },
  methods: {
    onOpenModal: function(url){
      this.videoUrl = url;
      this.videoModalOpen = true
      // this.$refs.modal.open()
    }
  }
}
</script>

<style scoped lang="scss">

  #events-page{

    .about-section{
      width: 100%;
      display: flex;
      padding: 100px 0;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      header{
        width: 500px;
        margin: 0 auto 80px auto;
      }

      .about-wrapper{
        width: 1000px;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        box-shadow: 2px 2px 20px 0 rgba(0,0,0,.2);
        background: $white-color;
        position: relative;
        overflow: hidden;

        &:after{
          content: '';
          position: absolute;
          top: -50px;
          right: -75px;
          width: 100px;
          height: 100px;
          transform: rotate(45deg);
          background: $main-color;
        }

        .about-box{
          width: 100%;
          height: 100%;
          margin: 20px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          &:nth-child(even) {
            flex-direction: row-reverse;
          }
          
          figure{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 30%;

            img{
              width: 100%;
            }
          }

          aside{
            width: 70%;
            padding: 40px;

            .btn{
              margin: 20px 0;
            }
          }
        }
      }
    }

    .events-section{
      width: 100%;
      height: 100%;
      display: flex;
      padding: 50px 0;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      
      header{
        width: 500px;
        margin: 0 auto 80px auto;
      }

      .panels-wrapper{
        margin: 100px auto;
        width: 1400px;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        li{
          box-shadow: 0px 0px 1px 0 rgba(0,0,0,.2);
          background: $white-color;
          height: 350px;
          width: 47%;
          margin: 20px;
          display: flex;
          position: relative;
          overflow: hidden;

          &:nth-child(1n+3) {
            flex-direction: row-reverse;
          }

          &.resize{
            box-shadow: 2px 2px 20px 0 rgba(0,0,0,.2);
            
            .panel-info{
              width: 100%;
              height: 100%;
              z-index: 99;
              position: relative;

              &:after{
                content: '';
                position: absolute;
                bottom: -50px;
                left: -75px;
                width: 100px;
                height: 100px;
                transform: rotate(45deg);
                background: $main-color;
              }

              p{
                transform: translateX(0);
                opacity: 1;
                position: static;
              }

              .btn-box{

                .btn-main-full{
                  opacity: 0;
                  transform: translateY(1300%);
                }

                .btn-main-outline{
                  opacity: 1;
                  transform: translateY(0);
                }

              }
            }

            .panel-image{
              width: 0;
            }
          }

          .panel-info{
            padding: 20px;
            height: 100%;
            width: 40%;
            transition: 0.5s all;
            position: relative;
            overflow: hidden;

            .btn-box{
              position: absolute;
              transition: 0.5s all;
              bottom: 0;
              right: 0;
              padding: 15px;

              .btn{
                text-align: center;
                width: 170px;
                position: absolute;
                right: 10px;
                bottom: 10px;
              }

              .btn-main-full{
                opacity: 1;
                transform: translateY(0);
              }

              .btn-main-outline{
                opacity: 0;
                transform: translateY(1300%);
              }
            }

            p{
              transition: 0.5s all;
              position: absolute;
              opacity: 0;
              transform: translateX(-300%);
              margin-bottom: 30px;
            }
          }
          .panel-image{
            height: 100%;
            width: 60%;
            transition: 0.2s all;
          }
        }
      }
    }


  }
</style>