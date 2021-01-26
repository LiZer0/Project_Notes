import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB4mP4ee0pimI9rqC1alaRgOXg7408piJ0",
  authDomain: "simple-notes-firebase-0001.firebaseapp.com",
  projectId: "simple-notes-firebase-0001",
  storageBucket: "simple-notes-firebase-0001.appspot.com",
  messagingSenderId: "229963835496",
  appId: "1:229963835496:web:387e0745b3c37b6303f3dd",
  measurementId: "G-X5ZWQX09N1",
};
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const database = firebase.database();

export default firebase;
