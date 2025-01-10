import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC8zszHK-qYnmI7i2ohMfXLmwmQDE7yepk',
  authDomain: 'kreight-1559d.firebaseapp.com',
  projectId: 'kreight-1559d',
  storageBucket: 'kreight-1559d.firebasestorage.app',
  // messagingSenderId: '690422570772',
  appId: '1:690422570772:web:ef79fb26d71b36116f6c01',
  measurementId: 'G-S2ZT9TB0V1',
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection('users');

export { auth, db, usersCollection };
