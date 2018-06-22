import Vue from 'vue';
import Router from 'vue-router';
import VisaApplication from '@/components/VisaApplication';
import HelloWorld from '@/components/HelloWorld';
import LoginPage from '@/components/LoginPage';

var firebase = require("../firebase-config");
require('firebase');

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
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.auth)) {
//     console.log('Router auth check');
//     firebase.auth().onAuthStateChanged((user) => {
//       console.log('Auth state changed: ' + user);
//       if (user) {
//         next({
//           path: '/'
//         });
//         this.$store.commit('setUserSignedIn', true);
//       } else {
//         next({
//           path: '/login'
//         });
//         this.$store.commit('setUserSignedIn', false);
//       }
//     })
//   } else {
//     next();
//   }
// });

export default router;
