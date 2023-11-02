// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChSLBUuZpIhFbQeL2vD7TUE97tjONzk3Q",
  authDomain: "fireapp-a4678.firebaseapp.com",
  databaseURL: "https://fireapp-a4678.firebaseio.com",
  projectId: "fireapp-a4678",
  storageBucket: "fireapp-a4678.appspot.com",
  messagingSenderId: "132103221157",
  appId: "1:132103221157:web:8cf6d738d581f99796024c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app