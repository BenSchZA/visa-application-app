import firebase from 'firebase';

let config = {
  apiKey: "AIzaSyB2esHNzoA98EBFJOT7eDT3Ms6JqXlvyx8",
  authDomain: "visa-application-app.firebaseapp.com",
  databaseURL: "https://visa-application-app.firebaseio.com",
  projectId: "visa-application-app",
  storageBucket: "visa-application-app.appspot.com",
  messagingSenderId: "407242321870"
};

firebase.initializeApp(config);

export default firebase;
