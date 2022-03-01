import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWRMdKrRHuH9gje5Lg4FZN_5Ej_ZUWdsU",
  authDomain: "projeto-app-web.firebaseapp.com",
  projectId: "projeto-app-web",
  storageBucket: "projeto-app-web.appspot.com",
  messagingSenderId: "834902041777",
  appId: "1:834902041777:web:d46011ec331a0aa740ae90",
  measurementId: "G-03RXHX9HN1"
};
  
if (!firebase.apps.length) {
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
}

export default firebase;
