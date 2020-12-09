import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/Login";
import Smain from "./views/Smain";
import CategoryEdit from "./views/CategoryEdit";
import CategoryList from "./views/CategoryList";
import ItemEdit from "./views/ItemEdit";
import ItemList from "./views/ItemList";
import HeroEdit from "./views/HeroEdit";
import HeroList from "./views/HeroList";
import ArticleEdit from "./views/ArticleEdit";
import ArticleList from "./views/ArticleList";
import AdEdit from "./views/AdEdit";
import AdList from "./views/AdList";
import AdminUserEdit from "./views/AdminUserEdit";
import AdminUserList from "./views/AdminUserList";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {authority: true}
    },
    {
      path: '/',
      name: 'main',
      component: Smain,
      children:[
        {
          path: '/categories/create',
          name: 'categoryEdit',
          component: CategoryEdit
        },
        {
          path: '/categories/edit/:id',
          name: 'categoryEditId',
          component: CategoryEdit,
          props: true
        },
        {
          path: '/categories/list',
          name: 'categoryList',
          component: CategoryList
        },


        {
          path: '/items/create',
          name: 'itemEdit',
          component: ItemEdit
        },
        {
          path: '/items/edit/:id',
          name: 'itemEditId',
          component: ItemEdit,
          props: true
        },
        {
          path: '/items/list',
          name: 'itemList',
          component: ItemList
        },


        {
          path: '/heroes/create',
          name: 'heroEdit',
          component: HeroEdit
        },
        {
          path: '/heroes/edit/:id',
          name: 'heroEditId',
          component: HeroEdit,
          props: true
        },
        {
          path: '/heroes/list',
          name: 'heroList',
          component: HeroList
        },


        {
          path: '/articles/create',
          name: 'articleEdit',
          component: ArticleEdit
        },
        {
          path: '/articles/edit/:id',
          name: 'articleEditId',
          component: ArticleEdit,
          props: true
        },
        {
          path: '/articles/list',
          name: 'articleList',
          component: ArticleList
        },


        {
          path: '/ads/create',
          name: 'adEdit',
          component: AdEdit
        },
        {
          path: '/ads/edit/:id',
          name: 'adEditId',
          component: AdEdit,
          props: true
        },
        {
          path: '/ads/list',
          name: 'adList',
          component: AdList
        },


        {
          path: '/admin_users/create',
          name: 'adminUserEdit',
          component: AdminUserEdit
        },
        {
          path: '/admin_users/edit/:id',
          name: 'adminUserEditId',
          component: AdminUserEdit,
          props: true
        },
        {
          path: '/admin_users/list',
          name: 'adminUserList',
          component: AdminUserList
        }
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if (!to.meta.authority && !sessionStorage.token){
    return next('/login')
  }
  next()
})

export default router
