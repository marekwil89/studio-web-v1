<template>
  <span id="equipment-page">
    <parallaxBar :init-image="'link-photo1.jpg'" :init-height="'400'" :init-title="'Wykaz Sprzętu'"></parallaxBar>
    <section class="equipment-section">
      <header>
        <h2>Sprzęt</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt tempore neque, placeat voluptatum sit necessitatibus! Lorem ipsum dolor sit amet consectetur, adipisicing elit. In sapiente possimus harum culpa optio ipsam sit cumque et voluptates animi!</p>
      </header>
      <ul class="categories-wrapper">
        <!-- <li><p> Wybierz kategorię:</p></li> -->
        <li class="category-box">
          <a :class="{active: selectedCategory === ''}" @click="onSelectCategory('')" class="btn btn-medium btn-category" type="button">Wszystkie</a>
        </li>
        <li class="category-box" v-for="(category, index) in categories" v-bind:key="index" >
          <a :class="{active: selectedCategory === category}" @click="onSelectCategory(category)" class="btn btn-medium btn-category" type="button">{{category}}</a>
        </li>
      </ul>
      <ul class="equipment-wrapper">
        <li class="equipment-box" v-for="(item, index) in equipmentsFiltered" v-bind:key="index">
          <article :class="{ active: selectedItemId === item.id }">
              <h3>{{item.name}}</h3>
              <a @click="onSelectItem(item.id)" class="btn btn-medium btn-main-outline" type="button">Pokaż</a>
          </article>
          <aside>
            <div class="detail-wrapper" :class="{active: selectedItemId === item.id}">

              <figure>
                <zoomPicture :init-image="item.img"></zoomPicture>
              </figure>
              <div class="detail-box">
                <span class="content invert" v-html="item.detail"></span>
              </div>
            </div>
          </aside>
        </li>
      </ul>
    </section>
  </span>
</template>

<script>

import equipmentService from '../services/EquipmentService';

export default {
  name: 'EquipmentPage',
  data () {
    return {
      selectedItemId: 0,
      selectedCategory: '',
      equipments: equipmentService
    }
  },
  methods: {
    onSelectItem: function(id){
      this.selectedItemId = id;
    },
    onSelectCategory: function(category){
      this.selectedCategory = category;
      var firstId = this.equipmentsFiltered[0].id;
      this.onSelectItem(firstId);
    }
  },
  computed: {
    equipmentsFiltered: function() {
      var searchCategory = this.selectedCategory

      if(searchCategory){
        return this.equipments.filter(function(item){
          return item.category === searchCategory;
        })
      }
      return this.equipments;
    },
    categories: function(){

      var categoriesAll = this.equipments.map(function(item){
        return item.category;
      })
      var categoriesUnique = categoriesAll.filter(function(item, pos){
        return categoriesAll.indexOf(item) == pos;
      })
      return categoriesUnique;
    }
  }
}
</script>



<style scoped lang="scss">
  #equipment-page{

    .equipment-section{
      width: 100%;
      height: 100%;
      display: flex;
      padding: 150px 0;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      
      header{
        width: 500px;
        margin: 0 auto 100px auto;
      }

      .categories-wrapper{
        border-bottom: 1px solid $primary-color;
        width: 1200px;
        display: flex;
        align-items: center;
        margin: 50px 0;

        .category-box{
          margin: 0 20px;
        }
      }

      .equipment-wrapper{
        // border: 1px solid red;
        width: 1200px;
        padding: 0 0 500px 0;
        
        .equipment-box{
          width: 100%;
          // border: 1px solid red;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: flex-start;
          
          article{
            width: 30%;
            // border: 1px solid blue;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 15px;
            transition: 0.5s all;

            &.active{
              background: $main-color;

              .btn{
                opacity: 0;
              }

              h3{
                color: $white-color;
              }
              // box-shadow: 2px 2px 14px 0 rgba(0,0,0,.2);
            }

            h3{
              margin: 0;
              font-weight: 300;

            }
          }

          aside{
            width: 70%;
            position: relative;
              // box-shadow: 10px 2px 14px 0 rgba(0,0,0,.2);

            .detail-wrapper{
              width: 100%;
              opacity: 0;
              transition: 0.5s all;
              display: flex;
              justify-content: space-between;
              align-items: center;
              background: $main-color;
              position: absolute;

              &.active{
                z-index: 30;
                opacity: 1;
              }

              .detail-box{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-direction: column;
                // border: 1px solid red;
                width: 300px;
                padding: 20px;
              }

              figure{
                // border-top: 1px solid $main-color;
                margin: 0;
                padding: 0;
                height: 500px;
                width: 500px;
              }
            }
          }
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>