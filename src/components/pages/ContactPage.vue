<template>
  <span id="contact-page">
    <parallaxBar :init-image="'jamTitle.jpg'" :init-height="'300'" :init-title="'Contact'"></parallaxBar>
    <section class="contact-section">
      <aside>
        <h3>Get in touch</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit enim quis voluptatem, dolore amet ipsum ea explicabo neque molestias tempora.</p>
        <ul>
          <li><span>Phone</span> <a href="tel:+881392423">881-392-423</a></li>
          <!-- <li><span>Fax</span> <a href="tel:+13398833484">(339) 883-3484</a></li> -->
          <li><span>Email</span> <a href="mailto:firm@firm.pl">firm@firm.com</a></li>
        </ul>
      </aside>
      <form @submit.prevent="onSubmit()">
        <h3>Wyślij nam wiadomość</h3>
        <fieldset>
          <input v-model="message.name" v-validate="'required'" :class="{'input': true, 'has-error': errors.has('imię') }" name="imię" type="text" placeholder="Imię">
          <span v-show="errors.has('imię')" class="text-danger">{{ errors.first('imię') }}</span>
        </fieldset>
        <fieldset >
          <input v-model="message.email" v-validate="'required|email'" :class="{'input': true, 'has-error': errors.has('email') }" name="email" type="email" placeholder="Email">
          <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
        </fieldset>
        <fieldset>
          <input v-model="message.phone" v-validate="'required|numeric'" :class="{'input': true, 'has-error': errors.has('telefon') }" name="telefon" type="text" placeholder="Telefon">
          <span v-show="errors.has('telefon')" class="text-danger">{{ errors.first('telefon') }}</span>
        </fieldset>
        <fieldset>
          <textarea v-model="message.text" v-validate="'required'" :class="{'input': true, 'has-error': errors.has('tekst') }" name="tekst" type="text" placeholder="Wiadomość"></textarea>
          <span v-show="errors.has('tekst')" class="text-danger">{{ errors.first('tekst') }}</span>
        </fieldset>
        <fieldset>
          <button :disabled="errors.any() || isDisabled" type="submit" class="btn btn-main-full btn-medium">Wyślij</button>
        </fieldset>
      </form>
    </section>
  </span>
</template>

<script>

export default {
  name: 'ContactPage',
  data () {
    return {
      message: {
        name: '',
        email: '',
        phone: '',
        text: ''
      }
    }
  },
  methods: {
    onSubmit(){
      alert('wefwe')
    }
  },
  computed: {
    isDisabled () {
      return !this.message.name || !this.message.email || !this.message.phone || !this.message.text;
    }
  }
}
</script>

<style scoped lang="scss">

  #contact-page{
    .contact-section{
      padding: 150px 0;
      display: flex;
      justify-content: center;
      align-items: flex-start;

      aside{
        width: 600px;
        padding: 20px;
        margin-right: 30px;

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
            }
          }
        }
      }

      form{
        box-shadow: 2px 2px 20px 0 rgba(0,0,0,.2);
        background: $white-color;
        padding: 20px;
        width: 600px;
        position: relative;
        overflow: hidden;

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

        fieldset{
          width: 100%;
          margin: 20px 0;

          &:last-child{
            .btn{
              float: right;
            }
          }

          .text-danger{
            float: right;
            font-size: 12px;
            color: $danger-color;
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

          textarea{
            height: 150px;
          }
        }
      }
    }
  }
</style>
