// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsWuLlXGxXUjXdvL_EbEKI_TVspZGX8Yc",
  authDomain: "asset-verse-789dd.firebaseapp.com",
  projectId: "asset-verse-789dd",
  storageBucket: "asset-verse-789dd.firebasestorage.app",
  messagingSenderId: "131928912999",
  appId: "1:131928912999:web:1eac7b93a156a546a3d0c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)