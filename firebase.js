import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAHOCK2nIbEgOkskXz3J_C1GnhTzOB-gx4",
    authDomain: "whatsapp-2-7d80c.firebaseapp.com",
    projectId: "whatsapp-2-7d80c",
    storageBucket: "whatsapp-2-7d80c.appspot.com",
    messagingSenderId: "782562591819",
    appId: "1:782562591819:web:82064caa612f1d3ec139ce"
  };


const app = !firebase.apps.length 
            ? firebase.initializeApp(firebaseConfig)
            : firebase.app();

const db = firebase.firestore();

const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();


export {db, auth, provider};