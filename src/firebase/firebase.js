// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0KVp8t6m6bhNjdcKdy5vRAvmY_9xy224",
  authDomain: "crud-7c8d3.firebaseapp.com",
  projectId: "crud-7c8d3",
  storageBucket: "crud-7c8d3.appspot.com",
  messagingSenderId: "1050648237611",
  appId: "1:1050648237611:web:c5f49407f00984d734fc6e",
  measurementId: "G-W13WSE1J97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default analytics;