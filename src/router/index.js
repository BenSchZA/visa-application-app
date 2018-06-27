import Vue from 'vue';
import Router from 'vue-router';
import VisaApplication from '@/components/VisaApplication';
import HelloWorld from '@/components/HelloWorld';
import LoginPage from '@/components/LoginPage';

import firebase from '../firebase-config'
require('firebase');

import store from '../store'

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'VisaApplication',
      component: VisaApplication,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      meta: {
        auth: false,
        login: true,
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if(firebase.auth().currentUser != null) {
      next();
      store.commit('setUserSignedIn', true);
    } else {
      firebase.auth().onAuthStateChanged((user) => {
        console.log('Auth state changed: ' + user);
        if (user) {
          next();
          store.commit('setUserSignedIn', true);
        } else {
          next('/login');
          store.commit('setUserSignedIn', false);
        }
      })
    }
  } else if(to.matched.some(record => record.meta.login)) {
    if(firebase.auth().currentUser != null) {
      next('/');
      store.commit('setUserSignedIn', true);
    } else {
      firebase.auth().onAuthStateChanged((user) => {
        console.log('Auth state changed: ' + user);
        if (user) {
          next('/');
          store.commit('setUserSignedIn', true);
        } else {
          next();
          store.commit('setUserSignedIn', false);
        }
      })
    }
  } else {
    next()
  }
});

export default router;
