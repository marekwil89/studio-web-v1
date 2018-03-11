import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/pages/MainPage'
import ContactPage from '@/components/pages/ContactPage'
import StudioPage from '@/components/pages/StudioPage'
import VRPage from '@/components/pages/VRPage'
import GraphicPage from '@/components/pages/GraphicPage'
import EquipmentPage from '@/components/pages/EquipmentPage'
import BookingPage from '@/components/pages/BookingPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/contact',
      name: 'ContactPage',
      component: ContactPage
    },
    {
      path: '/booking',
      name: 'BookingPage',
      component: BookingPage
    },
    {
      path: '/studio',
      name: 'StudioPage',
      component: StudioPage
    },
    {
      path: '/vr',
      name: 'VRPage',
      component: VRPage
    },
    {
      path: '/graphic',
      name: 'GraphicPage',
      component: GraphicPage
    },
    {
      path: '/equipment',
      name: 'EquipmentPage',
      component: EquipmentPage
    }
  ]
})