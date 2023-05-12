// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA83oOnSOacIrf_ySI0FSV_RimCcjB_HQ",
  authDomain: "todoapp-vue3-b4e45.firebaseapp.com",
  databaseURL: "https://todoapp-vue3-b4e45-default-rtdb.firebaseio.com",
  projectId: "todoapp-vue3-b4e45",
  storageBucket: "todoapp-vue3-b4e45.appspot.com",
  messagingSenderId: "205271656707",
  appId: "1:205271656707:web:d5d56545f7794a7b9ce136",
  measurementId: "G-VLM86K2TNK"
};

// Initialize Firebase
// init firebase
initializeApp(firebaseConfig)

// init firestore service
const db = getFirestore()
export default db