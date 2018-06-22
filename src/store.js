import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "./firebase-config";
import Web3 from 'web3';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userSignedIn: false,
    web3: undefined,
    metaMaskDialog: false,
    snackbar: false,
    snackbarText: '',
    snackbarAction: '',
    applicationProcess: 0
  },
  getters: {
    web3(state) {
      if (typeof window.web3 !== 'undefined' && window.web3.currentProvider.isMetaMask) {
        state.metaMaskDialog = false;
        return new Web3(window.web3.currentProvider);
      } else {
        state.metaMaskDialog = true;
      }
    }
  },
  mutations: {
    signOut(state) {
      firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        state.userSignedIn = false;
        this.$router.push('/login');
      }, function(error) {
        console.error('Sign Out Error', error);
        state.userSignedIn = false;
        this.$router.push('/login');
      });
    },
    setUserSignedIn(state, bool) {
      state.userSignedIn = bool;
    },
    closeMetaMaskDialog(state) {
      state.metaMaskDialog = false;
    },
    showSnackbar(state, {text, action}) {
      state.snackbarText = text;
      state.snackbarAction = action;
      state.snackbar = true;
    },
    hideSnackbar(state) {
      state.snackbar = false;
    },
    setApplicationProcess(state, stage) {
      state.applicationProcess = stage;
    }
  }
});
