import Vue from 'vue';
import Router from 'vue-router';
import VisaApplication from '@/components/VisaApplication';
import LoginPage from '@/components/LoginPage';
import {firebase} from "../firebase-config";

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
      component: LoginPage
    },
    {
      path: '/visa-application',
      name: 'VisaApplication',
      component: VisaApplication,
      meta: {
        auth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next({
          path: '/visa-application'
        });
        this.$store.state.userSignedIn = true;
      } else {
        next({
          path: '/login'
        });
        this.$store.state.userSignedIn = false;
      }
    })
  } else {
    next()
  }
});

export default router
