// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzcC7qTnhj67078XJcjHR_2c06mDJOODY",
  authDomain: "trade-d57de.firebaseapp.com",
  projectId: "trade-d57de",
  storageBucket: "trade-d57de.appspot.com",
  messagingSenderId: "877286900373",
  appId: "1:877286900373:web:3030d87a563e129638119c"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);