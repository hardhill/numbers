import { createStore } from "vuex";

export default createStore({
    
    state: {
      stars: 0
    },
    mutations: {
        SET_STARS(state,payload){
            state.stars = payload
        }
    },
    actions: {
  
    },
    getters:{
        GET_STARS(state){
            return state.stars
        }
    },
    modules: {
      
    }
  })