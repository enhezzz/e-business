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
    },
    mutations:{
        updateUsername(state,id){
            state.id = id;
        },
        updateAuth(state,auth){
            state.auth = auth;
        }
    }
})