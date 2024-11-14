// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCECvVquoJXP6BWRTcJnve33MNpa1Vz7ME",
  authDomain: "logify-bd.firebaseapp.com",
  projectId: "logify-bd",
  storageBucket: "logify-bd.firebasestorage.app",
  messagingSenderId: "925338868252",
  appId: "1:925338868252:web:0d2094f760d6d74595ddd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const storage = getStorage(app);

export default auth;
