// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyqF54hBkGPH1QLcRRJdmeHzDbt2YW1FA",
  authDomain: "zedblock-job-task.firebaseapp.com",
  projectId: "zedblock-job-task",
  storageBucket: "zedblock-job-task.appspot.com",
  messagingSenderId: "556022766613",
  appId: "1:556022766613:web:060c9d5e2a94491292021c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;