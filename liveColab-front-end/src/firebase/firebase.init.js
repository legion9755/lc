// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmoul3CFwkG9Jj9BZ7FtALAiZHZQwybq8",
  authDomain: "live-colab.firebaseapp.com",
  projectId: "live-colab",
  storageBucket: "live-colab.firebasestorage.app",
  messagingSenderId: "517140243138",
  appId: "1:517140243138:web:95d25c3559b5fa25b6d15b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;