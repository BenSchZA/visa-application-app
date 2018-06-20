// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import {firebase} from './firebase-config'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    });
  },
  components: { App },
  template: '<App/>'
})
