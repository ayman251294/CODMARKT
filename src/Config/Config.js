import * as firebase from 'firebase'

import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDSGu760OOAqGh7DmmnN4rsFKzJw_OgR40",
  authDomain: "ecommerce-website-85737.firebaseapp.com",
  projectId: "ecommerce-website-85737",
  storageBucket: "ecommerce-website-85737.appspot.com",
  messagingSenderId: "893071101658",
  appId: "1:893071101658:web:86210a42d39b20c52f9fe3",
  measurementId: "G-QZ8QDPE6QH",
  databaseURL: "https://ecommerce-website-85737.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }