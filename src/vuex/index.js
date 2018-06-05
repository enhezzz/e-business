import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        order: {
            state: {
                prodName: '',
                prodSum: 1,
                prodPrice: 0
            },
            mutations:{
                setProdName(state,prodName){
                    state.prodName = prodName;
                },
                setProdSum(state,prodSum){
                    state.prodSum = prodSum
                },
                setProdPrice(state,prodPrice){
                    state.prodPrice = prodPrice;
                }
            }
        }
    },
    state:{
        id: '登陆',
        auth: 0,
        isLogin: false,
        num_in_cart: undefined
    },
    mutations:{
        updateUsername(state,id){
            state.id = id;
        },
        updateAuth(state,auth){
            state.auth = auth;
        },
        turnToLogin(state){
            state.isLogin = true;
        },
        add_num_in_cart(state){
            state.num_in_cart++;
        },
        update_num_in_cart(state,num){
            state.num_in_cart = num
        }
    }
})