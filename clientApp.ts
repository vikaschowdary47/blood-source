import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBn9oqPEiwwzXnFv9swp5J6qygLmJYzpDs",
    authDomain: "blood-souce.firebaseapp.com",
    projectId: "blood-souce",
    storageBucket: "blood-souce.appspot.com",
    messagingSenderId: "190986870146",
    appId: "1:190986870146:web:3c51ee356bf2c447e1039b",
    measurementId: "G-ZQF61GFMJ8"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;