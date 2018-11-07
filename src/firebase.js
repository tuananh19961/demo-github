import * as firebase from 'firebase';

 var config = {
    apiKey: "AIzaSyAhiZFWS5mssonQWGL6eKVMO40CkSxq0o8",
    authDomain: "fir-js-299ad.firebaseapp.com",
    databaseURL: "https://fir-js-299ad.firebaseio.com",
    projectId: "fir-js-299ad",
    storageBucket: "fir-js-299ad.appspot.com",
    messagingSenderId: "513603632901"
  };
 firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();

