// Import the functions you need from the SDKs you need
//import * as firebase from "firebase";
import * as firebase from "firebase/compat"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYR15o05B8ug03DD8msPf61hnP0sdyR0k",
    authDomain: "logindata-6a1d7.firebaseapp.com",
    projectId: "logindata-6a1d7",
    storageBucket: "logindata-6a1d7.appspot.com",
    messagingSenderId: "986368977984",
    appId: "1:986368977984:web:164da35ffc1d232e29c3a5"
    //measurementId: "G-3LWQQRPSLK"
  };

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };