import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ZMain from "@/views/ZMain";
import Article from "@/views/Article";
import Hero from "@/views/Hero";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ZMain,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/article/:id',
          name: 'article',
          component: Article,
          props: true
        }
      ]
    },
    {
      path: '/hero/:id',
      name: 'hero',
      component: Hero,
      props: true
    }
  ]
})
