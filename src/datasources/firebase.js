import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import 'firebase/compat/database';

// firebase DB를 초기화
const squidGameApp = firebase.initializeApp({
  apiKey: "AIzaSyBjeyo2k7JAXKP7iZ0OH0NivUJqBNyrqPA",
  authDomain: "web-system-programming-b85b1.firebaseapp.com",
  databaseURL: "https://web-system-programming-b85b1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-system-programming-b85b1",
  storageBucket: "web-system-programming-b85b1.appspot.com",
  messagingSenderId: "646328833317",
  appId: "1:646328833317:web:9d17e521b6dba8a3e476cc",
  measurementId: "G-DQLJKVG4ZY"
});

export const squidFirebaseAuth = squidGameApp.auth();

// Get a reference to the database service
export const squidDatabase = firebase.database(squidGameApp);