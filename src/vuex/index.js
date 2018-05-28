import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        id: '登陆',
        auth: 0
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