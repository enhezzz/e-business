import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import PublishProd from '@/components/PublishProd'
import Product from '@/components/Product'
import ErrorAccess from '@/components/ErrorAccess'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/admin',
      name: 'admin',
      component: PublishProd
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product
    },
    {
      path: '/errorAccess',
      name: 'errorAccess',
      component: ErrorAccess
    }
  ]
})


export default router;