import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        id: '登陆'
    },
    mutations:{
        updateUsername(state,id){
            state.id = id;
        }
    }
})