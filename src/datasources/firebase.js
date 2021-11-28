import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// firebase DB를 초기화
const squidFirebase = firebase.initializeApp({
apiKey: "AIzaSyBjeyo2k7JAXKP7iZ0OH0NivUJqBNyrqPA",
  authDomain: "web-system-programming-b85b1.firebaseapp.com",
  databaseURL: "https://web-system-programming-b85b1-default-rtdb.asia-southeast1.firebasedatabase.app",
});

export const squidFirebaseAuth = squidFirebase.auth();