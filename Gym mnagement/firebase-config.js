const firebaseConfig = {
    apiKey: "AIzaSyBSXll3cKsXEj08IllQ6Psag59FKHVvIAk",
    authDomain: "gym-management-6e99d.firebaseapp.com",
    projectId: "gym-management-6e99d",
    storageBucket: "gym-management-6e99d.appspot.com",
    messagingSenderId: "159527884314",
    appId: "1:159527884314:web:cee2b018bfa989c9ed63a3"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
