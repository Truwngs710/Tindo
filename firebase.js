// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {  
  apiKey: "AIzaSyARbtlWkpu4kPr5DQ8qNEnBdyG_XB78m6U",
  authDomain: "trade-50f47.firebaseapp.com",
  databaseURL: "https://trade-50f47-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trade-50f47",
  storageBucket: "trade-50f47.appspot.com",
  messagingSenderId: "114251337435",
  appId: "1:114251337435:web:431c2498cbf02ee41cc6fe",
  measurementId: "G-RNJJHX3F16"
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