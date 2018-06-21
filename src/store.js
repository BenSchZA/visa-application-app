import Vue from 'vue'
import Vuex from 'vuex'
import {firebase} from "./firebase-config";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userSignedIn: false
  },
  getters: {

  },
  mutations: {
    signOut(state) {
      firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        state.userSignedIn = false;
      }, function(error) {
        console.error('Sign Out Error', error);
        state.userSignedIn = false;
      });
    }
  }
});

export default store;
