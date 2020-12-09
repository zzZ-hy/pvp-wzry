import Vue from 'vue'
import App from './App.vue'

import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'
import router from './router'
import axios from 'axios'

import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.scss'
import 'swiper/css/swiper.css'

import Card from "@/components/Card";
import ListCard from "@/components/ListCard";
Vue.component('my-card',Card)
Vue.component('my-list-card',ListCard)

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
