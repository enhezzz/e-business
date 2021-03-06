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
import Cart from '@/components/buyCart'
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
      path: '/product/order',
      name: 'order',
      component: Order
    },
    {
      path: '/product/cart',
      name: 'cart',
      component: Cart
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
      path: '/personalCenter',
      name: 'personalCenter',
      component: PersonalCenterIndex,
      children: [
        {
          path: '',
          name: 'baseInfo',
          component: BaseInfo
        },
        {
          path: 'receivedAddr',
          name: 'receivedAddr',
          component: Address
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
        if(response.status == 500){
          throw new Error('你还未登陆')
        }
        return response.json();
      }).then(sessionInfo=>{
        let username = sessionInfo.id;
        let auth = sessionInfo.auth;
        let num_in_cart = sessionInfo.num_in_cart;
        Store.commit('updateUsername',username);
        Store.commit('updateAuth',auth);
        Store.commit('turnToLogin');
        Store.commit('update_num_in_cart',num_in_cart);
        next()
      }).catch(err=>{
        if(err){
          next();
        }
      })
    }
  }
  next()
})


export default router;