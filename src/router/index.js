import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import PublishProd from '@/components/PublishProd'
import Product from '@/components/Product'
import ErrorAccess from '@/components/ErrorAccess'
import ProductList from '@/components/ProductList'
import Order from '@/components/Order'
import Store from '@/vuex'  //
import PersonalCenterIndex from '@/components/personalCenter'
import Address from '@/components/personalCenter/Address'
import BaseInfo from '@/components/personalCenter/BaseInfo'
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
      component: Product,
    },
    {
      path: '/errorAccess',
      name: 'errorAccess',
      component: ErrorAccess
    },
    {
      path: '/productList',
      name: 'productList',
      component: ProductList
    },
    {
      path: '/product/:id/order',
      name: 'order',
      component: Order
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      component: PersonalCenterIndex,
      children: [
        {
          path: 'receivedAddr',
          name: 'receivedAddr',
          component: Address
        },
        {
          path: 'baseInfo',
          name: 'baseInfo',
          component: BaseInfo
        }
      ]
    }
  ]
})
router.beforeEach ((to, from,next) => {
  let componentName = from.name;
  if(!componentName){
    if(fetch){
      let request = new Request('/sessionInfo');
      fetch(request,{
        credentials: 'same-origin'
      }).then(response=>{
        return response.json();
      }).then(sessionInfo=>{
        let username = sessionInfo.id || '登陆';
        Store.commit('updateUsername',username);
        Store.commit('updateAuth',sessionInfo.auth);
        next()
      }).catch(err=>{
        if(err) throw err;
      })
    }
  }
  next()
})


export default router;