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
        auth: false
      }
    },
  ]
});

export default router;
