<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-layout row wrap>
            <v-flex xs12 class="ma-3" text-xs-center>
              <div class="headline">Before we start your Visa Application process,<br/> please sign in:</div>
            </v-flex>
            <v-flex xs12 class="ma-3">
              <!--<div id="firebaseui-auth-container"></div>-->
              <div v-if="!authenticating" id="firebaseui-auth-container" @click.native="authenticating = true"></div>
              <v-progress-circular v-else></v-progress-circular>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  require('firebaseui/dist/firebaseui.css');
  import firebase from "../firebase-config";
  require('firebase');
  import firebaseui from "firebaseui";

  // Initialize the FirebaseUI Widget using Firebase.
  let ui = new firebaseui.auth.AuthUI(firebase.auth());

  let uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
      // List of OAuth providers supported
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // this.$store.commit('setUserSignedIn', true);
      },
      // signInFailure callback must be provided to handle merge conflicts which
      // occur when an existing credential is linked to an anonymous user.
      signInFailure: function(error) {
        // For merge conflicts, the error.code will be
        // 'firebaseui/anonymous-upgrade-merge-conflict'.
        if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
          return Promise.resolve();
        }
        // The credential the user tried to sign in with.
        let cred = error.credential;
        // Copy data from anonymous user to permanent user and delete anonymous
        // user.
        // ...
        // Finish sign-in after data is copied.
        return firebase.auth().signInWithCredential(cred);
      }
    }
  };

  export default {
    name: "LoginPage",
    mounted() {
      ui.start('#firebaseui-auth-container', uiConfig);
    },
    created() {
      if(firebase.auth().currentUser != null) {
        this.$router.push('/');
        this.$store.commit('setUserSignedIn', true);
        return;
      }

      firebase.auth().onAuthStateChanged((user) => {
        console.log('Auth state changed: ' + user);
        if (user) {
          this.$router.push('/');
          this.$store.commit('setUserSignedIn', true);
        } else {
          this.$store.commit('setUserSignedIn', false);
        }
      })
    },
    data() {
      return {
        authenticating: false
      }
    }
  }
</script>

<style scoped>

</style>
