// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwyu1_e9rPXbQzSbkorqb6cc5PiSk9J8s",
  authDomain: "school-management-system-4627d.firebaseapp.com",
  projectId: "school-management-system-4627d",
  storageBucket: "school-management-system-4627d.firebasestorage.app",
  messagingSenderId: "515278284203",
  appId: "1:515278284203:web:c0cc14b869e56f3e195eee",
  measurementId: "G-41H4EGRQYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


