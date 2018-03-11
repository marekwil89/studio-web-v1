// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as Icon from 'vue-awesome'
import VModal from 'vue-js-modal'
import VeeValidate, { Validator } from 'vee-validate';
import pl from 'vee-validate/dist/locale/pl';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/pl';

import NaviBar from './components/shared/NaviBar.vue'
import GoogleMap from './components/shared/GoogleMap.vue'
import FooterBar from './components/shared/FooterBar.vue'
import ZoomPicture from './components/shared/ZoomPicture.vue'
import ParallaxBar from './components/shared/ParallaxBar.vue'

Validator.localize('pl', pl);
Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(VModal, { dynamic: true });
Vue.use(ElementUI, { locale })

Vue.component('icon', Icon)
Vue.component('googleMap', GoogleMap)
Vue.component('naviBar', NaviBar)
Vue.component('footerBar', FooterBar)
Vue.component('zoomPicture', ZoomPicture)
Vue.component('parallaxBar', ParallaxBar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
