<template>
  <span id="booking-page">
    <parallaxBar :init-image="'link-photo1.jpg'" :init-height="'400'" :init-title="'Zarezerwuj salę'"></parallaxBar>
    <section class="booking-section">
      <aside>
        <h3>Jeżeli masz pytania</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit enim quis voluptatem, dolore amet ipsum ea explicabo neque molestias tempora.</p>
        <ul>
          <li><span>Phone</span> <a href="tel:+881392423">881-392-423</a></li>
          <li><span>Email</span> <a href="mailto:firm@firm.pl">firm@firm.com</a></li>
        </ul>
        <h2>Gdzie nas znajdziesz?</h2>
      </aside>

      <form @submit.prevent="onSubmit()">
        <h3>Uzupełnij poniższy formularz aby zarezerować salę</h3>
        <div class="fieldset-wrapper">
          <fieldset>
            <input v-model="booking.firstName" v-validate="'required'" :class="{'input': true, 'has-error': errors.has('imię') }" name="imię" type="text" placeholder="Imię*">
            <span v-show="errors.has('imię')" class="text-danger">{{ errors.first('imię') }}</span>
          </fieldset>
          <fieldset>
            <input v-model="booking.lastName" v-validate="'required'" :class="{'input': true, 'has-error': errors.has('nazwisko') }" name="nazwisko" type="text" placeholder="Nazwisko*">
            <span v-show="errors.has('nazwisko')" class="text-danger">{{ errors.first('nazwisko') }}</span>
          </fieldset>
        </div>
        <div class="fieldset-wrapper">
          <fieldset>
            <input v-model="booking.email" v-validate="'required|email'" :class="{'input': true, 'has-error': errors.has('email') }" name="email" type="email" placeholder="Email*">
            <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
          </fieldset>
          <fieldset>
            <input v-model="booking.phone" v-validate="'required|numeric'" :class="{'input': true, 'has-error': errors.has('telefon') }" name="telefon" type="text" placeholder="Telefon*">
            <span v-show="errors.has('telefon')" class="text-danger">{{ errors.first('telefon') }}</span>
          </fieldset>
        </div>
        <fieldset>
          <textarea v-model="booking.text" v-validate="'required'" :class="{'input': true, 'has-error': errors.has('tekst') }" name="tekst" type="text" placeholder="Wiadomość"></textarea>
          <span v-show="errors.has('tekst')" class="text-danger">{{ errors.first('tekst') }}</span>
        </fieldset>
        <fieldset>
        <fieldset >
          <el-select v-model="booking.service" placeholder="Wybierz usługę">
            <el-option v-for="item in options" :key="item.value" :label="item.label + ' ' + item.price + ' PLN/1H'" :value="item">{{item.value}} {{item.price}} PLN/1H</el-option>
          </el-select>
        </fieldset>
        </fieldset>
        <div class="fieldset-wrapper">
          <fieldset>
            <el-date-picker :editable=false :picker-options="datePickerOptions" v-model="booking.date" v-validate="'required'" :class="{'input': true, 'has-error': errors.has('dzień') }" name="dzień" type="date" placeholder="Wybierz dzień*"></el-date-picker>
            <span v-show="errors.has('dzień')" class="text-danger">{{ errors.first('dzień') }}</span>
          </fieldset>
        </div>
        <div class="fieldset-wrapper">
          <fieldset>
            <el-time-select placeholder="Od której godziny?" v-model="booking.startTime" :picker-options="{ start: '09:00', step: '00:60', end: '22:00'}"></el-time-select>
          </fieldset>
          <fieldset>
            <el-time-select placeholder="Do której godziny?" v-model="booking.endTime" :picker-options="{ start: '09:00', step: '00:60',end: '22:00', minTime: booking.startTime}"></el-time-select>
          </fieldset>
        </div>

        <div class="buttons-wrapper">
          <button @click="graphicModalOpen = true" type="button" class="btn btn-main-full btn-small">Sprawdź grafik</button>
          <button v-if="booking.service.id===0" @click="equipmentModalOpen = true" type="button" class="btn btn-main-outline btn-small">Wypożycz Sprzęt</button>
        </div>
        <fieldset>
          <el-checkbox v-model="booking.rulez"><span>Czy akceptujesz <a href="">regulamin?</a></span></el-checkbox>
        </fieldset>
        <div class="fieldset-wrapper">
          <fieldset>
            <p v-show="totalPrice">Cena za całość: {{totalPrice}} zł</p>
          </fieldset>
          <button :disabled="errors.any() || submitIsDisabled" type="submit" class="btn btn-main-full btn-medium">Rezerwuj</button>
        </div>

        <el-dialog title="Sprawdź grafik" :visible.sync="graphicModalOpen">
          <iframe src="https://calendar.google.com/calendar/embed?src=jkmares9de1dnh34kbg91e4jdk%40group.calendar.google.com&ctz=Europe%2FWarsaw" style="border: 0" width="100%" height="600" frameborder="0" scrolling="no"></iframe>
        </el-dialog>

        <el-dialog title="Wypożycz sprzęt" :visible.sync="equipmentModalOpen">
          <div class="categories-wrapper">
            <p>Filtruj: </p>
            <el-select v-model="selectedCategory" placeholder="Select">
              <el-option label="Wszystkie" :value="''"></el-option>
              <el-option v-for="(category, index) in categories" v-bind:key="index" :label="category" :value="category"></el-option>
            </el-select>
          </div>
          <div class="equipment-wrapper">
            <p>Zaznacz sprzęt który chcesz od nas wypożyczyć:</p>
            <el-checkbox-group class="check-wrapper" v-model="booking.equipments">
              <el-checkbox class="el-checkbox" v-for="(elem, index) in equipmentsFiltered" :label="elem" v-bind:key="index" border>{{elem.name}} (+ {{elem.price}} zł)</el-checkbox>
            </el-checkbox-group>
          </div>
          <div slot="footer" class="dialog-footer">
            <button @click="equipmentModalOpen = false" type="button" class="btn btn-main-full btn-medium">Akceptuję</button>
            <p>Cena za całość: {{totalPrice}} zł</p>
          </div>
        </el-dialog>

      </form>
    </section>

  </span>
