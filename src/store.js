import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "./firebase-config";
import Web3 from 'web3';
import router from './router/index'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userSignedIn: false,
    inTransaction: false,
    metaMaskDialog: false,
    snackbar: false,
    snackbarText: '',
    snackbarAction: '',
    applicationProcess: 0,
    contract: null
  },
  getters: {
    web3(state) {
      if (typeof window.web3 !== 'undefined' && window.web3.currentProvider.isMetaMask) {
        state.metaMaskDialog = false;
        return new Web3(window.web3.currentProvider);
      } else {
        state.metaMaskDialog = true;
        return null;
      }
    }
  },
  mutations: {
    signOut(state) {
      firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        state.userSignedIn = false;
        router.push('/login');
      }, function(error) {
        console.error('Sign Out Error', error);
        state.userSignedIn = false;
        router.push('/login');
      });
    },
    setUserSignedIn(state, bool) {
      state.userSignedIn = bool;
    },
    setContract(state, contract) {
      state.contract = contract;
    },
    openMetaMaskDialog(state) {
      state.metaMaskDialog = true;
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
    },
    setInTransaction(state, bool) {
      state.inTransaction = bool;
    }
  }
});