</template>

<script>

import equipmentService from '../services/EquipmentService';

export default {
  name: 'BookingPage',
  data () {
    return {
      equipmentModalOpen: false,
      graphicModalOpen: false,
      selectedCategory: '',
      equipments: equipmentService,
      datePickerOptions: {        
        disabledDate(time){
          return time.getTime() < Date.now();
        }
      },
      timePickerOptions: {
        format: 'H',
        selectableRange: '7:00:00 - 19:00:00'
      },
      options: [{
        id: 0,
        value: 'Studio Nagrań',
        label: 'Studio Nagrań',
        price: 59
      },{
        id: 1,
        value: 'Studio Virtual Reality',
        label: 'Studio Virtual Reality',
        price: 100
      }],
      booking: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        text: '',
        service: '',
        date: '',
        startTime: '',
        endTime: '',
        equipments: [],
        rulez: false
      }
    }
  },
  methods: {
    onSubmit(){
      alert('wefwe')
    }
  },
  computed: {
    totalPrice(){
      var tPrice = this.booking.service.price;
      this.booking.equipments.forEach(function(item){
        tPrice += item.price
      })

      return tPrice
    },
    submitIsDisabled () {
      return !this.booking.firstName || !this.booking.email || !this.booking.phone || !this.booking.text;
    },
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
  #booking-page{
    .booking-section{
      padding: 50px 0;
      display: flex;
      justify-content: center;
      align-items: flex-start;

      @media(max-width: 1000px){
        padding: 20px;
        flex-direction: column-reverse;
      }

      aside{
        width: 600px;
        padding: 20px;
        margin-right: 30px;

        @media(max-width: 1500px){
          margin: 0;
          width: 40%;
        }

        @media(max-width: 1000px){
          margin: 50px 0;
          width: 100%;
        }

        ul{
          margin: 30px 0;
          width: 100%;
          display: block;
          li{
            margin: 20px 0;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            span{
              font-size: 12px;
              font-weight: 400;
              color: $main-color;
              text-transform: uppercase;
              letter-spacing: .05em;
              margin-right: 20px;
            }

            a{
              font-size: 32px;
              color: $main-color;
              text-decoration: none;
              font-weight: 100;
              border-bottom: 1px dotted #ccc;

              @media(max-width: 450px){
                font-size: 20px;
              }
            }
          }
        }
      }

      form{
        background: $white-color;
        box-shadow: 2px 2px 20px 0 rgba(0,0,0,.2);
        padding: 40px 20px;
        width: 800px;
        position: relative;
        overflow: hidden;

        @media(max-width: 1500px){
          width: 60%;
        }

        @media(max-width: 1000px){
          width: 100%;
        }

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

        .categories-wrapper{
          border-top: 1px solid $light-color;
          padding: 60px 0 20px 0;
          margin: 0 0 20px 0;
          display: flex;
          align-items: center;
          justify-content: flex-start;

          p{
            margin-right: 30px;
          }
        }

        .buttons-wrapper{
          display: flex;
          justify-content: flex-start;
          padding: 30px 0;

          @media(max-width: 550px){
            justify-content: center;
            flex-direction: column;
          }

          .btn{
            margin-right: 30px;

            @media(max-width: 550px){
              margin: 5px 0;
              width: 100%;
            }
          }
        }

        .equipment-wrapper{
          border-bottom: 1px solid $light-color;
          padding: 20px 0 60px 0;

          .el-checkbox{
            margin: 5px 10px 5px 0;
          }

          p{
            margin-bottom: 30px;
          }
        }

        .fieldset-wrapper{
          display: flex;
          justify-content: space-between;
          align-items: center;

          @media(max-width: 550px){
            justify-content: center;
            flex-direction: column;
          }

          fieldset{
            width: 45%;

            @media(max-width: 550px){
              width: 100%;
            }

            .btn{
              float: right;
            }
          }
        }

        fieldset{
          width: 100%;
          margin: 20px 0;

          .text-danger{
            float: right;
            font-size: 12px;
            color: $danger-color;
          }

          .el-date-editor.el-input, .el-date-editor.el-input__inner{
            width: 100%;
          }

          input, textarea{
            width: 100%;
            font-weight: 100;
            font-size: 15px;
            display: block;
            border: 0;
            border-bottom: 1px solid $light-color;
            padding: 10px 0;
            outline: none;
            transition: 0.3s all;
            resize: none;

            &.has-error{
              border-bottom: 1px solid $danger-color;
            }

            &:focus{
              border-bottom: 1px solid $main-color;
            }
          }

          .check-wrapper{
            padding: 0 0 30px 0;
            display: flex;
            flex-wrap: wrap;
            .el-checkbox{
              margin: 5px 10px 5px 0;
            }
          }

          textarea{
            height: 150px;
          }
        }
      }
    }
  }
</style>